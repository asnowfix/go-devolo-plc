package plcnetapi

// SetUserDeviceName represents the set user device name request
type SetUserDeviceName struct {
	MacAddress     string
	UserDeviceName string
}

// SetUserDeviceNameResponse represents the set user device name response
type SetUserDeviceNameResponse struct {
	Result int32
}

// Result constants for SetUserDeviceNameResponse
const (
	SetUserDeviceNameResponseError   int32 = 0
	SetUserDeviceNameResponseSuccess int32 = 1
)
