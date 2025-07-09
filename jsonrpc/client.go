// Package jsonrpc provides a client for the devolo PLC API JSON-RPC interface
package jsonrpc

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"
)

// DevoloClient is a client for the devolo PLC API
type DevoloClient struct {
	*Client
	session string
}

// NewDevoloClient creates a new client for the devolo PLC API
func NewDevoloClient(deviceIP string, httpClient *http.Client) *DevoloClient {
	if httpClient == nil {
		httpClient = &http.Client{
			Timeout: 10 * time.Second,
		}
	}

	// Format the endpoint URL with the correct path
	endpoint := fmt.Sprintf("http://%s/ubus", deviceIP)

	return &DevoloClient{
		Client:  NewClient(endpoint, httpClient),
		session: DefaultSessionID, // Start with the default session ID
	}
}

// Login authenticates with the devolo PLC API
func (c *DevoloClient) Login(ctx context.Context, username, password string, timeout int) (*LoginResponse, error) {
	// Debug: Log login attempt (only username, not password for security)
	log.Printf("DEBUG - Login attempt with username: %s", username)

	// Create login request parameters
	params := LoginRequest{
		Username: username,
		Password: password,
		Timeout:  timeout,
	}

	// Debug: Log the full login request (including password) for sniffing purposes
	loginParamsJSON, _ := json.Marshal(params)
	log.Printf("DEBUG - Login request params: %s", string(loginParamsJSON))

	// Make the call
	resp, err := c.CallMethod(ctx, DefaultSessionID, "session", "login", params)
	if err != nil {
		return nil, err
	}

	// Check for error response format first
	// Try to parse as raw result array first
	var resultArray []int
	if err := json.Unmarshal(resp.Result, &resultArray); err == nil {
		if len(resultArray) > 0 && resultArray[0] != 0 {
			// This is an error response with just a status code
			errorCode := resultArray[0]
			
			// Check for attempts_left field in the raw response
			var rawResp map[string]interface{}
			json.Unmarshal(resp.Raw, &rawResp)
			
			attemptsLeft := 0
			if val, ok := rawResp["attempts_left"]; ok {
				if attemptsLeftFloat, ok := val.(float64); ok {
					attemptsLeft = int(attemptsLeftFloat)
				}
			}
			
			// Create error message based on error code
			var errorMsg string
			switch errorCode {
			case 6:
				errorMsg = "Permission denied (invalid username or password)"
			default:
				errorMsg = fmt.Sprintf("Error code %d", errorCode)
			}
			
			return nil, fmt.Errorf("login failed: %s (attempts left: %d)", errorMsg, attemptsLeft)
		}
	}

	// Parse the response as a successful login
	var loginResp LoginResponse
	if err := ParseDevoloResponse(resp, &loginResp); err != nil {
		// If we can't parse it as a login response, return raw response for debugging
		return nil, fmt.Errorf("failed to parse login response: %w, raw response: %s", 
			err, string(resp.Result))
	}

	// Debug: Log successful login
	log.Printf("DEBUG - Login successful with session: %s", loginResp.UbusRPCSession)

	// Store the session ID for future requests
	c.session = loginResp.UbusRPCSession
	c.SetSession(loginResp.UbusRPCSession)

	return &loginResp, nil
}

// RefreshSession refreshes the current session
func (c *DevoloClient) RefreshSession(ctx context.Context) (bool, error) {
	// Make the call
	resp, err := c.CallMethod(ctx, c.session, "session", "refresh", struct{}{})
	if err != nil {
		return false, err
	}

	// Parse the response
	return ParseSimpleResponse(resp)
}

// GetSessionTimeout gets the current session timeout
func (c *DevoloClient) GetSessionTimeout(ctx context.Context) (*LoginResponse, error) {
	// Make the call
	resp, err := c.CallMethod(ctx, c.session, "session", "get_timeout", struct{}{})
	if err != nil {
		return nil, err
	}

	// Parse the response
	return ParseLoginResponse(resp)
}

// GetSystemInfo gets system information
func (c *DevoloClient) GetSystemInfo(ctx context.Context) (*SystemInfoResponse, error) {
	// Make the call
	resp, err := c.CallMethod(ctx, c.session, "system", "info", struct{}{})
	if err != nil {
		return nil, err
	}

	// Parse the response
	return ParseSystemInfoResponse(resp)
}

// GetWirelessInfo gets wireless information for a specific device
func (c *DevoloClient) GetWirelessInfo(ctx context.Context, device string) (*WirelessInfoResponse, error) {
	// Create parameters
	params := map[string]string{
		"device": device,
	}

	// Make the call
	resp, err := c.CallMethod(ctx, c.session, "iwinfo", "info", params)
	if err != nil {
		return nil, err
	}

	// Parse the response
	return ParseWirelessInfoResponse(resp)
}

// GetDeviceName gets the device name
func (c *DevoloClient) GetDeviceName(ctx context.Context) (*DeviceNameResponse, error) {
	// Make the call
	resp, err := c.CallMethod(ctx, DefaultSessionID, "device_name", "get", struct{}{})
	if err != nil {
		return nil, err
	}

	// Parse the response
	return ParseDeviceNameResponse(resp)
}

// GetUCIConfig gets a UCI configuration
func (c *DevoloClient) GetUCIConfig(ctx context.Context, config string) (*UCIConfig, error) {
	// Create parameters
	params := map[string]string{
		"config": config,
	}

	// Make the call
	resp, err := c.CallMethod(ctx, c.session, "uci", "get", params)
	if err != nil {
		return nil, err
	}

	// Parse the response
	return ParseUCIConfigResponse(resp)
}

// GetUCIConfigSection gets a specific section from a UCI configuration
func (c *DevoloClient) GetUCIConfigSection(ctx context.Context, config, section string) (*UCIConfig, error) {
	// Create parameters
	params := map[string]string{
		"config":  config,
		"section": section,
	}

	// Make the call
	resp, err := c.CallMethod(ctx, c.session, "uci", "get", params)
	if err != nil {
		return nil, err
	}

	// Parse the response
	return ParseUCIConfigResponse(resp)
}

// GetUCIConfigOption gets a specific option from a UCI configuration section
func (c *DevoloClient) GetUCIConfigOption(ctx context.Context, config, section, option string) (string, error) {
	// Create parameters
	params := map[string]string{
		"config":  config,
		"section": section,
		"option":  option,
	}

	// Make the call
	resp, err := c.CallMethod(ctx, c.session, "uci", "get", params)
	if err != nil {
		return "", err
	}

	// The result is an array with [0, "value"]
	var result []interface{}
	if err := resp.UnmarshalResult(&result); err != nil {
		return "", err
	}

	if len(result) != 2 {
		return "", fmt.Errorf("invalid response format")
	}

	// Check if the first element is 0 (success)
	code, ok := result[0].(float64)
	if !ok || code != 0 {
		return "", fmt.Errorf("request failed with code %v", result[0])
	}

	// Get the value
	value, ok := result[1].(string)
	if !ok {
		return "", fmt.Errorf("invalid value type")
	}

	return value, nil
}

// CheckMeshSupport checks if EasyMesh is supported
func (c *DevoloClient) CheckMeshSupport(ctx context.Context) (bool, error) {
	// Make the call
	resp, err := c.CallMethod(ctx, DefaultSessionID, "network.mesh", "easymesh_supported", struct{}{})
	if err != nil {
		return false, err
	}

	// Parse the response
	var result []interface{}
	if err := resp.UnmarshalResult(&result); err != nil {
		return false, err
	}

	if len(result) != 2 {
		return false, fmt.Errorf("invalid response format")
	}

	// Check if the first element is 0 (success)
	code, ok := result[0].(float64)
	if !ok || code != 0 {
		return false, fmt.Errorf("request failed with code %v", result[0])
	}

	// Get the value
	meshInfo, ok := result[1].(map[string]interface{})
	if !ok {
		return false, fmt.Errorf("invalid value type")
	}

	supported, ok := meshInfo["easymesh"].(bool)
	if !ok {
		return false, fmt.Errorf("invalid easymesh value type")
	}

	return supported, nil
}

// UnmarshalResult unmarshals the Result field of a Response into the specified value
func (r *Response) UnmarshalResult(v interface{}) error {
	return json.Unmarshal(r.Result, v)
}
