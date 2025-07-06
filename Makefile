# Makefile for go-devolo-plc
# This Makefile provides local targets that mirror the GitHub workflow actions

# Go parameters
GOCMD=go
GOBUILD=$(GOCMD) build
GOTEST=$(GOCMD) test
GOGET=$(GOCMD) get
GOMOD=$(GOCMD) mod
GOVET=$(GOCMD) vet
GOPATH=$(shell $(GOCMD) env GOPATH)
GOBIN=$(GOPATH)/bin

# Protobuf parameters
PROTO_FILES=$(wildcard proto/*.proto)
PROTOC=protoc
PROTO_GO_OUT=--go_out=. --go_opt=paths=source_relative
PROTO_GRPC_OUT=--go-grpc_out=. --go-grpc_opt=paths=source_relative

# Coverage parameters
COVERAGE_FILE=coverage.txt
COVERAGE_MODE=atomic

# Linter parameters
GOLANGCI_LINT=$(GOBIN)/golangci-lint
GOIMPORTS=$(GOBIN)/goimports
STATICCHECK=$(GOBIN)/staticcheck
GOSEC=$(GOBIN)/gosec
GOVULNCHECK=$(GOBIN)/govulncheck

# Default target
.PHONY: all
all: deps proto fmt lint test build

# Install dependencies
.PHONY: deps
deps:
	@echo "Installing dependencies..."
	$(GOGET) -v ./...
	$(GOMOD) tidy

# Install development tools
.PHONY: tools
tools:
	@echo "Installing development tools..."
	$(GOCMD) install golang.org/x/tools/cmd/goimports@latest
	$(GOCMD) install honnef.co/go/tools/cmd/staticcheck@latest
	$(GOCMD) install github.com/securego/gosec/v2/cmd/gosec@latest
	$(GOCMD) install golang.org/x/vuln/cmd/govulncheck@latest
	$(GOCMD) install google.golang.org/protobuf/cmd/protoc-gen-go@latest
	$(GOCMD) install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
	curl -sSfL https://raw.githubusercontent.com/golangci/golangci-lint/master/install.sh | sh -s -- -b $(GOBIN) v1.54.2

# Generate protobuf files
.PHONY: proto
proto:
	@echo "Generating protobuf files..."
	@for proto_file in $(PROTO_FILES); do \
		echo "Processing $$proto_file"; \
		$(PROTOC) $(PROTO_GO_OUT) $(PROTO_GRPC_OUT) $$proto_file; \
	done

# Format code
.PHONY: fmt
fmt:
	@echo "Formatting code with gofmt..."
	@if [ -n "$$(gofmt -l .)" ]; then \
		echo "The following files need formatting:"; \
		gofmt -l .; \
		echo "Running gofmt..."; \
		gofmt -w .; \
	else \
		echo "All files are properly formatted."; \
	fi

# Check imports
.PHONY: imports
imports: tools
	@echo "Checking imports with goimports..."
	@if [ -n "$$($(GOIMPORTS) -l .)" ]; then \
		echo "The following files have import issues:"; \
		$(GOIMPORTS) -l .; \
		echo "Running goimports..."; \
		$(GOIMPORTS) -w .; \
	else \
		echo "All imports are properly formatted."; \
	fi

# Run linters
.PHONY: lint
lint: tools
	@echo "Running golangci-lint..."
	$(GOLANGCI_LINT) run --timeout=5m

	@echo "Running go vet..."
	$(GOVET) ./...

	@echo "Running staticcheck..."
	$(STATICCHECK) ./...

# Run security checks
.PHONY: security
security: tools proto
	@echo "Running gosec security scanner..."
	$(GOSEC) -fmt=text -out=security-results.txt ./...

	@echo "Running govulncheck..."
	$(GOVULNCHECK) ./...

# Run tests
.PHONY: test
test: proto
	@echo "Running tests..."
	$(GOTEST) -v -race -coverprofile=$(COVERAGE_FILE) -covermode=$(COVERAGE_MODE) ./...

# Build the project
.PHONY: build
build: proto
	@echo "Building..."
	$(GOBUILD) -v ./...

# Clean up
.PHONY: clean
clean:
	@echo "Cleaning..."
	rm -f $(COVERAGE_FILE)
	find . -type f -name "*.pb.go" -delete
	find . -type f -name "*.pb.gw.go" -delete
	find . -type f -name "*.pb.validate.go" -delete

# Show help
.PHONY: help
help:
	@echo "Available targets:"
	@echo "  all       - Install dependencies, generate protobuf files, format code, run linters, run tests, and build"
	@echo "  deps      - Install dependencies"
	@echo "  tools     - Install development tools"
	@echo "  proto     - Generate protobuf files"
	@echo "  fmt       - Format code with gofmt"
	@echo "  imports   - Check and fix imports with goimports"
	@echo "  lint      - Run linters (golangci-lint, go vet, staticcheck)"
	@echo "  security  - Run security checks (gosec, govulncheck)"
	@echo "  test      - Run tests with coverage"
	@echo "  build     - Build the project"
	@echo "  clean     - Clean up generated files"
	@echo "  help      - Show this help message"
