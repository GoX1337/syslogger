const winston = require('winston');
const { format } = winston;
const { timestamp, combine, json, printf } = format;
require('winston-syslog').Syslog;

const myFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

const syslogOptions = {
    protocol: 'tcp4',
    port: 55577,
    type: '5424',
    format: json()
}

const consoleOptions = {
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss:SSS'
        }),
        myFormat
    )
}

let meta = {};

let logger = winston.createLogger({
    level: 'info',
    levels: winston.config.syslog.levels,
    transports: [
        new winston.transports.Console(consoleOptions),
        new winston.transports.Syslog(syslogOptions)
    ]
});

module.exports.updateLogger = (roomId, gameId) => {
    meta = {
        roomId, 
        gameId
    }
}

module.exports.logger = {
    info: (msg) => {
        logger.info(msg, meta);
    },
    warn: (msg) => {
        logger.warn(msg, meta);
    },
    error: (msg) => {
        logger.error(msg, meta);
    }
};