const main = require('../lib/index');
const logger = require('../lib/log');

logger.setDebug(true);

console.log(
    main.getData()
);
