// Package plcnetapi provides the implementation of the devolo plcnet API
package plcnetapi

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
)

// HTTPClient is an interface for HTTP clients
type HTTPClient interface {
	Do(req *http.Request) (*http.Response, error)
}

// PlcNetAPI implements the devolo plcnet API
type PlcNetAPI struct {
	ip       string
	port     int
	path     string
	version  string
	mac      string
	user     string
	password string
	client   HTTPClient
	logger   *log.Logger
}

// New creates a new PlcNetAPI instance
func New(ip string, port int, path, version, mac string, client HTTPClient) *PlcNetAPI {
	return &PlcNetAPI{
		ip:       ip,
		port:     port,
		path:     path,
		version:  version,
		mac:      mac,
		user:     "devolo",
		password: "",
		client:   client,
		logger:   log.New(log.Writer(), "plcnetapi: ", log.LstdFlags),
	}
}

// NewHTTPClient creates a new HTTP client with default settings
func NewHTTPClient() HTTPClient {
	return &http.Client{
		Timeout: DefaultTimeout,
	}
}

// SetPassword sets the password for authentication
func (p *PlcNetAPI) SetPassword(password string) {
	p.password = password
}

// Close closes the PlcNetAPI client
func (p *PlcNetAPI) Close() {
	// Nothing to close for HTTP client
}

// URL returns the base URL for API requests
func (p *PlcNetAPI) URL() string {
	return fmt.Sprintf("http://%s:%d/%s/%s/", p.ip, p.port, p.path, p.version)
}

// Get sends a GET request to the API
func (p *PlcNetAPI) Get(ctx context.Context, endpoint string) ([]byte, error) {
	return p.Request(ctx, http.MethodGet, endpoint, nil)
}

// Post sends a POST request to the API
func (p *PlcNetAPI) Post(ctx context.Context, endpoint string, data []byte) ([]byte, error) {
	return p.Request(ctx, http.MethodPost, endpoint, data)
}

// Request sends an HTTP request to the API
func (p *PlcNetAPI) Request(ctx context.Context, method, endpoint string, data []byte) ([]byte, error) {
	url := p.URL() + endpoint
	p.logger.Printf("%s %s", method, url)

	var body io.Reader
	if data != nil {
		body = bytes.NewReader(data)
	}

	req, err := http.NewRequestWithContext(ctx, method, url, body)
	if err != nil {
		return nil, fmt.Errorf("failed to create request: %w", err)
	}

	// Set digest authentication headers
	req.SetBasicAuth(p.user, p.password)

	// Set timeout for this specific request
	ctx, cancel := context.WithTimeout(ctx, DefaultTimeout)
	defer cancel()
	req = req.WithContext(ctx)

	resp, err := p.client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("request failed: %w", err)
	}
	defer resp.Body.Close()

	// Handle 401 Unauthorized by hashing the password and retrying
	if resp.StatusCode == http.StatusUnauthorized {
		hashedPassword := hashPassword(p.password)
		p.password = hashedPassword

		// Retry the request with the hashed password
		req.SetBasicAuth(p.user, p.password)
		resp, err = p.client.Do(req)
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

// GetNetworkOverview gets a PLC network overview
func (p *PlcNetAPI) GetNetworkOverview(ctx context.Context) (*pb.GetNetworkOverview_LogicalNetwork, error) {
	p.logger.Println("Getting network overview")
	data, err := p.Get(ctx, "GetNetworkOverview")
	if err != nil {
		return nil, err
	}

	networkOverview := &pb.GetNetworkOverview{}
	if err := proto.Unmarshal(data, networkOverview); err != nil {
		return nil, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	return networkOverview.Network, nil
}

// IdentifyDeviceStart makes PLC LED of a device blink to identify it
func (p *PlcNetAPI) IdentifyDeviceStart(ctx context.Context) (bool, error) {
	p.logger.Println("Starting LED blinking")
	identifyDevice := &pb.IdentifyDeviceStart{
		MacAddress: p.mac,
	}

	data, err := proto.Marshal(identifyDevice)
	if err != nil {
		return false, fmt.Errorf("failed to marshal request: %w", err)
	}

	respData, err := p.Post(ctx, "IdentifyDeviceStart", data)
	if err != nil {
		return false, err
	}

	response := &pb.IdentifyDeviceResponse{}
	if err := proto.Unmarshal(respData, response); err != nil {
		return false, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	return response.Result == pb.IdentifyDeviceResponse_SUCCESS, nil
}

// IdentifyDeviceStop stops the PLC LED blinking
func (p *PlcNetAPI) IdentifyDeviceStop(ctx context.Context) (bool, error) {
	p.logger.Println("Stopping LED blinking")
	identifyDevice := &pb.IdentifyDeviceStop{
		MacAddress: p.mac,
	}

	data, err := proto.Marshal(identifyDevice)
	if err != nil {
		return false, fmt.Errorf("failed to marshal request: %w", err)
	}

	respData, err := p.Post(ctx, "IdentifyDeviceStop", data)
	if err != nil {
		return false, err
	}

	response := &pb.IdentifyDeviceResponse{}
	if err := proto.Unmarshal(respData, response); err != nil {
		return false, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	return response.Result == pb.IdentifyDeviceResponse_SUCCESS, nil
}

// PairDevice starts pairing mode
func (p *PlcNetAPI) PairDevice(ctx context.Context) (bool, error) {
	p.logger.Println("Pairing")
	pairDevice := &pb.PairDeviceStart{
		MacAddress: p.mac,
	}

	data, err := proto.Marshal(pairDevice)
	if err != nil {
		return false, fmt.Errorf("failed to marshal request: %w", err)
	}

	respData, err := p.Post(ctx, "PairDeviceStart", data)
	if err != nil {
		return false, err
	}

	response := &pb.PairDeviceResponse{}
	if err := proto.Unmarshal(respData, response); err != nil {
		return false, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	return response.Result == pb.PairDeviceResponse_SUCCESS, nil
}

// SetUserDeviceName sets the device name
func (p *PlcNetAPI) SetUserDeviceName(ctx context.Context, name string) (bool, error) {
	p.logger.Println("Setting device name")
	setUserName := &pb.SetUserDeviceName{
		MacAddress:     p.mac,
		UserDeviceName: name,
	}

	data, err := proto.Marshal(setUserName)
	if err != nil {
		return false, fmt.Errorf("failed to marshal request: %w", err)
	}

	respData, err := p.Post(ctx, "SetUserDeviceName", data)
	if err != nil {
		return false, err
	}

	response := &pb.SetUserDeviceNameResponse{}
	if err := proto.Unmarshal(respData, response); err != nil {
		return false, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	return response.Result == pb.SetUserDeviceNameResponse_SUCCESS, nil
}
