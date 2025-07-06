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
	PairDeviceResponseError   int32 = 0
	PairDeviceResponseSuccess int32 = 1
)
