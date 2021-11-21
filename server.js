// load environment variables from file
require('dotenv').config();

// load module-alias configuration from package.json file. This allows us
// to require modules from aliased names instead of tedious, lengthy pathes.
require('module-alias/register');

// load express framework
const express = require('express');

//==============================================================================
//  Global Middlewares
//==============================================================================
const helmet = require('helmet'); // Enforces good security practices
const cors = require('cors'); // CORS support for API
const morgan = require('morgan'); // HTTP request logger

//==============================================================================
//  HTTP server configuration
//==============================================================================
const PORT = process.env.HTTP_LISTEN_PORT || 3000;
const ADDR = process.env.HTTP_LISTEN_ADDR || '127.0.0.1';

// load winston logger
const logger = require('@@lib/logger');

// load database models
const { User } = require('@@db');

// load custom middlewares
const { helloWorldMiddleware, helloWorldMiddlewareFactory } = require('./middlewares');

// Instanciate express application
const app = express();

// Add global middlewares
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

// Add custom middlewares
app.use(helloWorldMiddleware);
app.use(helloWorldMiddlewareFactory());

// API root path, just says hello world atm...
app.get('/', (req, res) => {
  res.send('Hello World !');
})

// REST design : return all users as an array of objects (collection), JSON
// formatted.
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
})

// Enter server mode : listen on addr:port and wait for incoming HTTP requests.
const server = app.listen(PORT, ADDR, () => {
  const { address, port } = server.address();
  logger.info(`Listening on ${address}:${port} ...`);
});
