"use strict";
// Global error handler for unhandled promise rejections
// This prevents the Node.js process from crashing on Railway
if (typeof window === 'undefined') {
    // Only run on server side
    process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at:', promise, 'reason:', reason);
        // Log the error but don't exit the process
        // This prevents Railway from killing the instance
    });
    process.on('uncaughtException', (error) => {
        console.error('Uncaught Exception:', error);
        // Log the error but don't exit the process
        // This prevents Railway from killing the instance
    });
}
