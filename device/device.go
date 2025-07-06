// Package device provides the main interface for interacting with devolo PLC devices.
package device

import (
	"context"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"log"
	"net"
	"strings"
	"time"

	"github.com/asnowfix/go-devolo-plc/deviceapi"
	"github.com/asnowfix/go-devolo-plc/plcnetapi"
	"github.com/asnowfix/go-devolo-plc/zeroconf"
	"github.com/grandcat/zeroconf"
)

const (
	// ServiceTypeDeviceAPI is the mDNS service type for the device API
	ServiceTypeDeviceAPI = "_dvl-deviceapi._tcp"
	
	// ServiceTypePlcNetAPI is the mDNS service type for the PLC network API
	ServiceTypePlcNetAPI = "_dvl-plcnetapi._tcp"
	
	// MDNSTimeout is the timeout for mDNS discovery in milliseconds
	MDNSTimeout = 300
)

// DevicesWithoutPlcNet is a list of device MT numbers that don't support the PLC network API
var DevicesWithoutPlcNet = []string{"2600", "2601"}

// Device represents a devolo PLC device
type Device struct {
	IP           string
	MAC          string
	MTNumber     string
	Product      string
	Technology   string
	SerialNumber string

	DeviceAPI *deviceapi.DeviceAPI
	PlcNetAPI *plcnetapi.PlcNetAPI

	connected bool
	password  string
	info      map[string]*zeroconf.ServiceInfo
	logger    *log.Logger
}

// New creates a new Device instance
func New(ip string) (*Device, error) {
	d := &Device{
		IP:        ip,
		MTNumber:  "0",
		SerialNumber: "0",
		info:      make(map[string]*zeroconf.ServiceInfo),
		logger:    log.New(log.Writer(), "device: ", log.LstdFlags),
	}
	
	d.info[ServiceTypeDeviceAPI] = &zeroconf.ServiceInfo{}
	d.info[ServiceTypePlcNetAPI] = &zeroconf.ServiceInfo{}
	
	return d, nil
}

// Connect establishes a connection to the device
func (d *Device) Connect(ctx context.Context) error {
	if d.connected {
		return nil
	}

	// Get device information via mDNS
	if err := d.getZeroconfInfo(ctx); err != nil {
		// Retry with multicast if unicast fails
		if err := d.retryZeroconfInfo(ctx); err != nil {
			return fmt.Errorf("failed to get device information: %w", err)
		}
	}

	// Get device info from the device API
	if err := d.getDeviceInfo(); err != nil {
		return fmt.Errorf("failed to get device info: %w", err)
	}

	// Get PLC network info if supported by the device
	if !d.isDeviceWithoutPlcNet() {
		if err := d.getPlcNetInfo(); err != nil {
			return fmt.Errorf("failed to get PLC network info: %w", err)
		}
	}

	d.connected = true
	return nil
}

// Disconnect closes the connection to the device
func (d *Device) Disconnect() error {
	if !d.connected {
		return nil
	}

	if d.DeviceAPI != nil {
		d.DeviceAPI.Close()
	}
	
	if d.PlcNetAPI != nil {
		d.PlcNetAPI.Close()
	}
	
	d.connected = false
	return nil
}

// FirmwareDate returns the date the firmware was built
func (d *Device) FirmwareDate() (time.Time, error) {
	if !d.connected {
		return time.Time{}, fmt.Errorf("device not connected")
	}
	
	dateStr := d.info[ServiceTypeDeviceAPI].Properties["FirmwareDate"]
	if dateStr == "" {
		return time.Time{}, fmt.Errorf("firmware date not available")
	}
	
	// Parse the date string (format: YYYY-MM-DD)
	if len(dateStr) >= 10 {
		dateStr = dateStr[:10]
	} else {
		dateStr = "1970-01-01"
	}
	
	return time.Parse("2006-01-02", dateStr)
}

// FirmwareVersion returns the firmware version currently installed
func (d *Device) FirmwareVersion() string {
	if !d.connected {
		return ""
	}
	
	return d.info[ServiceTypeDeviceAPI].Properties["FirmwareVersion"]
}

// Hostname returns the mDNS hostname of the device
func (d *Device) Hostname() string {
	if !d.connected {
		return ""
	}
	
	return d.info[ServiceTypeDeviceAPI].Hostname
}

// Password returns the currently set device password
func (d *Device) Password() string {
	return d.password
}

// SetPassword changes the currently set device password
func (d *Device) SetPassword(password string) {
	d.password = password
	
	if d.DeviceAPI != nil {
		d.DeviceAPI.SetPassword(password)
	}
	
	if d.PlcNetAPI != nil {
		d.PlcNetAPI.SetPassword(password)
	}
}

// getDeviceInfo gets information from the devolo Device API
func (d *Device) getDeviceInfo() error {
	if len(d.info[ServiceTypeDeviceAPI].Properties) == 0 {
		return fmt.Errorf("no device API information available")
	}

	// Create HTTP client for the device API
	httpClient := deviceapi.NewHTTPClient()
	
	// Create device API client
	d.DeviceAPI = deviceapi.New(
		d.IP,
		d.info[ServiceTypeDeviceAPI].Port,
		d.info[ServiceTypeDeviceAPI].Properties["Path"] || d.info[ServiceTypeDeviceAPI].Properties["path"],
		d.info[ServiceTypeDeviceAPI].Properties["Version"],
		httpClient,
	)
	
	// Set password if available
	if d.password != "" {
		d.DeviceAPI.SetPassword(d.password)
	}
	
	// Parse features
	features := d.info[ServiceTypeDeviceAPI].Properties["Features"]
	if features == "" {
		// Default features
		d.DeviceAPI.SetFeatures([]string{"reset", "update", "led", "intmtg"})
	} else {
		d.DeviceAPI.SetFeatures(strings.Split(features, ","))
	}
	
	return nil
}

// getPlcNetInfo gets information from the devolo PlcNet API
func (d *Device) getPlcNetInfo() error {
	if len(d.info[ServiceTypePlcNetAPI].Properties) == 0 {
		return fmt.Errorf("no PLC network API information available")
	}
	
	// Create HTTP client for the PLC network API
	httpClient := plcnetapi.NewHTTPClient()
	
	// Create PLC network API client
	d.PlcNetAPI = plcnetapi.New(
		d.IP,
		d.info[ServiceTypePlcNetAPI].Port,
		d.info[ServiceTypePlcNetAPI].Properties["Path"],
		d.info[ServiceTypePlcNetAPI].Properties["Version"],
		d.info[ServiceTypePlcNetAPI].Properties["PlcMacAddress"],
		httpClient,
	)
	
	// Set password if available
	if d.password != "" {
		d.PlcNetAPI.SetPassword(d.password)
	}
	
	// Set device properties from PLC network API info
	d.MAC = d.info[ServiceTypePlcNetAPI].Properties["PlcMacAddress"]
	d.Technology = d.info[ServiceTypePlcNetAPI].Properties["PlcTechnology"]
	
	return nil
}

// getZeroconfInfo browses for the desired mDNS service types and queries them
func (d *Device) getZeroconfInfo(ctx context.Context) error {
	serviceTypes := []string{ServiceTypeDeviceAPI, ServiceTypePlcNetAPI}
	
	resolver, err := zeroconf.NewResolver(nil)
	if err != nil {
		return fmt.Errorf("failed to create resolver: %w", err)
	}
	
	entries := make(chan *zeroconf.ServiceEntry)
	
	// Start listening for responses
	if err := resolver.Browse(ctx, serviceTypes[0], "local.", entries); err != nil {
		return fmt.Errorf("failed to browse: %w", err)
	}
	
	if err := resolver.Browse(ctx, serviceTypes[1], "local.", entries); err != nil {
		return fmt.Errorf("failed to browse: %w", err)
	}
	
	// Process responses
	timer := time.NewTimer(time.Duration(MDNSTimeout) * time.Millisecond)
	defer timer.Stop()
	
	for {
		select {
		case entry := <-entries:
			// Check if this entry matches our device IP
			for _, addr := range entry.AddrIPv4 {
				if addr.String() == d.IP {
					d.processServiceEntry(entry)
				}
			}
			
			// Check if we have all the information we need
			if d.hasRequiredInfo() {
				return nil
			}
			
		case <-timer.C:
			// Timeout reached
			if d.hasRequiredInfo() {
				return nil
			}
			return fmt.Errorf("timeout waiting for mDNS responses")
			
		case <-ctx.Done():
			return ctx.Err()
		}
	}
}

// retryZeroconfInfo retries getting the zeroconf info using multicast
func (d *Device) retryZeroconfInfo(ctx context.Context) error {
	d.logger.Println("Having trouble getting results via unicast messages. Switching to multicast for this device.")
	return d.getZeroconfInfo(ctx)
}

// processServiceEntry processes a service entry from mDNS
func (d *Device) processServiceEntry(entry *zeroconf.ServiceEntry) {
	serviceType := ""
	if strings.Contains(entry.Service, ServiceTypeDeviceAPI) {
		serviceType = ServiceTypeDeviceAPI
	} else if strings.Contains(entry.Service, ServiceTypePlcNetAPI) {
		serviceType = ServiceTypePlcNetAPI
	} else {
		return
	}
	
	info := &zeroconf.ServiceInfo{
		Hostname:   entry.HostName,
		Port:       entry.Port,
		Properties: make(map[string]string),
	}
	
	// Set IP address
	if len(entry.AddrIPv4) > 0 {
		info.Address = entry.AddrIPv4[0]
	}
	
	// Parse TXT records
	for _, txt := range entry.Text {
		parts := strings.SplitN(txt, "=", 2)
		if len(parts) == 2 {
			info.Properties[parts[0]] = parts[1]
		}
	}
	
	d.info[serviceType] = info
}

// hasRequiredInfo checks if we have all the required information
func (d *Device) hasRequiredInfo() bool {
	// We always need device API info
	if len(d.info[ServiceTypeDeviceAPI].Properties) == 0 {
		return false
	}
	
	// Check if we need PLC network API info
	if d.isDeviceWithoutPlcNet() {
		return true
	}
	
	return len(d.info[ServiceTypePlcNetAPI].Properties) > 0
}

// isDeviceWithoutPlcNet checks if the device doesn't support the PLC network API
func (d *Device) isDeviceWithoutPlcNet() bool {
	for _, mt := range DevicesWithoutPlcNet {
		if d.MTNumber == mt {
			return true
		}
	}
	return false
}

// hashPassword returns the SHA-256 hash of the password
func hashPassword(password string) string {
	hash := sha256.Sum256([]byte(password))
	return hex.EncodeToString(hash[:])
}
