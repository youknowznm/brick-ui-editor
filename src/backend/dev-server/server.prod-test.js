/**
 * @file server file
 * @author lzheng
 */
var express = require('express')
var config = require('common/config')
var utils = require('common/utils')

var bird = require('birdv3')

var app = express()

app.use('/pages', express.static(config.path.prodPages))
app.use('/dll', express.static(config.path.prodDll))
app.use('/dist', express.static(config.path.prodDist))
app.use('/extra', express.static(config.path.prodExtra))

var birdFilePath = utils.p(config.path.bird + '/birdfile.js')
utils.ensureLocalFileFromExample(birdFilePath)

app.all('/', function (req, res) {
    res.redirect('/pages/_matriks_.html')
})

app.all('*', bird(birdFilePath))

require('../server/nodemon')

app.listen(config.prodTestPort, function (err) {
    if (err) {
        utils.log(['error: 启动服务器失败.', err, err.stack])
        return
    }

    utils.log([
        'info: 构建后脚本的测试服务器已启动, 请访问: http://localhost:'
        + config.prodTestPort
    ])
})
