const express = require('express');

//==============================================================================
//  Global Middlewares
//==============================================================================
const helmet = require('helmet'); // Enforces good security practices
const cors = require('cors'); // CORS support for API
const morgan = require('morgan'); // HTTP request logger

//==============================================================================
//  Custom middlewares
//==============================================================================
const { hello } = require('@@app/middlewares/hello');

// Instanciate express application
const app = express();

// Add middleware chain
app.use([
  helmet(),
  cors(),
  morgan('tiny'),
  hello()
]);

// API root path, just says hello world ATM...
app.get('/', (req, res) => {
  res.send('Hello World !');
})

// This is an example error-throwing route to show how a generic catch-all
// error handler may work in a real / production environment.
app.get('/error', (req, res) => {
  // A even better approach would be to define appropriate object classes for
  // each HTTP error code.
  const error = new Error('Not implemented !');
  error.code = 501;
  throw error; // this will be catched by "catch-all" error handler, see below.
});

// load controllers
app.use('/users', require('@@app/controllers/users'));

// implement catch-all error handler.
// see https://expressjs.com/en/guide/error-handling.html
app.use((error, req, res, next) => {
  const { code, message, name } = error;
  res.status(code || 500); // if code is defined, use it, use 500 otherwise.
  res.json({ code, message, name });
})

module.exports = app;
