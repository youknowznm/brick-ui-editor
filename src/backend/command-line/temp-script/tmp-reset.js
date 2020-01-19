/**
 * @file 重置
 * @author lzheng
 */
var config = require('common/config');
var command = require('../../git-syncer/lib/reset-sub-repo')({
    path: config.path,
    utils: require('common/utils')
});

command.execute();
