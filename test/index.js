const main = require('../lib/index');
const logger = require('../lib/log');

logger.setDebug(true);

let data = main.getData();

console.log(
    'getData: ',
    data
);

console.log('-----------');

console.log(
    'formatReportOptions: ',
    main.formatReportOptions({
        url: 'http://www.baidu.com'
    }, data)
);
