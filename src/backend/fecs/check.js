/**
 * @file fecs 检查脚本
 * @author Liang
 */
var fecs = require('fecs');
var utils = require('common/utils');
var config = require('common/config');

var configPath = utils.p(config.path.backend + '/fecs/fecs-config.js');
utils.ensureLocalFileFromExample(configPath)

fecs.check(require(configPath), function (success, errors) {
    if (success) {
        console.log('恭喜恭喜, 你的代码没有问题... icode会认你的');
    }
    else {
        console.log(errors);
        console.log('有问题, 赶紧改了吧');
    }
})

