const logger = require('./logger');

let i = 1;
logger.info("Hello there");
setInterval(() => {
    logger.info("Hi " + i++);
}, 3000);
