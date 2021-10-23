/*
  helloWorldMiddleware en version normale
*/
const helloWorldMiddleware = (req, res, next) => {
  console.log('Hello World !');
  next();
}

/*
  Hello world middleware factory
*/
const helloWorldMiddlewareFactory = (options) => {
  return (req, res, next) => {
    console.log('Hello World !');
    next();
  }
}

module.exports = {
  helloWorldMiddleware,
  helloWorldMiddlewareFactory
};
