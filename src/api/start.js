#!/usr/bin/env node

/**
 * API Server Starter
 * Starts the API server for the card game
 */

const PORT = process.env.PORT || 3000;

// Start the API server
require('./server');

// The server is already started in server.js, so we don't need to start it again here
// Just add a console message for clarity
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API Server running on port ${PORT}`);
  console.log(`API is available at http://localhost:${PORT}/api`);
});