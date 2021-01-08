const winston = require('winston');
require('winston-syslog').Syslog;

let options = {
    protocol: 'tcp4',
    type: '5424'
}

const logger = winston.createLogger({
  levels: winston.config.syslog.levels,
  transports: [
    new winston.transports.Console(),
    new winston.transports.Syslog(options)
  ]
});

let i = 1;
logger.info("Hello there");
setInterval(() => {
    logger.info("Hi " + i++);
}, 3000);