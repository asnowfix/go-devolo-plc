package deviceapi

// UpdateFirmwareCheck represents the update firmware check response
type UpdateFirmwareCheck struct {
	Result           int32
	AvailableVersion string
}

// Result constants for UpdateFirmwareCheck
const (
	UpdateFirmwareCheckNoUpdateAvailable int32 = 0
	UpdateFirmwareCheckUpdateAvailable   int32 = 1
	UpdateFirmwareCheckCheckError        int32 = 2
)

// UpdateFirmwareStart represents the update firmware start response
type UpdateFirmwareStart struct {
	Result int32
}

// Result constants for UpdateFirmwareStart
const (
	UpdateFirmwareStartNoUpdateAvailable int32 = 0
	UpdateFirmwareStartUpdateStarted     int32 = 1
	UpdateFirmwareStartUpdateError       int32 = 2
)
