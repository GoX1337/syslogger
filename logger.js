const winston = require('winston');
const { format } = winston;
const { timestamp, combine, label, json, printf } = format;
require('winston-syslog').Syslog;

const myFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

let syslogOptions = {
    protocol: 'tcp4',
    port: 55577,
    type: '5424',
    format: combine (
        label({ label: 'category one' }),
        json()
    )
}

let consoleOptions = {
    format: combine(
        timestamp({
            format: 'YYYY-MM-DD HH:mm:ss:SSS'
        }),
        myFormat
    )
}

module.exports = winston.createLogger({
    levels: winston.config.syslog.levels,
    transports: [
        new winston.transports.Console(consoleOptions),
        new winston.transports.Syslog(syslogOptions)
    ]
});
