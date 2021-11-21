//  Winston is a wonderful logger library used by many projects. It allows
//  us to build our own logging output and interface. This file contains
//  a good default logging configuration for winston, using console (STDIO)
//  as logging transport.
//
//  Winston documentation can be found here :
//    https://github.com/winstonjs/winston/blob/master/README.md

const winston = require('winston');

const env = process.env.NODE_ENV || 'development';

const logger = winston.createLogger({
  level: (env == 'development') ? 'debug' : 'info',
  handleRejections: true,
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss,SSS'
        }),
        winston.format.printf(({ level, message, timestamp }) => {
          return `[${timestamp}] - ${level.toUpperCase()} - ${message}`;
        })
      )
    })
  ]
});

module.exports = logger;
