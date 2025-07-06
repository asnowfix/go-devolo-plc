package deviceapi

// LedSettingsGet represents the LED settings get response
type LedSettingsGet struct {
	State int32
}

// LED state constants for LedSettingsGet
const (
	LedSettingsGetLedOff int32 = 0
	LedSettingsGetLedOn  int32 = 1
)

// LedSettingsSet represents the LED settings set request
type LedSettingsSet struct {
	State int32
}

// LED state constants for LedSettingsSet
const (
	LedSettingsSetLedOff int32 = 0
	LedSettingsSetLedOn  int32 = 1
)

// LedSettingsSetResponse represents the LED settings set response
type LedSettingsSetResponse struct {
	Result int32
}

// Result constants for LedSettingsSetResponse
const (
	LedSettingsSetResponseError   int32 = 0
	LedSettingsSetResponseSuccess int32 = 1
)
