// 用于取消 https 的强检查
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const fs = require('fs')

// 你可以创建自己的 server 配置脚本
// eslint-disable-next-line no-undef
const devServer = birdDynamicRequire('./servers/dev-server')

/*
 重登录说明
 访问 http://localhost:5678/_/bird-tool/relogin 来重登录
 */

// -------------------- config-----------------------
const birdConfig = {
    name: 'My App',
    // birdPort: 5678  // 用的中间件 这个没用

    staticFileRootDirPath: './',
    mockRoot: './mock',
    middleware: true,

    debug: true,

    useServer: 'devServer',

    servers: {
        devServer: devServer
    },

    routes: [],

    // platformUrl: 'http://origin.eux.baidu.com:8000/api/report',
    // initCheckUrl: 'http://origin.eux.baidu.com:8000/api/birdClientInit'
}

// ----------------------- ROUTES ----------------------
// eslint-disable-next-line no-undef
const routes = birdDynamicRequireModuleFolder('./modules')
routes.map(function(config) {
    birdConfig.routes = birdConfig.routes.concat(config)
})

module.exports = birdConfig