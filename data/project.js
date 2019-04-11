const shell = require('shelljs');
const logger = require('../lib/log');
const util = require('../lib/util');

exports.getData = function (data = {}, options = {}) {

    if (!shell.which('git')) {

        logger.error(`[project::getData] git require`);
        return data;
      }

    let branch = util.execShell('git branch');
    let branchText = '';
    if (branch.code) {
        logger.error(`[project::getData] exec git branch failed`);
    } else {
        branchText = (branch.stdout || '').replace(/\*/, '').trim();
    }

    let info = util.execShell('git remote show origin');
    let project = '';
    let fetchUrl = '';

    if (info.code) {
        logger.error(`[project::getData] exec git remote show origin failed`);

    } else {

        logger.debugLog(`[project::getData] infoText: ${info.stdout}`)

        let infoText = info.stdout || '';

        fetchUrl = infoText.match(/Fetch URL:\s*(.+)/);

        fetchUrl = fetchUrl && fetchUrl[1] || '';
        
        project = fetchUrl.match(/\/([^/]+)\.git$/);
        project = project && project[1] || '';

    }

    data.project = {
        project: project,
        branch: branchText,
        fetchUrl: fetchUrl
    };

    return data;
};