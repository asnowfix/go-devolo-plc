package deviceapi

// FactoryResetStart represents the factory reset start response
type FactoryResetStart struct {
	Result int32
}

// Result constants for FactoryResetStart
const (
	FactoryResetStart_RESET_ERROR   int32 = 0
	FactoryResetStart_RESET_STARTED int32 = 1
)
