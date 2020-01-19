/**
 * @file 用于将后端内容提供给开发时
 */

var nodemon = require('nodemon')

var config = require('common/config')
var utils = require('common/utils')

nodemon({
    script: utils.p(config.path.backendServer + '/nodemon-index.js'),
    watch: [
        config.path.backendServer,
        config.path.backendModules,
    ]
})