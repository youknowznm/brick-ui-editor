/**
 * @file 初始化
 * @author lzheng
 */
var config = require('common/config');
var command = require('../../git-syncer/lib/init-sub-repo')({
    path: config.path,
    utils: require('common/utils')
});

command.execute({
    key: 'test-module-2',
    path: '/src/node_modules/test-module-2',
    remote: 'http://gitlab.baidu.com/zhengliangliang/test-submodule.git',
    branch: 'test/sub-branch',
    isForce: true
});
