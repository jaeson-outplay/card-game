#!/usr/bin/env node

/**
 * API Server Starter
 * Starts the API server for the card game
 */

const PORT = process.env.PORT || 3000;

// Start the API server
require('./server');

// The server is already started in server.js, so we don't need to start it again here
console.log(`API Server should be running on port ${PORT}`);
console.log(`API should be available at http://localhost:${PORT}/api`);