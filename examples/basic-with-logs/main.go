package main

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/asnowfix/go-devolo-plc/device"
	"github.com/asnowfix/go-devolo-plc/internal/logger"
)

func main() {
	// Create a root context with a logger
	rootLogger := logger.NewSimpleLogger(logger.LevelDebug)
	ctx := logger.WithLogger(context.Background(), rootLogger)

	// Get the logger from context
	log := logger.FromContext(ctx)

	// Check if IP address is provided
	if len(os.Args) < 2 {
		log.Error("No IP address provided")
		fmt.Println("Usage: basic <device_ip>")
		os.Exit(1)
	}

	deviceIP := os.Args[1]
	log.Info("Connecting to device at %s", deviceIP)

	// Create a new device
	dev, err := device.New(deviceIP)
	if err != nil {
		log.Error("Failed to create device: %v", err)
		fmt.Printf("Error: %v\n", err)
		os.Exit(1)
	}

	// Set a timeout for the connection
	ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	// Connect to the device
	if err := dev.Connect(ctx); err != nil {
		log.Error("Failed to connect to device: %v", err)
		fmt.Printf("Error: %v\n", err)
		os.Exit(1)
	}

	// Print device information
	log.Info("Successfully connected to device")
	fmt.Printf("Device: %s\n", dev.Product)
	fmt.Printf("Model: %s\n", dev.Product)
	fmt.Printf("Firmware: %s\n", dev.FirmwareVersion())
	fmt.Printf("Serial: %s\n", dev.SerialNumber)

	// Disconnect from the device
	dev.Disconnect()
	log.Info("Disconnected from device")
}
