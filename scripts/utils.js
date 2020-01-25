const chalk = require('chalk')
const spawn = require('child_process').spawn;

const colorMap = {
    info: 'blue',
    success: 'green',
    error: 'red',
    warn: 'yellow',
    debug: 'cyan'
}

function consoleMsg(msg, type = 'info') {
    if (msg) {
        const color = colorMap[type]
        const title = color ? chalk[color](`[${type}] `) : ''

        console.log(`${title}${msg}`)
    }
}

function shellPromise (processToRun, options) {
    options = options || {};
    if (options.verbose) {
        console.log(processToRun);
    }
    return new Promise(function(resolve, reject) {
        var local = spawn('sh', ['-c', processToRun], { env: options.env || process.env, cwd: options.cwd || process.cwd() });
        var output = "";

        function toStdErr(data) {
            output += data;
            if (options.verbose) {
                console.warn(data.toString());
            }
        }
        function toStdOut(data) {
            output += data;
            if (options.verbose) {
                console.log(data.toString());
            }
        }

        local.stdout.on('data', toStdOut);
        local.stderr.on('data', toStdErr);
        local.on('error', reject);
        local.on('close', function(code) {
            if (code === 0) {
                resolve(output);
            } else {
                if (options.verbose) {
                    console.warn(processToRun + ' exited with exit code ' + code);
                }
                reject(new Error(output));
            }
        });
    });
};

module.exports = {
    log: msg => console.log(msg),
    info: msg => consoleMsg(msg, 'info'),
    success: msg => consoleMsg(msg, 'success'),
    error: msg => consoleMsg(msg, 'error'),
    warn: msg => consoleMsg(msg, 'warn'),
    debug: msg => consoleMsg(msg, 'debug'),
    shellPromise
}
