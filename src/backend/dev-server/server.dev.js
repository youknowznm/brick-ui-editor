/**
 * @file server file
 * @author lzheng
 */
let {getIPAddress} = require("./lib/get-ip-address");

let util = require('util');
let fs = require('fs')

let _ = require('lodash');
let express = require('express');
let bodyParser = require('body-parser');
let bird = require('birdv3');

let config = require('common/config');
let utils = require('common/utils');
let i18nEditLive = require('common/i18n-edit-live');
let getSingleEntryWebpackConfig = require('webpack-config/get-entry-webpack-config');

let getEntryContent = require('webpack-config/get-entry-webpack-config/get-entry-content');

let devServer = require('./dev-server');

let TEMPLATE_NO_ENTRY = config.CONST.TEMPLATE_NO_ENTRY;

let serverUtils = {
    /**
     * 用于为开发服务器逻辑简单地包装返回对象
     *
     * @def: data, status => {status, data}
     *  // 状态码, default = 'success'
     *  status: string
     *
     *  data: any
     */
    wrapResponse: function (data, status) {
        status = status || 'success'

        return {
            status,
            data
        }
    },

    /**
     * @def: entries => undefined
     *  entries: [pageName]
     */
    toggleEntries: function (entries) {
        var hash = {}

        for (var entryName in config.entries) {
            var entryConfig = config.entries[entryName];

            hash[entryName] = entryConfig;
        }

        entries.forEach(function (entry) {
            if (entry.disabled) {
                return
            }
            var entryConfig = hash[entry.id]

            if (entryConfig.turnedOn !== entry.checked) {
                var pageEntryPath = utils.p(
                    config.path.devEntries + '/' + entry.id + '.js'
                )

                // console.log('@debug, toggle entry = ', entryConfig, pageEntryPath, getEntryContent(entryConfig.entry))
                if (entry.checked) {
                    fs.writeFileSync(
                        pageEntryPath,
                        getEntryContent(entryConfig.entry)
                    );
                } else {
                    fs.writeFileSync(
                        pageEntryPath, TEMPLATE_NO_ENTRY
                    );
                }
                entryConfig.turnedOn = entry.checked
            }
        })
    }
}

/**
 * @def: options: {}
 *  logLevel: 'debug' | undefined
 */
module.exports = function (options) {
    options = options || {}

    devServer({
        port: config.devPort,
        logLevel: options.logLevel,
        lifeCycle: {
            getWebpackConfig: function () {
                var webpackConfig = Object.keys(config.entries)
                    .map(function (entryName) {
                        var entryConfig = config.entries[entryName] || {};
                        if (!entryConfig.template) {
                            utils.log(`error: ${entryName} 的 template 需要配置成功.`);
                        }
                        var templatePath = entryConfig.template.dev;

                        var options = _.extend({}, entryConfig, {
                            dev: true,
                            entryName: entryName,
                            template: templatePath
                        });

                        var innerConfig = getSingleEntryWebpackConfig(options);
                        return innerConfig;
                    });

                if (options.logLevel === 'debug') {
                    console.log(
                        '@debug, webpack config ',
                        util.inspect(webpackConfig, {depth: null})
                    );
                }

                return webpackConfig
            },

            /**
             * 加载特殊的 开发服务器的 逻辑处理
             */
            loadDevServerLogic: function (app, context) {

                // 访问网站根目录 => 跳转至项目控制面板
                app.all('/', function (req, res) {
                    res.redirect('/_matriks_/pages/_matriks_.html')
                })

                // i18n edit live 的中间件
                app.use('/_/i18n_edit_live', i18nEditLive)

                // 解析 matriks 所需的接口
                app.use('/_/matriks/*', bodyParser.json())

                app.all('/_/matriks/get-ip-address', function (req, res) {
                    const ip = getIPAddress();
                    res.send({ip});
                });

                // 得到所有注册的 entries
                app.all('/_/matriks/api/all-entries', function (req, res) {
                    res.send(serverUtils.wrapResponse(config.entries))
                })

                // 打开 / 关闭 某一组 entries
                app.all('/_/matriks/api/toggle-entries', function (req, res) {
                    // console.log('@debug, entries = ', req.body)
                    serverUtils.toggleEntries(req.body.entries)
                    res.send(serverUtils.wrapResponse())
                })

                // 动态 serve dev 环境下的 extra 内容
                app.use(
                    '/extra',
                    express.static(config.path.extraFrontendAsset)
                );

                // serve 已打包之后的 matriks 控制面板的内容
                app.use(
                    '/_matriks_',
                    express.static(utils.p(config.path.backendDevServer + '/matriks/dist'))
                );

                // 挂载 bird 插件
                var birdFilePath = utils.p(config.path.bird + '/birdfile.js');
                utils.ensureLocalFileFromExample(birdFilePath)
                app.all('*', bird(birdFilePath))

                // 启动 backend 的 dev 模式
                require('../server/nodemon');
            }
        }
    })
}
