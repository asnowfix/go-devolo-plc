package deviceapi

// FactoryResetStart represents the factory reset start response
type FactoryResetStart struct {
	Result int32
}

// Result constants for FactoryResetStart
const (
	FactoryResetStartResetError   int32 = 0
	FactoryResetStartResetStarted int32 = 1
)
