package main

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/asnowfix/go-devolo-plc/device"
	pb "github.com/asnowfix/go-devolo-plc/proto"
)

func main() {
	// Check if IP address is provided
	if len(os.Args) < 2 {
		fmt.Println("Usage: go run main.go <device-ip>")
		os.Exit(1)
	}

	// Get device IP from command line
	deviceIP := os.Args[1]

	// Create a new device instance
	dev, err := device.New(deviceIP)
	if err != nil {
		log.Fatalf("Failed to create device: %v", err)
	}

	// Create context with timeout
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	// Connect to the device
	fmt.Printf("Connecting to device at %s...\n", deviceIP)
	if err := dev.Connect(ctx); err != nil {
		log.Fatalf("Failed to connect to device: %v", err)
	}
	defer dev.Disconnect()

	fmt.Println("Connected successfully!")

	// Display device information
	fmt.Printf("Device Information:\n")
	fmt.Printf("  Product: %s\n", dev.Product)
	fmt.Printf("  MAC Address: %s\n", dev.MAC)
	fmt.Printf("  Serial Number: %s\n", dev.SerialNumber)
	fmt.Printf("  Technology: %s\n", dev.Technology)

	// Get firmware information
	firmwareVersion := dev.FirmwareVersion()
	fmt.Printf("  Firmware Version: %s\n", firmwareVersion)

	firmwareDate, err := dev.FirmwareDate()
	if err == nil {
		fmt.Printf("  Firmware Date: %s\n", firmwareDate.Format("2006-01-02"))
	}

	// Check if device has LED feature
	if dev.DeviceAPI != nil && dev.DeviceAPI.HasFeature("led") {
		// Get LED setting
		ledEnabled, err := dev.DeviceAPI.GetLEDSetting(ctx)
		if err == nil {
			fmt.Printf("  LED Enabled: %v\n", ledEnabled)
		} else {
			fmt.Printf("  Failed to get LED setting: %v\n", err)
		}
	}

	// Get PLC network overview if available
	if dev.PlcNetAPI != nil {
		fmt.Println("\nPLC Network Overview:")
		network, err := dev.PlcNetAPI.GetNetworkOverview(ctx)
		if err != nil {
			fmt.Printf("  Failed to get network overview: %v\n", err)
		} else {
			// Generate a network ID from the first device's MAC address if available
			networkID := "Unknown"
			if len(network.GetDevices()) > 0 {
				networkID = network.GetDevices()[0].GetMacAddress()[:8]
			}
			fmt.Printf("  Network ID: %s\n", networkID)
			fmt.Printf("  Devices in network: %d\n", len(network.GetDevices()))

			for i, netDevice := range network.GetDevices() {
				fmt.Printf("\n  Device %d:\n", i+1)
				fmt.Printf("    MAC Address: %s\n", netDevice.GetMacAddress())
				fmt.Printf("    Name: %s\n", netDevice.GetUserDeviceName())
				fmt.Printf("    Product Name: %s\n", netDevice.GetProductName())
				// Map topology to a state string
				state := "Unknown"
				switch netDevice.GetTopology() {
				case pb.GetNetworkOverview_Device_LOCAL:
					state = "Available"
				case pb.GetNetworkOverview_Device_REMOTE:
					state = "Remote"
				case pb.GetNetworkOverview_Device_UNKNOWN_TOPOLOGY:
					state = "Unavailable"
				}
				fmt.Printf("    State: %s\n", state)
				fmt.Printf("    Version: %s\n", netDevice.GetFriendlyVersion())

				// Find data rates for this device
				for _, dataRate := range network.GetDataRates() {
					if dataRate.GetMacAddressFrom() == netDevice.GetMacAddress() {
						fmt.Printf("    TX Rate: %.1f Mbps\n", dataRate.GetTxRate())
						fmt.Printf("    RX Rate: %.1f Mbps\n", dataRate.GetRxRate())
						break
					}
				}
			}
		}
	}
}


