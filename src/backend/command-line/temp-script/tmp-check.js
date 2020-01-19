/**
 * @file 模板文件
 * @author lzheng
 */
var config = require('common/config');
var command = require('../../git-syncer/lib/check-sub-repo')({
    path: config.path,
    utils: require('common/utils')
});

command.execute();
