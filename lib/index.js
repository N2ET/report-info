const request = require('request');
const logger = require('./log');
const util = require('./util');

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

function formatData (data) {
    return data;
}

function doReport (data) {
    return new Promise((resolve, reject) => {

        request.post({
            url: R_config.reportUrl,
            headers: data.headers || {},
            formData: data.data || {}
            
        }, function (err, res) {
            if (err) {
                logger.error(err.message);
                reject(err);
            }
    
            resolve(res);
        })

    });

}

function report () {
    let data = getData();
    data = formatData(data); 
    return doReport(data);
}

module.exports = {
    getData: getData,
    formatData: formatData,
    doReport: doReport,
    report: report
}
