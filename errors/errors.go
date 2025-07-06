// Package errors provides custom error types for the devolo PLC API
package errors

import (
	"fmt"
)

// DeviceNotFound is returned when a device cannot be found
type DeviceNotFound struct {
	IP string
}

func (e DeviceNotFound) Error() string {
	return fmt.Sprintf("device not found: %s", e.IP)
}

// DeviceUnavailable is returned when a device is unavailable
type DeviceUnavailable struct {
	IP string
}

func (e DeviceUnavailable) Error() string {
	return fmt.Sprintf("device unavailable: %s", e.IP)
}

// DevicePasswordProtected is returned when a device is password protected
type DevicePasswordProtected struct {
	IP string
}

func (e DevicePasswordProtected) Error() string {
	return fmt.Sprintf("device password protected: %s", e.IP)
}

// FeatureNotSupported is returned when a feature is not supported by the device
type FeatureNotSupported struct {
	Feature string
}

func (e FeatureNotSupported) Error() string {
	return fmt.Sprintf("feature not supported: %s", e.Feature)
}
