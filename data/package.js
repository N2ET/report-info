const util = require('../lib/util');

exports.getData = function (data = {}, options = {}) {

    const pkgFile = 'package.json';

    let pkg = util.requireFile(
        util.fixCwdPath(pkgFile)
    );

    if (!pkg) {
        pkg = {};
    }

    data.package = {
        version: pkg.version || '',
        scripts: pkg.scripts || ''
    };

    return data;
};