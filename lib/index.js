const request = require('request');
const logger = require('./log');
const util = require('./util');

/**
 * 从data目录获取数据
 */
function getData () {

    let data = {};

    util.eachRequireFiles(
        util.fixPath('data'),
        '*.js',
        function (mod) {
            if (!mod.getData) {
                return;
            }

            data = mod.getData(data);
        }
    );

    return data;
}

/**
 * 从工作目录的指定路径获取数据
 * @param {String} dirname 
 * @param {Object} data 
 */
function getExtraData (dirname, data) {

    util.eachRequireFiles(
        util.fixCwdPath(dirname),
        '*.js',
        function (mod) {
            if (!mod.getData) {
                return;
            }

            data = mod.getData(data);
        }
    );

    return data;
}

function formatData (data) {
    return data;
}

/**
 * 上传数据
 * @param {Object} options 
 * @param {Object} data 
 */
function doReport (options = {}, data = {}) {
    return new Promise((resolve, reject) => {

        let opts = formatReportOptions(options, data);

        logger.debugLog(`[index::doReport] opts: `, opts);

        request.post(opts, function (err, res) {
            if (err) {
                logger.error(err.message);
                reject(err);
            }
    
            logger.debugLog(`[index::doReport] res: `, res.toJSON());

            resolve(res.toJSON());
        });

    });

}

function formatReportOptions(options = {}, data = {}) {

    let pkg = util.requireFile(
        util.fixPath('package.json')
    );

    let opts = Object.assign({
        method: 'POST',
        json: true,
        timeout: 60000,
        headers: {
            'User-Agent': `report-info ${pkg && pkg.version}`
        }
    }, options);
    
    Object.assign(opts.headers, data.headers || {});

    if (opts.json) {
        opts.body = JSON.stringify(data);
    } else {
        opts.body = data;
    }

    return opts;
}

/**
 * 收集数据，上传到服务器
 * @param {Object} options
 * @param {String} options.uri
 * @param {Boolean} options.noUpload
 * @param {String} options.extraDataPath
 */
function report (options = {}) {
    let data = getData();

    if (options.extraDataPath) {
        data = getExtraData(options.extraDataPath, data);
    }
    
    data = formatData(data); 

    logger.debugLog(`[index::report] data: `, data);

    if (options.noUpload) {
        return Promise.resolve(data);     
    }

    return doReport(options, data);
}

module.exports = {
    getData: getData,
    getExtraData: getExtraData,
    formatData: formatData,
    doReport: doReport,
    report: report,
    formatReportOptions: formatReportOptions
}
