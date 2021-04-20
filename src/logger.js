const winston = require('winston');
const moment = require('moment');

const logFormat = winston.format.printf(function(info) {
    return `${moment().format('DD/MM/YY | hh:mm:ss')} | ${info.level} | ${JSON.stringify(info.message, null, 4)}`;
  });

var logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        //
        // - Write to all logs with level `info` and below to `combined.log` 
        // - Write all logs error (and below) to `error.log`.
        //
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.Console({
            format: winston.format.combine(winston.format.colorize(), logFormat)
        })
    ]
});

module.exports =  logger;