// Package deviceapi provides the implementation of the devolo device API
package deviceapi

import (
	"bytes"
	"context"
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"io"
	"log"
	"net/http"
	"time"

	"google.golang.org/protobuf/proto"

	pb "github.com/asnowfix/go-devolo-plc/proto"
)

const (
	// DefaultTimeout is the default timeout for HTTP requests
	DefaultTimeout = 10 * time.Second

	// LongRunningTimeout is the timeout for long-running operations
	LongRunningTimeout = 30 * time.Second
)

// HTTPClient is an interface for HTTP clients
type HTTPClient interface {
	Do(req *http.Request) (*http.Response, error)
}

// DeviceAPI implements the devolo device API
type DeviceAPI struct {
	ip       string
	port     int
	path     string
	version  string
	user     string
	password string
	client   HTTPClient
	features []string
	logger   *log.Logger
}

// New creates a new DeviceAPI instance
func New(ip string, port int, path, version string, client HTTPClient) *DeviceAPI {
	return &DeviceAPI{
		ip:       ip,
		port:     port,
		path:     path,
		version:  version,
		user:     "devolo",
		password: "",
		client:   client,
		features: []string{},
		logger:   log.New(log.Writer(), "deviceapi: ", log.LstdFlags),
	}
}

// NewHTTPClient creates a new HTTP client with default settings
func NewHTTPClient() HTTPClient {
	return &http.Client{
		Timeout: DefaultTimeout,
	}
}

// SetPassword sets the password for authentication
func (d *DeviceAPI) SetPassword(password string) {
	d.password = password
}

// SetFeatures sets the supported features
func (d *DeviceAPI) SetFeatures(features []string) {
	d.features = features
}

// Close closes the DeviceAPI client
func (d *DeviceAPI) Close() {
	// Nothing to close for HTTP client
}

// URL returns the base URL for API requests
func (d *DeviceAPI) URL() string {
	return fmt.Sprintf("http://%s:%d/%s/%s/", d.ip, d.port, d.path, d.version)
}

// HasFeature checks if a feature is supported
func (d *DeviceAPI) HasFeature(feature string) bool {
	for _, f := range d.features {
		if f == feature {
			return true
		}
	}
	return false
}

// Get sends a GET request to the API
func (d *DeviceAPI) Get(ctx context.Context, endpoint string) ([]byte, error) {
	return d.Request(ctx, http.MethodGet, endpoint, nil, DefaultTimeout)
}

// GetWithTimeout sends a GET request to the API with a custom timeout
func (d *DeviceAPI) GetWithTimeout(ctx context.Context, endpoint string, timeout time.Duration) ([]byte, error) {
	return d.Request(ctx, http.MethodGet, endpoint, nil, timeout)
}

// Post sends a POST request to the API
func (d *DeviceAPI) Post(ctx context.Context, endpoint string, data []byte) ([]byte, error) {
	return d.Request(ctx, http.MethodPost, endpoint, data, DefaultTimeout)
}

// PostWithTimeout sends a POST request to the API with a custom timeout
func (d *DeviceAPI) PostWithTimeout(ctx context.Context, endpoint string, data []byte, timeout time.Duration) ([]byte, error) {
	return d.Request(ctx, http.MethodPost, endpoint, data, timeout)
}

// Request sends an HTTP request to the API
func (d *DeviceAPI) Request(ctx context.Context, method, endpoint string, data []byte, timeout time.Duration) ([]byte, error) {
	url := d.URL() + endpoint
	d.logger.Printf("%s %s", method, url)

	var body io.Reader
	if data != nil {
		body = bytes.NewReader(data)
	}

	req, err := http.NewRequestWithContext(ctx, method, url, body)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	// Set digest authentication headers
	req.SetBasicAuth(d.user, d.password)

	// Set timeout for this specific request
	ctx, cancel := context.WithTimeout(ctx, timeout)
	defer cancel()
	req = req.WithContext(ctx)

	resp, err := d.client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("request failed: %w", err)
	}
	defer resp.Body.Close()

	// Handle 401 Unauthorized by hashing the password and retrying
	if resp.StatusCode == http.StatusUnauthorized {
		hashedPassword := hashPassword(d.password)
		d.password = hashedPassword

		// Retry the request with the hashed password
		req.SetBasicAuth(d.user, d.password)
		resp, err = d.client.Do(req)
		if err != nil {
			return nil, fmt.Errorf("retry request failed: %w", err)
		}
		defer resp.Body.Close()

		// If still unauthorized, return error
		if resp.StatusCode == http.StatusUnauthorized {
			return nil, fmt.Errorf("device password protected")
		}
	}

	// Check for other errors
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	// Read response body
	respBody, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response body: %w", err)
	}

	return respBody, nil
}

// hashPassword returns the SHA-256 hash of the password
func hashPassword(password string) string {
	hash := sha256.Sum256([]byte(password))
	return hex.EncodeToString(hash[:])
}

// GetLEDSetting gets the LED setting
func (d *DeviceAPI) GetLEDSetting(ctx context.Context) (bool, error) {
	if !d.HasFeature("led") {
		return false, fmt.Errorf("feature not supported: led")
	}

	d.logger.Println("Getting LED setting")
	data, err := d.Get(ctx, "LedSettingsGet")
	if err != nil {
		return false, err
	}

	ledSetting := &pb.LedSettingsGet{}
	if err := proto.Unmarshal(data, ledSetting); err != nil {
		return false, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	return ledSetting.State == pb.LedSettingsGet_LED_ON, nil
}

// SetLEDSetting sets the LED setting
func (d *DeviceAPI) SetLEDSetting(ctx context.Context, enable bool) (bool, error) {
	if !d.HasFeature("led") {
		return false, fmt.Errorf("feature not supported: led")
	}

	d.logger.Printf("Setting LED to %v", enable)
	ledSetting := &pb.LedSettingsSet{}
	if enable {
		ledSetting.State = pb.LedSettingsSet_LED_ON
	} else {
		ledSetting.State = pb.LedSettingsSet_LED_OFF
	}

	data, err := proto.Marshal(ledSetting)
	if err != nil {
		return false, fmt.Errorf("failed to marshal request: %w", err)
	}

	respData, err := d.Post(ctx, "LedSettingsSet", data)
	if err != nil {
		return false, err
	}

	response := &pb.LedSettingsSetResponse{}
	if err := proto.Unmarshal(respData, response); err != nil {
		return false, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	return response.Result == pb.LedSettingsSetResponse_SUCCESS, nil
}

// FactoryReset factory-resets the device
func (d *DeviceAPI) FactoryReset(ctx context.Context) (bool, error) {
	if !d.HasFeature("reset") {
		return false, fmt.Errorf("feature not supported: reset")
	}

	d.logger.Println("Factory resetting device")
	data, err := d.Get(ctx, "FactoryResetStart")
	if err != nil {
		return false, err
	}

	factoryReset := &pb.FactoryResetStart{}
	if err := proto.Unmarshal(data, factoryReset); err != nil {
		return false, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	return factoryReset.Result == pb.FactoryResetStart_SUCCESS, nil
}

// Restart restarts the device
func (d *DeviceAPI) Restart(ctx context.Context) (bool, error) {
	if !d.HasFeature("restart") {
		return false, fmt.Errorf("feature not supported: restart")
	}

	d.logger.Println("Restarting device")
	data, err := d.Get(ctx, "RestartStart")
	if err != nil {
		return false, err
	}

	restart := &pb.RestartResponse{}
	if err := proto.Unmarshal(data, restart); err != nil {
		return false, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	return restart.Result == pb.RestartResponse_SUCCESS, nil
}

// Uptime gets the uptime of the device
func (d *DeviceAPI) Uptime(ctx context.Context) (int64, error) {
	if !d.HasFeature("restart") {
		return 0, fmt.Errorf("feature not supported: restart")
	}

	d.logger.Println("Getting uptime")
	data, err := d.Get(ctx, "UptimeGet")
	if err != nil {
		return 0, err
	}

	uptime := &pb.UptimeGetResponse{}
	if err := proto.Unmarshal(data, uptime); err != nil {
		return 0, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	return uptime.Uptime, nil
}

// GetSupportInfo gets support info from the device
func (d *DeviceAPI) GetSupportInfo(ctx context.Context) (string, error) {
	if !d.HasFeature("support") {
		return "", fmt.Errorf("feature not supported: support")
	}

	d.logger.Println("Getting support info")
	data, err := d.Get(ctx, "SupportInfoDump")
	if err != nil {
		return "", err
	}

	supportInfo := &pb.SupportInfoDumpResponse{}
	if err := proto.Unmarshal(data, supportInfo); err != nil {
		return "", fmt.Errorf("failed to unmarshal response: %w", err)
	}

	// Convert the support info to a string representation
	var infoStr string
	if supportInfo.Info != nil && len(supportInfo.Info.Items) > 0 {
		for _, item := range supportInfo.Info.Items {
			infoStr += fmt.Sprintf("%s: %s\n", item.Label, string(item.Content))
		}
	}

	return infoStr, nil
}

// CheckFirmwareAvailable checks if a firmware update is available
func (d *DeviceAPI) CheckFirmwareAvailable(ctx context.Context) (bool, string, error) {
	if !d.HasFeature("update") {
		return false, "", fmt.Errorf("feature not supported: update")
	}

	d.logger.Println("Checking for firmware update")
	data, err := d.Get(ctx, "UpdateFirmwareCheck")
	if err != nil {
		return false, "", err
	}

	firmwareCheck := &pb.UpdateFirmwareCheck{}
	if err := proto.Unmarshal(data, firmwareCheck); err != nil {
		return false, "", fmt.Errorf("failed to unmarshal response: %w", err)
	}

	return firmwareCheck.Result == pb.UpdateFirmwareCheck_UPDATE_AVAILABLE, firmwareCheck.AvailableVersion, nil
}

// StartFirmwareUpdate starts a firmware update
func (d *DeviceAPI) StartFirmwareUpdate(ctx context.Context) (bool, error) {
	if !d.HasFeature("update") {
		return false, fmt.Errorf("feature not supported: update")
	}

	d.logger.Println("Starting firmware update")
	data, err := d.Get(ctx, "UpdateFirmwareStart")
	if err != nil {
		return false, err
	}

	firmwareUpdate := &pb.UpdateFirmwareStart{}
	if err := proto.Unmarshal(data, firmwareUpdate); err != nil {
		return false, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	return firmwareUpdate.Result == pb.UpdateFirmwareStart_UPDATE_STARTED, nil
}
