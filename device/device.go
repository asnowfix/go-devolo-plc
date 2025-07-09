// Package device provides the main interface for interacting with devolo PLC devices.
package device

import (
	"context"
	"fmt"
	"log"
	"strings"
	"time"

	"github.com/asnowfix/go-devolo-plc/deviceapi"
	"github.com/asnowfix/go-devolo-plc/internal/logger"
	"github.com/asnowfix/go-devolo-plc/plcnetapi"
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

// getPathProperty gets the path property from the properties map
// checking both "Path" and "path" keys
func getPathProperty(properties map[string]string) string {
	if path, ok := properties["Path"]; ok && path != "" {
		return path
	}
	return properties["path"]
}

// DevicesWithoutPlcNet is a list of device MT numbers that don't support the PLC network API
var DevicesWithoutPlcNet = []string{"2600", "2601"}

// ServiceInfo holds information about a discovered service
type ServiceInfo struct {
	Port       int
	Properties map[string]string
	Hostname   string
}

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
	info      map[string]*ServiceInfo
	logger    *log.Logger
}

// New creates a new Device instance
func New(ip string) (*Device, error) {
	d := &Device{
		IP:           ip,
		MTNumber:     "0",
		SerialNumber: "0",
		info:         make(map[string]*ServiceInfo),
		logger:       log.New(log.Writer(), "device: ", log.LstdFlags),
	}

	d.info[ServiceTypeDeviceAPI] = &ServiceInfo{Properties: make(map[string]string)}
	d.info[ServiceTypePlcNetAPI] = &ServiceInfo{Properties: make(map[string]string)}

	return d, nil
}

// Connect establishes a connection to the device
func (d *Device) Connect(ctx context.Context) error {
	// Create a logger and add it to the context
	deviceLogger := logger.NewSimpleLogger(logger.LevelInfo)
	ctx = logger.WithLogger(ctx, deviceLogger)
	
	log := logger.FromContext(ctx)
	log.Info("Connecting to device at %s", d.IP)
	
	if d.connected {
		log.Info("Device %s is already connected", d.IP)
		return nil
	}

	// Get device information via mDNS
	log.Debug("Getting device information via mDNS for %s", d.IP)
	if err := d.getZeroconfInfo(ctx); err != nil {
		log.Warn("Failed to get device information via unicast for %s: %v", d.IP, err)
		// Retry with multicast if unicast fails
		if err := d.retryZeroconfInfo(ctx); err != nil {
			log.Error("Failed to get device information via multicast for %s: %v", d.IP, err)
			return fmt.Errorf("failed to get device information: %w", err)
		}
	}

	// Get device info from the device API
	log.Debug("Getting device info from the device API for %s", d.IP)
	if err := d.getDeviceInfo(); err != nil {
		log.Error("Failed to get device info for %s: %v", d.IP, err)
		return fmt.Errorf("failed to get device info: %w", err)
	}

	// Get PLC network info if supported by the device
	if !d.isDeviceWithoutPlcNet() {
		log.Debug("Getting PLC network info for %s", d.IP)
		if err := d.getPlcNetInfo(); err != nil {
			log.Error("Failed to get PLC network info for %s: %v", d.IP, err)
			return fmt.Errorf("failed to get PLC network info: %w", err)
		}
	} else {
		log.Info("Device %s does not support PLC network", d.IP)
	}

	d.connected = true
	log.Info("Successfully connected to device %s", d.IP)
	return nil
}

// Disconnect closes the connection to the device
func (d *Device) Disconnect() {
	if !d.connected {
		return
	}

	if d.DeviceAPI != nil {
		d.DeviceAPI.Close()
	}

	if d.PlcNetAPI != nil {
		d.PlcNetAPI.Close()
	}

	d.connected = false
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
		getPathProperty(d.info[ServiceTypeDeviceAPI].Properties),
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
	log := logger.FromContext(ctx)
	serviceTypes := []string{ServiceTypeDeviceAPI, ServiceTypePlcNetAPI}

	log.Debug("Starting mDNS discovery for device %s", d.IP)
	resolver, err := zeroconf.NewResolver(nil)
	if err != nil {
		log.Error("Failed to create mDNS resolver: %v", err)
		return fmt.Errorf("failed to create resolver: %w", err)
	}

	entries := make(chan *zeroconf.ServiceEntry)

	// Start listening for responses
	log.Debug("Browsing for service type: %s", serviceTypes[0])
	if err := resolver.Browse(ctx, serviceTypes[0], "local.", entries); err != nil {
		log.Error("Failed to browse for %s: %v", serviceTypes[0], err)
		return fmt.Errorf("failed to browse: %w", err)
	}

	log.Debug("Browsing for service type: %s", serviceTypes[1])
	if err := resolver.Browse(ctx, serviceTypes[1], "local.", entries); err != nil {
		log.Error("Failed to browse for %s: %v", serviceTypes[1], err)
		return fmt.Errorf("failed to browse: %w", err)
	}

	// Process responses
	timer := time.NewTimer(time.Duration(MDNSTimeout) * time.Millisecond)
	defer timer.Stop()

	log.Debug("Waiting for mDNS responses with timeout of %d ms", MDNSTimeout)
	for {
		select {
		case entry := <-entries:
			log.Debug("Received mDNS entry: %s from %v", entry.Service, entry.AddrIPv4)
			// Check if this entry matches our device IP
			for _, addr := range entry.AddrIPv4 {
				if addr.String() == d.IP {
					log.Info("Found matching service entry for device %s: %s", d.IP, entry.Service)
					d.processServiceEntry(ctx, entry)
				}
			}

			// Check if we have all the information we need
			if d.hasRequiredInfo() {
				log.Info("All required device information collected for %s", d.IP)
				return nil
			}

		case <-timer.C:
			// Timeout reached
			if d.hasRequiredInfo() {
				log.Info("Timeout reached but all required information collected for %s", d.IP)
				return nil
			}
			log.Error("Timeout waiting for mDNS responses for device %s", d.IP)
			return fmt.Errorf("timeout waiting for mDNS responses")

		case <-ctx.Done():
			log.Warn("Context cancelled while waiting for mDNS responses: %v", ctx.Err())
			return ctx.Err()
		}
	}
}

// retryZeroconfInfo retries getting the zeroconf info using multicast
func (d *Device) retryZeroconfInfo(ctx context.Context) error {
	log := logger.FromContext(ctx)
	log.Warn("Having trouble getting results via unicast messages. Switching to multicast for device %s", d.IP)
	return d.getZeroconfInfo(ctx)
}

// processServiceEntry processes a service entry from mDNS
func (d *Device) processServiceEntry(ctx context.Context, entry *zeroconf.ServiceEntry) {
	log := logger.FromContext(ctx)
	serviceType := ""
	if strings.Contains(entry.Service, ServiceTypeDeviceAPI) {
		serviceType = ServiceTypeDeviceAPI
		log.Debug("Processing DeviceAPI service entry for %s", d.IP)
	} else if strings.Contains(entry.Service, ServiceTypePlcNetAPI) {
		serviceType = ServiceTypePlcNetAPI
		log.Debug("Processing PlcNetAPI service entry for %s", d.IP)
	} else {
		log.Warn("Unknown service type in entry: %s", entry.Service)
		return
	}

	info := &ServiceInfo{
		Hostname:   entry.HostName,
		Port:       entry.Port,
		Properties: make(map[string]string),
	}

	log.Debug("Service info for %s: hostname=%s, port=%d", serviceType, entry.HostName, entry.Port)

	// Parse TXT records
	for _, txt := range entry.Text {
		parts := strings.SplitN(txt, "=", 2)
		if len(parts) == 2 {
			info.Properties[parts[0]] = parts[1]
			log.Debug("Found property: %s=%s", parts[0], parts[1])
		}
	}

	d.info[serviceType] = info
	log.Info("Stored service info for %s with %d properties", serviceType, len(info.Properties))
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
