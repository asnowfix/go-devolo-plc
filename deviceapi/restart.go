package deviceapi

// RestartResponse represents the restart response
type RestartResponse struct {
	Result int32
}

// Result constants for RestartResponse
const (
	RestartResponse_RESTART_ERROR   int32 = 0
	RestartResponse_RESTART_STARTED int32 = 1
)

// UptimeGetResponse represents the uptime get response
type UptimeGetResponse struct {
	Uptime int64
}
