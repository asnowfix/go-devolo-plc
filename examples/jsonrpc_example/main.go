// Example demonstrating the use of the jsonrpc package for devolo PLC API
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/asnowfix/go-devolo-plc/jsonrpc"
)

func main() {
	// Get device IP from command line or use default
	deviceIP := "192.168.1.1"
	if len(os.Args) > 1 {
		deviceIP = os.Args[1]
	}

	// Create a new devolo client
	client := jsonrpc.NewDevoloClient(deviceIP, nil)

	// Context with timeout
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Set login credentials
	username := "root" // Default username for devolo devices
	password := ""     // empty password for devolo devices (by default)
	// Warning: Hardcoding passwords is insecure and may allow password sniffing.
	// Consider using environment variables or secure storage for sensitive credentials.

	// If password is provided as second argument
	if len(os.Args) > 2 {
		password = os.Args[2]
	}

	// Login to the device - this will log the password in the debug output
	// Warning: Logging passwords can expose them to unauthorized access.
	// Consider using secure logging mechanisms or removing password logging.
	fmt.Println("Logging in...")
	loginResp, err := client.Login(ctx, username, password, 300) // 300 seconds timeout
	if err != nil {
		log.Fatalf("Login failed: %v", err)
	}
	fmt.Printf("Login successful, session: %s\n", loginResp.UbusRPCSession)
	fmt.Printf("Session timeout: %d seconds\n", loginResp.Timeout)
	fmt.Printf("Session expires in: %d seconds\n", loginResp.Expires)

	// Get system info
	fmt.Println("\nGetting system info...")
	sysInfo, err := client.GetSystemInfo(ctx)
	if err != nil {
		log.Fatalf("Failed to get system info: %v", err)
	}
	fmt.Printf("Uptime: %s\n", time.Duration(sysInfo.Uptime)*time.Second)
	fmt.Printf("Local time: %s\n", jsonrpc.FormatTime(sysInfo.LocalTime))
	fmt.Printf("Memory: %d MB total, %d MB free\n",
		sysInfo.Memory.Total/(1024*1024),
		sysInfo.Memory.Free/(1024*1024))

	// Get wireless info
	fmt.Println("\nGetting wireless info for ath1...")
	wirelessInfo, err := client.GetWirelessInfo(ctx, "ath1")
	if err != nil {
		log.Printf("Failed to get wireless info: %v", err)
	} else {
		fmt.Printf("SSID: %s\n", wirelessInfo.SSID)
		fmt.Printf("Channel: %d\n", wirelessInfo.Channel)
		fmt.Printf("Frequency: %d MHz\n", wirelessInfo.Frequency)
		fmt.Printf("Signal: %d dBm\n", wirelessInfo.Signal)
		fmt.Printf("Bitrate: %d Kbps\n", wirelessInfo.Bitrate)
	}

	// Get device name
	fmt.Println("\nGetting device name...")
	deviceName, err := client.GetDeviceName(ctx)
	if err != nil {
		log.Printf("Failed to get device name: %v", err)
	} else {
		fmt.Printf("Device name: %s\n", deviceName.DeviceName)
	}

	// Get UCI configuration
	fmt.Println("\nGetting UCI configuration for 'upgrade'...")
	uciConfig, err := client.GetUCIConfig(ctx, "upgrade")
	if err != nil {
		log.Printf("Failed to get UCI config: %v", err)
	} else {
		// Pretty print the UCI config
		configJSON, _ := json.MarshalIndent(uciConfig, "", "  ")
		fmt.Printf("UCI Config:\n%s\n", string(configJSON))
	}

	// Refresh session
	fmt.Println("\nRefreshing session...")
	refreshed, err := client.RefreshSession(ctx)
	if err != nil {
		log.Printf("Failed to refresh session: %v", err)
	} else {
		fmt.Printf("Session refreshed: %v\n", refreshed)
	}

	// Get session timeout after refresh
	fmt.Println("\nGetting session timeout after refresh...")
	timeoutInfo, err := client.GetSessionTimeout(ctx)
	if err != nil {
		log.Printf("Failed to get session timeout: %v", err)
	} else {
		fmt.Printf("Session timeout: %d seconds\n", timeoutInfo.Timeout)
		fmt.Printf("Session expires in: %d seconds\n", timeoutInfo.Expires)
	}
}
