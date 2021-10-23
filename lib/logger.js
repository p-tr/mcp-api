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
