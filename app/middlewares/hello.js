//  (Example) This function is a basic middleware, it just logs things and gives
//  control to the next middleware in the HTTP chain.
const helloWorldMiddleware = (req, res, next) => {
  console.log('Hello World !');
  next();
}

//  This function is a middleware factory : it builds on the fly a closure
//  (function), given options and returns it. Most middlewares are written this
//  way, so we can add parameters and arguments to them and craft them given
//  those parameters / arguments.
const hello = (options) => {
  return (req, res, next) => {
    console.log('Hello World !');
    next();
  }
}

module.exports = { hello };
