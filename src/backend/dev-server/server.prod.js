/**
 * @file server file
 * @author Liang
 */
var express = require('express')
var config = require('common/config')
var utils = require('common/utils')

var app = express()

app.use('/pages', express.static(config.path.prodPages))
app.use('/dll', express.static(config.path.prodDll))
app.use('/dist', express.static(config.path.prodDist))
app.use('/extra', express.static(config.path.prodExtra))

require('../server/server-starter').start({
    app: app
})

app.listen(config.prodPort, function (err) {
    if (err) {
        utils.log(['error: 启动服务器失败.', err, err.stack])
        return
    }

    utils.log([
        'info: 构建后脚本的测试服务器已启动, 请访问: http://localhost:'
        + config.prodPort
    ])
})
