// Package jsonrpc provides a parser for JSON-RPC 2.0 requests and responses
package jsonrpc

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"sync"
)

// Common errors
var (
	ErrInvalidRequest  = errors.New("invalid request")
	ErrInvalidResponse = errors.New("invalid response")
	ErrRequestFailed   = errors.New("request failed")
)

// ID represents a JSON-RPC request ID which can be a string or number
type ID struct {
	StringValue string
	NumberValue float64
	IsString    bool
}

// MarshalJSON implements the json.Marshaler interface
func (i ID) MarshalJSON() ([]byte, error) {
	if i.IsString {
		return json.Marshal(i.StringValue)
	}
	return json.Marshal(i.NumberValue)
}

// UnmarshalJSON implements the json.Unmarshaler interface
func (i *ID) UnmarshalJSON(data []byte) error {
	// Try to unmarshal as string first
	var s string
	if err := json.Unmarshal(data, &s); err == nil {
		i.StringValue = s
		i.IsString = true
		return nil
	}

	// Try to unmarshal as number
	var n float64
	if err := json.Unmarshal(data, &n); err == nil {
		i.NumberValue = n
		i.IsString = false
		return nil
	}

	return fmt.Errorf("ID must be string or number")
}

// String returns the string representation of the ID
func (i ID) String() string {
	if i.IsString {
		return i.StringValue
	}
	return fmt.Sprintf("%v", i.NumberValue)
}

// Request represents a JSON-RPC 2.0 request
type Request struct {
	JSONRPC string          `json:"jsonrpc"`
	Method  string          `json:"method"`
	Params  json.RawMessage `json:"params"`
	ID      ID              `json:"id"`
}

// Response represents a JSON-RPC response
type Response struct {
	JSONRPC string          `json:"jsonrpc"`
	Result  json.RawMessage `json:"result,omitempty"`
	Error   *Error          `json:"error,omitempty"`
	ID      ID              `json:"id"`
	Raw     json.RawMessage `json:"-"`
}

// Error represents a JSON-RPC 2.0 error object
type Error struct {
	Code    int             `json:"code"`
	Message string          `json:"message"`
	Data    json.RawMessage `json:"data,omitempty"`
}

// Error implements the error interface
func (e *Error) Error() string {
	return fmt.Sprintf("jsonrpc error %d: %s", e.Code, e.Message)
}

// Client is a JSON-RPC 2.0 client
type Client struct {
	httpClient *http.Client
	endpoint   string
	headers    http.Header
	mu         sync.Mutex
	session    string
}

// NewClient creates a new JSON-RPC 2.0 client
func NewClient(endpoint string, httpClient *http.Client) *Client {
	if httpClient == nil {
		httpClient = http.DefaultClient
	}

	return &Client{
		httpClient: httpClient,
		endpoint:   endpoint,
		headers:    make(http.Header),
	}
}

// SetHeader sets a header for all requests
func (c *Client) SetHeader(key, value string) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.headers.Set(key, value)
}

// SetSession sets the session ID for subsequent requests
func (c *Client) SetSession(session string) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.session = session
}

// GetSession returns the current session ID
func (c *Client) GetSession() string {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.session
}

// Call makes a JSON-RPC call with the specified method and parameters
func (c *Client) Call(ctx context.Context, method string, params interface{}) (*Response, error) {
	// Create request
	reqID := ID{
		StringValue: generateUUID(),
		IsString:    true,
	}

	req := &Request{
		JSONRPC: "2.0",
		Method:  method,
		ID:      reqID,
	}

	// Marshal parameters
	var err error
	if params != nil {
		req.Params, err = json.Marshal(params)
		if err != nil {
			return nil, fmt.Errorf("failed to marshal params: %w", err)
		}
	}

	// Send request
	resp, err := c.sendRequest(ctx, req)
	if err != nil {
		return nil, err
	}

	return resp, nil
}

// CallMethod makes a JSON-RPC "call" method request with the specified namespace, method and parameters
func (c *Client) CallMethod(ctx context.Context, session, namespace, method string, params interface{}) (*Response, error) {
	// Create call parameters
	callParams := []interface{}{
		session,
		namespace,
		method,
		params,
	}

	// Make the call
	return c.Call(ctx, "call", callParams)
}

// BatchCall makes multiple JSON-RPC calls in a single request
func (c *Client) BatchCall(ctx context.Context, calls []Request) ([]*Response, error) {
	// Send batch request
	httpReq, err := http.NewRequestWithContext(ctx, "POST", c.endpoint, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create HTTP request: %w", err)
	}

	// Add headers
	c.mu.Lock()
	for k, v := range c.headers {
		httpReq.Header[k] = v
	}
	c.mu.Unlock()

	httpReq.Header.Set("Content-Type", "application/json")

	// Marshal batch request
	reqBody, err := json.Marshal(calls)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal batch request: %w", err)
	}

	httpReq.Body = io.NopCloser(bytes.NewReader(reqBody))
	httpReq.ContentLength = int64(len(reqBody))

	// Send request
	httpResp, err := c.httpClient.Do(httpReq)
	if err != nil {
		return nil, fmt.Errorf("HTTP request failed: %w", err)
	}
	defer httpResp.Body.Close()

	// Check status code
	if httpResp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code: %d", httpResp.StatusCode)
	}

	// Read response body
	respBody, err := io.ReadAll(httpResp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response body: %w", err)
	}

	// Unmarshal response
	var responses []*Response
	if err := json.Unmarshal(respBody, &responses); err != nil {
		return nil, fmt.Errorf("failed to unmarshal response: %w", err)
	}

	return responses, nil
}

// sendRequest sends a JSON-RPC request and returns the response
func (c *Client) sendRequest(ctx context.Context, req *Request) (*Response, error) {
	// Create HTTP request
	httpReq, err := http.NewRequestWithContext(ctx, "POST", c.endpoint, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create HTTP request: %w", err)
	}

	// Add headers
	c.mu.Lock()
	for k, v := range c.headers {
		httpReq.Header[k] = v
	}
	c.mu.Unlock()

	httpReq.Header.Set("Content-Type", "application/json")

	// Marshal request
	reqBody, err := json.Marshal(req)
	if err != nil {
		return nil, fmt.Errorf("failed to marshal request: %w", err)
	}

	// Debug logging
	fmt.Printf("DEBUG - Sending request to: %s\n", c.endpoint)
	fmt.Printf("DEBUG - Request body: %s\n", string(reqBody))

	httpReq.Body = io.NopCloser(bytes.NewReader(reqBody))
	httpReq.ContentLength = int64(len(reqBody))

	// Send request
	httpResp, err := c.httpClient.Do(httpReq)
	if err != nil {
		return nil, fmt.Errorf("HTTP request failed: %w", err)
	}
	defer httpResp.Body.Close()

	// Check status code
	if httpResp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("unexpected status code: %d", httpResp.StatusCode)
	}

	// Read response body
	respBody, err := io.ReadAll(httpResp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read response body: %w", err)
	}

	// Debug logging
	fmt.Printf("DEBUG - Response body: %s\n", string(respBody))

	// Unmarshal response
	var resp Response
	if err := json.Unmarshal(respBody, &resp); err != nil {
		return nil, fmt.Errorf("failed to unmarshal response: %w, body: %s", err, string(respBody))
	}
	
	// Store raw response for debugging
	resp.Raw = respBody

	// Check for JSON-RPC error
	if resp.Error != nil {
		return &resp, resp.Error
	}

	return &resp, nil
}

// generateUUID generates a simple UUID-like string
// In a production environment, you should use a proper UUID library
func generateUUID() string {
	return fmt.Sprintf("%x-%x-%x-%x-%x",
		randomBytes(4),
		randomBytes(2),
		randomBytes(2),
		randomBytes(2),
		randomBytes(6),
	)
}

// randomBytes returns a random byte slice of the given length
func randomBytes(n int) []byte {
	b := make([]byte, n)
	// In a real implementation, use crypto/rand
	for i := range b {
		b[i] = byte(i % 256)
	}
	return b
}
