let debug = false;

exports.setDebug = function (value) {
    debug = value;
};

exports.debugLog = function () {
    if (!debug) {
        return;
    }

    console.log.apply(this, arguments);
};

exports.error = console.error.bind(console);

exports.log = console.log.bind(console);