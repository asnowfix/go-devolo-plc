package deviceapi

// LedSettingsGet represents the LED settings get response
type LedSettingsGet struct {
	State int32
}

// LED state constants for LedSettingsGet
const (
	LedSettingsGet_LED_OFF int32 = 0
	LedSettingsGet_LED_ON  int32 = 1
)

// LedSettingsSet represents the LED settings set request
type LedSettingsSet struct {
	State int32
}

// LED state constants for LedSettingsSet
const (
	LedSettingsSet_LED_OFF int32 = 0
	LedSettingsSet_LED_ON  int32 = 1
)

// LedSettingsSetResponse represents the LED settings set response
type LedSettingsSetResponse struct {
	Result int32
}

// Result constants for LedSettingsSetResponse
const (
	LedSettingsSetResponse_ERROR   int32 = 0
	LedSettingsSetResponse_SUCCESS int32 = 1
)
