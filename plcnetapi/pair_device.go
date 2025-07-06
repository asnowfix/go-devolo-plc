package plcnetapi

// PairDeviceStart represents the pair device start request
type PairDeviceStart struct {
	MacAddress string
}

// PairDeviceResponse represents the pair device response
type PairDeviceResponse struct {
	Result int32
}

// Result constants for PairDeviceResponse
const (
	PairDeviceResponse_ERROR   int32 = 0
	PairDeviceResponse_SUCCESS int32 = 1
)
