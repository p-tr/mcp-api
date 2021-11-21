// load environment variables from file
require('dotenv').config();

// load module-alias configuration from package.json file. This allows us
// to require modules from aliased names instead of tedious, lengthy pathes.
require('module-alias/register');

// load express framework
const express = require('express');

//==============================================================================
//  HTTP server configuration
//==============================================================================
const PORT = process.env.HTTP_LISTEN_PORT || 3000;
const ADDR = process.env.HTTP_LISTEN_ADDR || '127.0.0.1';

// load winston logger
const logger = require('@@lib/logger');

// Enter server mode : listen on addr:port and wait for incoming HTTP requests.
const server = require('@@app').listen(PORT, ADDR, () => {
  const { address, port } = server.address();
  logger.info(`Listening on ${address}:${port} ...`);
});
