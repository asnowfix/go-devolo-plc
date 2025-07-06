package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/asnowfix/go-devolo-plc/device"
	pb "github.com/asnowfix/go-devolo-plc/proto"
)

func main() {
	// Parse command line flags
	deviceIP := flag.String("ip", "", "IP address of the devolo PLC device")
	password := flag.String("password", "", "Password for the device (if required)")
	identifyDevice := flag.Bool("identify", false, "Make the device LED blink for identification")
	stopIdentify := flag.Bool("stop-identify", false, "Stop the device LED blinking")
	setLED := flag.String("led", "", "Set LED state (on/off)")
	checkUpdate := flag.Bool("check-update", false, "Check if a firmware update is available")
	pairDevice := flag.Bool("pair", false, "Start device pairing")
	setName := flag.String("set-name", "", "Set device name")

	flag.Parse()

	// Check if IP address is provided
	if *deviceIP == "" {
		fmt.Println("Usage: go run main.go -ip <device-ip> [options]")
		flag.PrintDefaults()
		os.Exit(1)
	}

	// Create a new device instance
	dev, err := device.New(*deviceIP)
	if err != nil {
		log.Fatalf("Failed to create device: %v", err)
	}

	// Set password if provided
	if *password != "" {
		dev.SetPassword(*password)
	}

	// Create context with timeout
	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	// Connect to the device
	fmt.Printf("Connecting to device at %s...\n", *deviceIP)
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
	fmt.Printf("  Hostname: %s\n", dev.Hostname())
	fmt.Printf("  Firmware Version: %s\n", dev.FirmwareVersion())

	// Process command line options
	if *identifyDevice && dev.PlcNetAPI != nil {
		fmt.Println("\nStarting device identification (LED blinking)...")
		success, err := dev.PlcNetAPI.IdentifyDeviceStart(ctx)
		if err != nil {
			fmt.Printf("Failed to start identification: %v\n", err)
		} else if success {
			fmt.Println("Device identification started successfully.")
		} else {
			fmt.Println("Failed to start device identification.")
		}
	}

	if *stopIdentify && dev.PlcNetAPI != nil {
		fmt.Println("\nStopping device identification...")
		success, err := dev.PlcNetAPI.IdentifyDeviceStop(ctx)
		if err != nil {
			fmt.Printf("Failed to stop identification: %v\n", err)
		} else if success {
			fmt.Println("Device identification stopped successfully.")
		} else {
			fmt.Println("Failed to stop device identification.")
		}
	}

	if *setLED != "" && dev.DeviceAPI != nil && dev.DeviceAPI.HasFeature("led") {
		enable := *setLED == "on"
		fmt.Printf("\nSetting LED state to: %s\n", *setLED)
		success, err := dev.DeviceAPI.SetLEDSetting(ctx, enable)
		if err != nil {
			fmt.Printf("Failed to set LED state: %v\n", err)
		} else if success {
			fmt.Println("LED state changed successfully.")
		} else {
			fmt.Println("Failed to change LED state.")
		}
	}

	if *checkUpdate && dev.DeviceAPI != nil && dev.DeviceAPI.HasFeature("update") {
		fmt.Println("\nChecking for firmware updates...")
		available, version, err := dev.DeviceAPI.CheckFirmwareAvailable(ctx)
		if err != nil {
			fmt.Printf("Failed to check for updates: %v\n", err)
		} else if available {
			fmt.Printf("Firmware update available: %s\n", version)

			// Ask if user wants to update
			fmt.Print("Do you want to install this update? (y/n): ")
			var answer string
			n, err := fmt.Scanln(&answer)
			if err != nil {
				fmt.Printf("Failed to read answer: %v\n", err)
				return
			}
			if n != 1 {
				fmt.Println("Invalid answer. Please enter 'y' or 'n'.")
				return
			}

			if answer == "y" || answer == "Y" {
				fmt.Println("Starting firmware update...")
				success, err := dev.DeviceAPI.StartFirmwareUpdate(ctx)
				if err != nil {
					fmt.Printf("Failed to start firmware update: %v\n", err)
				} else if success {
					fmt.Println("Firmware update started successfully.")
					fmt.Println("Please wait for the device to complete the update process.")
				} else {
					fmt.Println("Failed to start firmware update.")
				}
			}
		} else {
			fmt.Println("No firmware updates available.")
		}
	}

	if *pairDevice && dev.PlcNetAPI != nil {
		fmt.Println("\nStarting device pairing...")
		success, err := dev.PlcNetAPI.PairDevice(ctx)
		if err != nil {
			fmt.Printf("Failed to start pairing: %v\n", err)
		} else if success {
			fmt.Println("Device pairing started successfully.")
			fmt.Println("Press the pairing button on the other device within the next 2 minutes.")
		} else {
			fmt.Println("Failed to start device pairing.")
		}
	}

	if *setName != "" && dev.PlcNetAPI != nil {
		fmt.Printf("\nSetting device name to: %s\n", *setName)
		success, err := dev.PlcNetAPI.SetUserDeviceName(ctx, *setName)
		if err != nil {
			fmt.Printf("Failed to set device name: %v\n", err)
		} else if success {
			fmt.Println("Device name changed successfully.")
		} else {
			fmt.Println("Failed to change device name.")
		}
	}

	// Get PLC network overview
	if dev.PlcNetAPI != nil {
		fmt.Println("\nPLC Network Overview:")
		network, err := dev.PlcNetAPI.GetNetworkOverview(ctx)
		if err != nil {
			fmt.Printf("Failed to get network overview: %v\n", err)
		} else {
			// Generate a network ID from the first device's MAC address if available
			networkID := "Unknown"
			if len(network.GetDevices()) > 0 {
				networkID = network.GetDevices()[0].GetMacAddress()[:8]
			}
			fmt.Printf("Network ID: %s\n", networkID)
			fmt.Printf("Devices in network: %d\n", len(network.GetDevices()))

			for i, netDevice := range network.GetDevices() {
				fmt.Printf("\nDevice %d:\n", i+1)
				fmt.Printf("  MAC Address: %s\n", netDevice.GetMacAddress())
				fmt.Printf("  Name: %s\n", netDevice.GetUserDeviceName())
				fmt.Printf("  Product Name: %s\n", netDevice.GetProductName())
				// Map topology to a state string
				state := deviceStateFromTopology(netDevice.GetTopology())
				fmt.Printf("  State: %s\n", state)
				fmt.Printf("  Version: %s\n", netDevice.GetFriendlyVersion())

				// Find data rates for this device
				for _, dataRate := range network.GetDataRates() {
					if dataRate.GetMacAddressFrom() == netDevice.GetMacAddress() {
						fmt.Printf("  TX Rate: %.1f Mbps\n", dataRate.GetTxRate())
						fmt.Printf("  RX Rate: %.1f Mbps\n", dataRate.GetRxRate())
						break
					}
				}
			}
		}
	}
}

// deviceStateFromTopology converts a device topology enum to a string
func deviceStateFromTopology(topology pb.GetNetworkOverview_Device_Topology) string {
	switch topology {
	case pb.GetNetworkOverview_Device_LOCAL:
		return "Available"
	case pb.GetNetworkOverview_Device_REMOTE:
		return "Remote"
	case pb.GetNetworkOverview_Device_UNKNOWN_TOPOLOGY:
		return "Unavailable"
	default:
		return "Unknown"
	}
}
