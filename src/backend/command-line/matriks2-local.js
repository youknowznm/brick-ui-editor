/**
 * @file 本地化用于提供一个内部 matriks local 的命令行入口
 * @author lzheng
 */

// #!/usr/bin/env node
var commander = require('commander')
    .version('0.0.1');
var utils = require('common/utils');

require('./index')({
    commander: commander
});

utils.warningOnUnknownSubCommand(commander);

commander.parse(process.argv);

utils.warningOnNoSubCommand(commander);
