/**
 * @file 用于启动 开发服务器
 * @author Liang
 */

var webpack = require('webpack')
var express = require('express')

var webpackDevMiddleware = require('webpack-dev-middleware')

var utils = require('common/utils')
var fs = require('fs')
var _ = require('lodash')

var gitNpm = require('../command-line/lib/git-npm')

var config = require('common/config')

/**
 * 启动 dev server (webpack, 共享项目 check 等)
 *
 * @def: opts => #@ExpressServer
 *  opts: {}
 *      // dev server 的端口号
 *      port: number | string
 *
 *      // 用于注入几个关键的生命周期, 主要是 webpack 配置生成 / 开发服务器简易后端逻辑
 *      lifeCycle: {cycleStep: callback}
 *          cycleStep: 'getWebpackConfig' | 'loadDevServerLogic'
 *
 *      // 打印 log 的标记
 *      logLevel: debug | info | warn | error | silent
 *
 */
var devServerStarter = function (opts) {
    opts = opts || {};
    opts.lifeCycle = opts.lifeCycle || {};
    var logLevel = opts.logLevel || 'debug';

    var app = express();

    var defaultLog = function (message) {
        utils.logs(['info: ' + message]);
    };

    utils.log(['', '[Detected entries for webpack]'.magenta + ':']);
    utils.log(['', config.entries]);

    // 启动共享项目检查, 后续每隔20秒检查一次
    gitNpm.check({});
    setInterval(function () {
        gitNpm.check({})
    }, 20 * 1000);

    // 启动 webpack 解析器
    // 得到 webpack 的config之后, 通过计算得到entry列表
    var webpackConfig = opts.lifeCycle.getWebpackConfig();
    var compiler = webpack(webpackConfig);

    if (logLevel === 'debug') {
        console.log(webpackConfig);
    }

    // 关键步骤 : 挂载 webpack dev middleware 进行资源监控 / 增量构建 / 加载支持
    app.use(
        webpackDevMiddleware(compiler, {
            logLevel: logLevel === 'silent' ? 'error' : logLevel,
            stats: !['silent'].includes(logLevel) && {
                colors: true,
                context: process.cwd()
            }
        })
    );

    // @todo:pending 以下的 IE 调试注释说明, 有可能并不适用了, 未来可考虑把这个注释去除
    // 如果要在IE下调试, 将以下Hot middleware注释掉
    var webpackHotMiddleware = require('webpack-hot-middleware');
    var hotMiddleware = webpackHotMiddleware(compiler, {log: defaultLog});
    app.use(hotMiddleware);

    if (opts.lifeCycle.loadDevServerLogic) {
        opts.lifeCycle.loadDevServerLogic(app, {})
    }

    var httpServer = require('http').createServer(app);
    var startServer = function () {
        httpServer.listen(opts.port, function (err) {
            if (err) {
                console.error(err);
                utils.logs(['error: ' + err]);
            } else {
                utils.logs([
                    'info: Server run on http://localhost:' + opts.port
                ]);
            }
        });
    };
    startServer();
    return httpServer
};

module.exports = devServerStarter;

