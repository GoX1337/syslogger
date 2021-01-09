const { logger, updateLogger } = require('./logger');

let r = 1;
let g = 1;

updateLogger("room " + r, "game " + g);

let i = 1;
logger.info("Hello there");
setInterval(() => {
    logger.info("Hi " + i++);
}, 2000);

setInterval(() => {
  updateLogger("room " + r, "game " + ++g);
}, 5000);

setInterval(() => {
  r++;
}, 10000);
