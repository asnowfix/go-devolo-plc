package plcnetapi

// IdentifyDeviceStart represents the identify device start request
type IdentifyDeviceStart struct {
	MacAddress string
}

// IdentifyDeviceStop represents the identify device stop request
type IdentifyDeviceStop struct {
	MacAddress string
}

// IdentifyDeviceResponse represents the identify device response
type IdentifyDeviceResponse struct {
	Result int32
}

// Result constants for IdentifyDeviceResponse
const (
	IdentifyDeviceResponse_ERROR   int32 = 0
	IdentifyDeviceResponse_SUCCESS int32 = 1
)
