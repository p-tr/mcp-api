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

// API root path, just says hello world atm...
app.get('/', (req, res) => {
  res.send('Hello World !');
})

// load controllers
app.use('/users', require('@@app/controllers/users'));

module.exports = app;
