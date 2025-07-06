package deviceapi

// UpdateFirmwareCheck represents the update firmware check response
type UpdateFirmwareCheck struct {
	Result           int32
	AvailableVersion string
}

// Result constants for UpdateFirmwareCheck
const (
	UpdateFirmwareCheck_NO_UPDATE_AVAILABLE int32 = 0
	UpdateFirmwareCheck_UPDATE_AVAILABLE    int32 = 1
	UpdateFirmwareCheck_CHECK_ERROR         int32 = 2
)

// UpdateFirmwareStart represents the update firmware start response
type UpdateFirmwareStart struct {
	Result int32
}

// Result constants for UpdateFirmwareStart
const (
	UpdateFirmwareStart_NO_UPDATE_AVAILABLE int32 = 0
	UpdateFirmwareStart_UPDATE_STARTED      int32 = 1
	UpdateFirmwareStart_UPDATE_ERROR        int32 = 2
)
