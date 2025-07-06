// Package zeroconf provides utilities for mDNS service discovery
package zeroconf

import (
	"net"
)

// ServiceInfo represents information about a discovered service
type ServiceInfo struct {
	Address    net.IP
	Hostname   string
	Port       int
	Properties map[string]string
}

// NewServiceInfo creates a new ServiceInfo instance
func NewServiceInfo() *ServiceInfo {
	return &ServiceInfo{
		Properties: make(map[string]string),
	}
}
