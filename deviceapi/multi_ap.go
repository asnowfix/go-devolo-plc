package deviceapi

// WifiMultiApGetResponse represents the WiFi multi-AP get response
type WifiMultiApGetResponse struct {
	Enabled bool
	Role    int32
}

// Role constants for WifiMultiApGetResponse
const (
	WifiMultiApGetResponseRoleNone       int32 = 0
	WifiMultiApGetResponseRoleAgent      int32 = 1
	WifiMultiApGetResponseRoleController int32 = 2
)
