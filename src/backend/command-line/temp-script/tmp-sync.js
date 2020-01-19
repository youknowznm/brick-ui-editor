/**
 * @file 异步
 * @author lzheng
 */
var config = require('common/config');
var command = require('../../git-syncer/lib/sync-sub-repo')({
    path: config.path,
    utils: require('common/utils')
});

command.execute();
