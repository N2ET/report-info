const util = require('../lib/util');
const logger = require('../lib/log');

exports.getData = function (data = {}, options = {}) {

    const pattern = '*(.eslintrc|.eslintrc.json|.eslintrc.js)';
    const ignoreFile = '.eslintignore';

    let eslintrcData;
    util.eachRequireFiles(
        util.getCwdPath(),
        pattern,
        function (mod) {
            if (eslintrcData) {
                logger.error('[eslint::getData] dup eslint config file');
                return;
            }

            eslintrcData = mod;
        }
    );

    const ignoreContent = util.readFile(
        util.fixCwdPath(ignoreFile)
    );

    data.eslint = {
        version: '',
        eslintrc: eslintrcData || {},
        eslintignore: ignoreContent || ''
    };

    return data;
};