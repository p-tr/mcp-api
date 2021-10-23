// load environment variables from file
require('dotenv').config();

// load module-alias configuration
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

const logger = require('@@lib/logger');

const { User } = require('@@db');

const {
  helloWorldMiddleware,
  helloWorldMiddlewareFactory
} = require('./middlewares');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use(helloWorldMiddleware);
app.use(helloWorldMiddlewareFactory());

// première route : traitement de l'URI / (racine de l'API)
app.get('/', (req, res) => {
  res.send('Hello World !');
})

// liste de tous les utilisateurs
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
})

const server = app.listen(PORT, ADDR, () => {
  const { address, port } = server.address();
  logger.info(`Listening on ${address}:${port} ...`);
});
