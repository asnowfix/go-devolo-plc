// Package jsonrpc provides models for the devolo PLC API JSON-RPC interface
package jsonrpc

import (
	"encoding/json"
	"fmt"
	"time"
)

// Common constants for the devolo PLC API
const (
	// Default session ID for unauthenticated requests
	DefaultSessionID = "00000000000000000000000000000000"
)

// LoginRequest represents a login request to the devolo PLC API
type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
	Timeout  int    `json:"timeout"`
}

// LoginResponse represents a login response from the devolo PLC API
type LoginResponse struct {
	UbusRPCSession string                 `json:"ubus_rpc_session"`
	Timeout        int                    `json:"timeout"`
	Expires        int                    `json:"expires"`
	ACLs           map[string]interface{} `json:"acls"`
	Data           map[string]interface{} `json:"data,omitempty"`
}

// DevoloErrorResponse represents an error response from the devolo API
type DevoloErrorResponse struct {
	Result      []int `json:"result"`
	AttemptsLeft int   `json:"attempts_left,omitempty"`
}

// GetErrorCode returns the error code from the result array if present
func (e *DevoloErrorResponse) GetErrorCode() int {
	if len(e.Result) > 0 {
		return e.Result[0]
	}
	return -1
}

// GetErrorMessage returns a human-readable error message based on the error code
func (e *DevoloErrorResponse) GetErrorMessage() string {
	switch e.GetErrorCode() {
	case 0:
		return "Success"
	case 1:
		return "Invalid command"
	case 2:
		return "Invalid argument"
	case 3:
		return "Method not found"
	case 4:
		return "Not found"
	case 5:
		return "No data"
	case 6:
		return "Permission denied"
	case 7:
		return "Timeout"
	case 8:
		return "Not supported"
	case 9:
		return "Unknown error"
	case 10:
		return "Connection failed"
	default:
		return fmt.Sprintf("Unknown error code: %d", e.GetErrorCode())
	}
}

// SystemInfoResponse represents a system info response
type SystemInfoResponse struct {
	Uptime    int64                  `json:"uptime"`
	LocalTime int64                  `json:"localtime"`
	Load      []int                  `json:"load"`
	Memory    SystemInfoMemory       `json:"memory"`
	Swap      SystemInfoMemory       `json:"swap"`
}

// SystemInfoMemory represents memory information in a system info response
type SystemInfoMemory struct {
	Total    int64 `json:"total"`
	Free     int64 `json:"free"`
	Shared   int64 `json:"shared,omitempty"`
	Buffered int64 `json:"buffered,omitempty"`
}

// WirelessInfoResponse represents wireless information response
type WirelessInfoResponse struct {
	Phy        string                 `json:"phy"`
	SSID       string                 `json:"ssid"`
	BSSID      string                 `json:"bssid"`
	Mode       string                 `json:"mode"`
	Channel    int                    `json:"channel"`
	Frequency  int                    `json:"frequency"`
	TxPower    int                    `json:"txpower"`
	Quality    int                    `json:"quality"`
	QualityMax int                    `json:"quality_max"`
	Signal     int                    `json:"signal"`
	Noise      int                    `json:"noise"`
	Bitrate    int                    `json:"bitrate"`
	Encryption WirelessEncryption     `json:"encryption"`
	HWModes    []string               `json:"hwmodes"`
	Hardware   map[string]interface{} `json:"hardware"`
}

// WirelessEncryption represents encryption information in a wireless info response
type WirelessEncryption struct {
	Enabled        bool     `json:"enabled"`
	WPA            []int    `json:"wpa,omitempty"`
	Authentication []string `json:"authentication,omitempty"`
	Ciphers        []string `json:"ciphers,omitempty"`
}

// DeviceNameResponse represents a device name response
type DeviceNameResponse struct {
	DeviceName string `json:"device_name"`
}

// UCIConfig represents a UCI configuration response
type UCIConfig struct {
	Values map[string]UCISection `json:"values"`
}

// UCISection represents a section in a UCI configuration
type UCISection struct {
	Anonymous bool                   `json:".anonymous"`
	Type      string                 `json:".type"`
	Name      string                 `json:".name"`
	Index     int                    `json:".index"`
	Settings  map[string]interface{} `json:"-"`
}

// UnmarshalJSON implements the json.Unmarshaler interface
func (s *UCISection) UnmarshalJSON(data []byte) error {
	// First unmarshal into a map
	var raw map[string]interface{}
	if err := json.Unmarshal(data, &raw); err != nil {
		return err
	}

	// Extract the special fields
	if v, ok := raw[".anonymous"]; ok {
		if b, ok := v.(bool); ok {
			s.Anonymous = b
		}
	}
	if v, ok := raw[".type"]; ok {
		if str, ok := v.(string); ok {
			s.Type = str
		}
	}
	if v, ok := raw[".name"]; ok {
		if str, ok := v.(string); ok {
			s.Name = str
		}
	}
	if v, ok := raw[".index"]; ok {
		if num, ok := v.(float64); ok {
			s.Index = int(num)
		}
	}

	// Copy all other fields to Settings
	s.Settings = make(map[string]interface{})
	for k, v := range raw {
		if k != ".anonymous" && k != ".type" && k != ".name" && k != ".index" {
			s.Settings[k] = v
		}
	}

	return nil
}

// MarshalJSON implements the json.Marshaler interface
func (s UCISection) MarshalJSON() ([]byte, error) {
	// Create a map with the special fields
	raw := map[string]interface{}{
		".anonymous": s.Anonymous,
		".type":      s.Type,
		".name":      s.Name,
		".index":     s.Index,
	}

	// Add all other fields from Settings
	for k, v := range s.Settings {
		raw[k] = v
	}

	return json.Marshal(raw)
}

// Helper functions to parse responses

// ParseLoginResponse parses a login response from a JSON-RPC response
func ParseLoginResponse(resp *Response) (*LoginResponse, error) {
	var result []interface{}
	if err := json.Unmarshal(resp.Result, &result); err != nil {
		return nil, fmt.Errorf("failed to unmarshal login response: %w", err)
	}

	if len(result) != 2 {
		return nil, fmt.Errorf("invalid login response format")
	}

	// Check status code
	statusCode, ok := result[0].(float64)
	if !ok {
		return nil, fmt.Errorf("invalid status code type")
	}

	if statusCode != 0 {
		return nil, fmt.Errorf("login failed with status code %d", int(statusCode))
	}

	// Parse data
	data, ok := result[1].(map[string]interface{})
	if !ok {
		return nil, fmt.Errorf("invalid data type")
	}

	// Extract fields
	session, ok := data["ubus_rpc_session"].(string)
	if !ok {
		return nil, fmt.Errorf("invalid session type")
	}

	expires, ok := data["expires"].(float64)
	if !ok {
		return nil, fmt.Errorf("invalid expires type")
	}

	timeout, ok := data["timeout"].(float64)
	if !ok {
		return nil, fmt.Errorf("invalid timeout type")
	}

	return &LoginResponse{
		UbusRPCSession: session,
		Expires:        int(expires),
		Timeout:        int(timeout),
	}, nil
}

// ParseDevoloResponse parses a devolo response into the provided target struct
func ParseDevoloResponse(resp *Response, target interface{}) error {
	var result []interface{}
	if err := json.Unmarshal(resp.Result, &result); err != nil {
		return fmt.Errorf("failed to unmarshal response: %w", err)
	}

	if len(result) != 2 {
		return fmt.Errorf("invalid response format")
	}

	// Check status code
	statusCode, ok := result[0].(float64)
	if !ok {
		return fmt.Errorf("invalid status code type")
	}

	if statusCode != 0 {
		return fmt.Errorf("request failed with status code %d", int(statusCode))
	}

	// Parse data
	data, ok := result[1].(map[string]interface{})
	if !ok {
		return fmt.Errorf("invalid data type")
	}

	// Convert data to JSON and unmarshal into target
	dataJSON, err := json.Marshal(data)
	if err != nil {
		return fmt.Errorf("failed to marshal data: %w", err)
	}

	if err := json.Unmarshal(dataJSON, target); err != nil {
		return fmt.Errorf("failed to unmarshal data into target: %w", err)
	}

	return nil
}

// ParseSystemInfoResponse parses a system info response from a JSON-RPC response
func ParseSystemInfoResponse(resp *Response) (*SystemInfoResponse, error) {
	// The result is an array with [0, {...}]
	var result []json.RawMessage
	if err := json.Unmarshal(resp.Result, &result); err != nil {
		return nil, err
	}

	if len(result) != 2 {
		return nil, ErrInvalidResponse
	}

	// Check if the first element is 0 (success)
	var code int
	if err := json.Unmarshal(result[0], &code); err != nil {
		return nil, err
	}

	if code != 0 {
		return nil, ErrRequestFailed
	}

	// Parse the second element as SystemInfoResponse
	var sysInfo SystemInfoResponse
	if err := json.Unmarshal(result[1], &sysInfo); err != nil {
		return nil, err
	}

	return &sysInfo, nil
}

// ParseWirelessInfoResponse parses a wireless info response from a JSON-RPC response
func ParseWirelessInfoResponse(resp *Response) (*WirelessInfoResponse, error) {
	// The result is an array with [0, {...}]
	var result []json.RawMessage
	if err := json.Unmarshal(resp.Result, &result); err != nil {
		return nil, err
	}

	if len(result) != 2 {
		return nil, ErrInvalidResponse
	}

	// Check if the first element is 0 (success)
	var code int
	if err := json.Unmarshal(result[0], &code); err != nil {
		return nil, err
	}

	if code != 0 {
		return nil, ErrRequestFailed
	}

	// Parse the second element as WirelessInfoResponse
	var wirelessInfo WirelessInfoResponse
	if err := json.Unmarshal(result[1], &wirelessInfo); err != nil {
		return nil, err
	}

	return &wirelessInfo, nil
}

// ParseDeviceNameResponse parses a device name response from a JSON-RPC response
func ParseDeviceNameResponse(resp *Response) (*DeviceNameResponse, error) {
	// The result is an array with [0, {...}]
	var result []json.RawMessage
	if err := json.Unmarshal(resp.Result, &result); err != nil {
		return nil, err
	}

	if len(result) != 2 {
		return nil, ErrInvalidResponse
	}

	// Check if the first element is 0 (success)
	var code int
	if err := json.Unmarshal(result[0], &code); err != nil {
		return nil, err
	}

	if code != 0 {
		return nil, ErrRequestFailed
	}

	// Parse the second element as DeviceNameResponse
	var deviceName DeviceNameResponse
	if err := json.Unmarshal(result[1], &deviceName); err != nil {
		return nil, err
	}

	return &deviceName, nil
}

// ParseUCIConfigResponse parses a UCI configuration response from a JSON-RPC response
func ParseUCIConfigResponse(resp *Response) (*UCIConfig, error) {
	// The result is an array with [0, {...}]
	var result []json.RawMessage
	if err := json.Unmarshal(resp.Result, &result); err != nil {
		return nil, err
	}

	if len(result) != 2 {
		return nil, ErrInvalidResponse
	}

	// Check if the first element is 0 (success)
	var code int
	if err := json.Unmarshal(result[0], &code); err != nil {
		return nil, err
	}

	if code != 0 {
		return nil, ErrRequestFailed
	}

	// Parse the second element as UCIConfig
	var uciConfig UCIConfig
	if err := json.Unmarshal(result[1], &uciConfig); err != nil {
		return nil, err
	}

	return &uciConfig, nil
}

// ParseSimpleResponse parses a simple response (just a status code) from a JSON-RPC response
func ParseSimpleResponse(resp *Response) (bool, error) {
	// The result is an array with [0]
	var result []int
	if err := json.Unmarshal(resp.Result, &result); err != nil {
		return false, err
	}

	if len(result) < 1 {
		return false, ErrInvalidResponse
	}

	return result[0] == 0, nil
}

// FormatTime formats a Unix timestamp as a time.Time
func FormatTime(timestamp int64) time.Time {
	return time.Unix(timestamp, 0)
}
