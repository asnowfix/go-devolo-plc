package deviceapi

// WifiResult represents the result of a WiFi operation
type WifiResult struct {
	Result int32
}

// Result constants for WifiResult
const (
	WifiResultWifiError   int32 = 0
	WifiResultWifiSuccess int32 = 1
)

// WifiConnectedStationsGet represents the WiFi connected stations get response
type WifiConnectedStationsGet struct {
	ConnectedStations []ConnectedStationInfo
}

// ConnectedStationInfo represents information about a connected WiFi station
type ConnectedStationInfo struct {
	MacAddress     string
	SignalStrength int32
	Speed          int32
}

// WifiGuestAccessGet represents the WiFi guest access get response
type WifiGuestAccessGet struct {
	Enabled  bool
	SSID     string
	Key      string
	Duration int32
}

// WifiGuestAccessSet represents the WiFi guest access set request
type WifiGuestAccessSet struct {
	Enable   bool
	Duration int32
}

// WifiGuestAccessSetResponse represents the WiFi guest access set response
type WifiGuestAccessSetResponse struct {
	Result int32
}

// WifiNeighborAPsGet represents the WiFi neighbor access points get response
type WifiNeighborAPsGet struct {
	NeighborAPs []NeighborAPInfo
}

// NeighborAPInfo represents information about a neighboring WiFi access point
type NeighborAPInfo struct {
	SSID           string
	BSSID          string
	SignalStrength int32
	Channel        int32
	Encryption     int32
}

// WifiRepeatedAPsGet represents the WiFi repeated access points get response
type WifiRepeatedAPsGet struct {
	RepeatedAPs []RepeatedAPInfo
}

// RepeatedAPInfo represents information about a repeated WiFi access point
type RepeatedAPInfo struct {
	SSID           string
	BSSID          string
	SignalStrength int32
	Channel        int32
	Encryption     int32
}

// WifiRepeaterWpsClonePbcStart represents the WiFi repeater WPS clone PBC start response
type WifiRepeaterWpsClonePbcStart struct {
	Result int32
}

// WifiWpsPbcStart represents the WiFi WPS PBC start response
type WifiWpsPbcStart struct {
	Result int32
}
