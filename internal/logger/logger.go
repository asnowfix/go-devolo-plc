package logger

import (
	"context"
	"log"
	"os"
)

// Logger represents a simple logger interface
type Logger interface {
	Debug(msg string, args ...interface{})
	Info(msg string, args ...interface{})
	Warn(msg string, args ...interface{})
	Error(msg string, args ...interface{})
}

// loggerKey is the context key for the logger
type loggerKey struct{}

// defaultLogger is used when no logger is found in context
var defaultLogger = &SimpleLogger{
	logger: log.New(os.Stderr, "", log.LstdFlags),
	level:  LevelInfo,
}

// Level represents the logging level
type Level int

const (
	// LevelDebug is for detailed debugging information
	LevelDebug Level = iota
	// LevelInfo is for general information
	LevelInfo
	// LevelWarn is for warning messages
	LevelWarn
	// LevelError is for error messages
	LevelError
)

// SimpleLogger implements Logger interface
type SimpleLogger struct {
	logger *log.Logger
	level  Level
}

// NewSimpleLogger creates a new SimpleLogger with the given level
func NewSimpleLogger(level Level) *SimpleLogger {
	return &SimpleLogger{
		logger: log.New(os.Stderr, "", log.LstdFlags),
		level:  level,
	}
}

// Debug logs a debug message
func (l *SimpleLogger) Debug(msg string, args ...interface{}) {
	if l.level <= LevelDebug {
		l.logger.Printf("[DEBUG] "+msg, args...)
	}
}

// Info logs an info message
func (l *SimpleLogger) Info(msg string, args ...interface{}) {
	if l.level <= LevelInfo {
		l.logger.Printf("[INFO] "+msg, args...)
	}
}

// Warn logs a warning message
func (l *SimpleLogger) Warn(msg string, args ...interface{}) {
	if l.level <= LevelWarn {
		l.logger.Printf("[WARN] "+msg, args...)
	}
}

// Error logs an error message
func (l *SimpleLogger) Error(msg string, args ...interface{}) {
	if l.level <= LevelError {
		l.logger.Printf("[ERROR] "+msg, args...)
	}
}

// WithLogger adds a logger to the context
func WithLogger(ctx context.Context, logger Logger) context.Context {
	return context.WithValue(ctx, loggerKey{}, logger)
}

// FromContext retrieves the logger from context
func FromContext(ctx context.Context) Logger {
	if logger, ok := ctx.Value(loggerKey{}).(Logger); ok {
		return logger
	}
	return defaultLogger
}
