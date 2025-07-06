# Protocol Buffers for go-devolo-plc

This directory contains Protocol Buffer (protobuf) definitions for the go-devolo-plc project. These `.proto` files define the message structures used for communication with devolo PLC devices.

## Overview

The Protocol Buffer definitions in this directory are used to generate Go code that handles serialization and deserialization of messages exchanged with devolo PLC devices. The generated code implements the `protoreflect.ProtoMessage` interface, which is required for proper Protocol Buffer functionality.

## Available Protocol Buffer Definitions

- **getnetworkoverview.proto**: Defines messages for retrieving network overview information
- **identifydevice.proto**: Defines messages for device identification
- **pairdevice.proto**: Defines messages for device pairing
- **setuserdevicename.proto**: Defines messages for setting device names
- **ledsettings.proto**: Defines messages for LED control
- **factoryreset.proto**: Defines messages for factory reset
- **restart.proto**: Defines messages for device restart
- **support.proto**: Defines messages for support information
- **updatefirmware.proto**: Defines messages for firmware updates

## Generating Go Code

To generate Go code from the Protocol Buffer definitions, you need to have the Protocol Buffer compiler (`protoc`) and the Go Protocol Buffer plugin (`protoc-gen-go`) installed.

### Prerequisites

1. Install Protocol Buffer compiler (protoc)
2. Install Go Protocol Buffer plugin:
   ```bash
   go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
   ```
3. Make sure `$GOPATH/bin` is in your PATH:
   ```bash
   export PATH="$PATH:$(go env GOPATH)/bin"
   ```

### Generate Code

Run the following command from the project root directory:

```bash
protoc --go_out=. --go_opt=paths=source_relative proto/*.proto
```

This will generate `.pb.go` files in the `proto` directory.

## Using Generated Code

The generated Go code provides:

1. Message structs that implement the `protoreflect.ProtoMessage` interface
2. Methods for marshaling and unmarshaling Protocol Buffer messages
3. Getters and setters for message fields
4. Enum values and helper functions

Example usage:

```go
import (
    pb "github.com/asnowfix/go-devolo-plc/proto"
    "google.golang.org/protobuf/proto"
)

// Create a new message
message := &pb.LedSettingsSet{
    State: pb.LedSettingsSet_LED_ON,
}

// Marshal to binary
data, err := proto.Marshal(message)
if err != nil {
    // Handle error
}

// Unmarshal from binary
receivedMessage := &pb.LedSettingsSet{}
if err := proto.Unmarshal(data, receivedMessage); err != nil {
    // Handle error
}

// Access fields using getters
state := receivedMessage.GetState()
```

## Compatibility

The Protocol Buffer definitions in this project are designed to be compatible with the Python `devolo_plc_api` library. This ensures interoperability between the Go and Python implementations.
