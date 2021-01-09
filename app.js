const { logger, updateLogger } = require('./logger');

updateLogger("room 1", "game 1");

let i = 1;
logger.info("Hello there");
setInterval(() => {
    logger.info("Hi " + i++);
}, 2000);

setTimeout(() => {
  updateLogger("room 1", "game 2");
}, 5000);

setTimeout(() => {
  updateLogger("room 1", "game 3");
}, 8000);