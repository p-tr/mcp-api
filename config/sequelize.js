// This file replaces the default config.json sequelize configuration file.

const logger = require('@@lib/logger');

// This file loads database configuration from environment variables

const username = process.env.DB_USERNAME || '';
const password = process.env.DB_PASSWORD || null;
const database = process.env.DB_NAME || 'mcp';
const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_PORT || 3306;
const dialect = process.env.DB_DIALECT || 'mysql';
const env = process.env.NODE_ENV || 'development';
const socketPath = process.env.DB_SOCKET_PATH || null;
const logging = (env === 'development') ? logger.debug.bind(logger) : false;

let config = {
  username, password, database, host, port, dialect, logging
};

if(socketPath) {
  config.socketPath = socketPath;
}

module.exports = {
  [env]: config
};
