const fs = require('fs');
const glob = require('glob');
const logger = require('./log');
const path = require('path');
const shell = require('shelljs');

let rootPath;

function requireFile (file) {
    try {
        return require(file); 
    } catch (e) { 
        logger.error(`[util::requestFile] load ${file} failed`)
    }
};

/**
 * @param {String} base - base path
 * @param {String} pattern - glob pattern
 * @param {String} cb - callback
 */
function eachRequireFiles (base, pattern, cb) {
    let files = glob.sync(pattern, {
        cwd: base,
        dot: true,
        realpath: true
    });

    logger.debugLog(`[util::reuireFiles] pattern: ${pattern}`);
    logger.debugLog(`[util::reuireFiles] files: ${files}`);

    if (!cb) {
        return files;
    }

    files.forEach(file => {
        let mod = requireFile(file);

        if (!mod) {
            return;
        }

        cb(mod);
    });

    return files;
}

function readFile (file) {
    try {
        return fs.readFileSync(file, 'utf-8'); 
    } catch (e) { 
        logger.error(`[util::readFile] load ${file} failed`)
    }
};

function writeFile () {

};

function getRootPath () {

    if (rootPath) {
        return rootPath;
    }

    return rootPath = path.normalize(
        path.join(__dirname, '..')
    );
};

function fixPath (p) {
    return path.join(
        getRootPath(),
        p 
    )
};

function getCwdPath () {
    return process.cwd();
}

function fixCwdPath (p) {
    return path.join(
        getCwdPath(),
        p
    )
}

function execShell (cmd) {
    return shell.exec(cmd, {
        silent: true
    })
}

module.exports = {
    requireFile: requireFile,
    eachRequireFiles: eachRequireFiles,
    readFile: readFile,
    writeFile: writeFile,
    getRootPath: getRootPath,
    fixPath: fixPath,
    getCwdPath: getCwdPath,
    fixCwdPath: fixCwdPath,
    execShell: execShell
}