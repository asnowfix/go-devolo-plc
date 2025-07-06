# Contributing to go-devolo-plc <!-- omit in toc -->

Thank you for your interest in contributing to the go-devolo-plc project! This document provides guidelines and information to help you get started.

## Table of contents <!-- omit in toc -->

- [Project Structure](#project-structure)
  - [Core Structure](#core-structure)
  - [Key Features Implemented](#key-features-implemented)
  - [Example Applications](#example-applications)
- [Protocol Buffer Setup](#protocol-buffer-setup)
  - [1. Install Protocol Buffer Compiler (protoc)](#1-install-protocol-buffer-compiler-protoc)
    - [macOS](#macos)
    - [Linux](#linux)
    - [Windows](#windows)
  - [2. Install Go Protocol Buffer Plugin](#2-install-go-protocol-buffer-plugin)
  - [3. Generating Go Code from Protocol Buffers](#3-generating-go-code-from-protocol-buffers)
  - [4. Working with Protocol Buffers](#4-working-with-protocol-buffers)
- [Development Guidelines](#development-guidelines)
  - [Code Style](#code-style)
  - [Pull Request Process](#pull-request-process)
  - [Testing](#testing)
- [Implementation Details](#implementation-details)
  - [Device Package](#device-package)
  - [DeviceAPI Package](#deviceapi-package)
  - [PlcNetAPI Package](#plcnetapi-package)
  - [Error Handling](#error-handling)
  - [Zeroconf Package](#zeroconf-package)
- [Adding New Features](#adding-new-features)
- [License](#license)

## Project Structure

The Go implementation of the devolo PLC API is structured as follows:

### Core Structure
1. **Device Package**: The central component that manages the device connection and provides access to both the Device API and PLC Network API.
2. **DeviceAPI Package**: Implements the device API for managing device settings like LED control, firmware updates, and WiFi configuration.
3. **PlcNetAPI Package**: Implements the PLC network API for managing the PLC network, including device identification, pairing, and network overview.
4. **Errors Package**: Custom error types for handling specific error conditions.
5. **Zeroconf Package**: Utilities for mDNS service discovery.
6. **Proto Package**: Contains Protocol Buffer definitions and generated Go code.

### Key Features Implemented
- Device discovery via mDNS
- Connection management with authentication
- Device information retrieval
- LED control
- Firmware update checking and installation
- Device identification (LED blinking)
- Device pairing
- Network overview
- Device naming
- Error handling

### Example Applications
The repository includes two example applications to demonstrate how to use the API:
1. **Basic Example**: Shows how to connect to a device and retrieve basic information.
2. **Advanced Example**: Demonstrates more advanced features like device management and configuration.

## Protocol Buffer Setup

This project uses Protocol Buffers for message serialization. To work with Protocol Buffers, you need to:

### 1. Install Protocol Buffer Compiler (protoc)

#### macOS
```bash
brew install protobuf
```

#### Linux
```bash
apt-get install protobuf-compiler
# or
yum install protobuf-compiler
```

#### Windows
Download the pre-built binary from the [Protocol Buffers GitHub releases page](https://github.com/protocolbuffers/protobuf/releases).

### 2. Install Go Protocol Buffer Plugin

```bash
go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
```

Make sure `$GOPATH/bin` is in your PATH:
```bash
export PATH="$PATH:$(go env GOPATH)/bin"
```

### 3. Generating Go Code from Protocol Buffers

To generate Go code from `.proto` files:

```bash
cd /path/to/go-devolo-plc
protoc --go_out=. --go_opt=paths=source_relative proto/*.proto
```

### 4. Working with Protocol Buffers

When making changes to the API:
1. Update the `.proto` files in the `proto` directory
2. Regenerate the Go code using the command above
3. Update any code that uses the generated Protocol Buffer messages

## Development Guidelines

### Code Style
- Follow standard Go code style and conventions
- Use `gofmt` to format your code
- Follow the [Effective Go](https://golang.org/doc/effective_go) guidelines

### Pull Request Process
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Testing
- Write tests for new functionality
- Ensure all tests pass before submitting a pull request
- Run tests with `go test ./...`

## Implementation Details

The Go implementation follows the same architecture as the Python implementation but adapts it to Go's idioms and patterns. It uses interfaces for better testability and follows Go's error handling conventions.

### Device Package
The device package is the main entry point for the API. It handles device discovery, connection management, and provides access to both the Device API and PLC Network API.

### DeviceAPI Package
The DeviceAPI package implements the device API for managing device settings. It communicates with the device using HTTP requests with protobuf messages.

### PlcNetAPI Package
The PlcNetAPI package implements the PLC network API for managing the PLC network. It also uses HTTP requests with protobuf messages for communication.

### Error Handling
The errors package provides custom error types for handling specific error conditions, such as device not found, device unavailable, device password protected, and feature not supported.

### Zeroconf Package
The zeroconf package provides utilities for mDNS service discovery, which is used to discover devolo PLC devices on the network.

## Adding New Features

When adding new features, please follow these guidelines:

1. **Compatibility**: Ensure compatibility with the Python implementation
2. **Documentation**: Add documentation for new features
3. **Testing**: Add tests for new features
4. **Error Handling**: Handle errors appropriately
5. **Interfaces**: Use interfaces for better testability

## License

By contributing to this project, you agree that your contributions will be licensed under the project's license (GPL-3.0).
