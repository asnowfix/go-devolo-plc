package deviceapi

// WifiMultiApGetResponse represents the WiFi multi-AP get response
type WifiMultiApGetResponse struct {
	Enabled bool
	Role    int32
}

// Role constants for WifiMultiApGetResponse
const (
	WifiMultiApGetResponse_ROLE_NONE       int32 = 0
	WifiMultiApGetResponse_ROLE_AGENT      int32 = 1
	WifiMultiApGetResponse_ROLE_CONTROLLER int32 = 2
)
