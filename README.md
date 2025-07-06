# go-devolo-plc

Go implementation of the devolo PLC API for communicating with devolo PLC devices.

## Table of Content

- [Status](#status)
- [Overview](#overview)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Examples](#examples)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Status

This library is currently in (very) early development and is not yet ready for production use.

## Overview

This library provides a Go implementation of the devolo PLC API, which allows you to:

- Discover devolo PLC devices on your network using mDNS
- Connect to and control devolo PLC devices
- Access device information and status
- Manage device settings
- Monitor network performance

## Installation

```bash
go get github.com/asnowfix/go-devolo-plc
```

## Usage

```go
package main

import (
    "context"
    "fmt"
    "log"

    "github.com/asnowfix/go-devolo-plc/device"
)

func main() {
    // Create a new device with the IP address
    dev, err := device.New("192.168.0.10")
    if err != nil {
        log.Fatal(err)
    }

    // Connect to the device
    if err := dev.Connect(context.Background()); err != nil {
        log.Fatal(err)
    }
    defer dev.Disconnect()

    // Get device information
    fmt.Printf("Device: %s\n", dev.Product)
    fmt.Printf("Firmware: %s\n", dev.FirmwareVersion())
}
```

## Features

- Device discovery via mDNS
- Device API for managing device settings
- PLC Network API for managing PLC network
- Support for both synchronous and asynchronous operations

## License

This project is licensed under the GNU General Public License v3.0 - see the LICENSE file for details.

## Acknowledgments

This project is based on the Python implementation [devolo_plc_api](https://github.com/2Fake/devolo_plc_api).
