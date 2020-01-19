/**
 * @file bird server 登录信息配置
 * @author v_zhanglihong01@baidu.com
 */
// 用于解决 https 请求问题 (忽略https的证书)
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';


// var loginUser = 'yangshuanghua';
var loginUser = 'yudajun';
// var loginUser = 'wujiao01';
// var loginUser = 'liuhe';



function loginInfo(user, suffix) {
    var loginCode = {};
    loginCode[user] = user + suffix;
    return loginCode;
}

var config8030 = {
    server: 'https://erp8030.baidu.com/tpu-web/',
    plugin: 'uuap2',
    useUser: loginUser,
    users: loginInfo(loginUser, 'Most3FDA'),
    // 刷新登录信息
    reloginSeq: 3
};
var config8010 = {
    server: 'https://erp8010.baidu.com/tpu-web/',
    plugin: 'uuap2',
    useUser: loginUser,
    users: loginInfo(loginUser, 'by1t'),
    // 刷新登录信息
    reloginSeq: 3
};

var config8050 = {
    server: 'https://erp8050.baidu.com/tpu-web/',
    plugin: 'uuap2',
    useUser: loginUser,
    users: loginInfo(loginUser, 'pp5x'),
    // 刷新登录信息
    reloginSeq: 406
};


var config8070 = {
    // server: '172.21.214.59:8806/lcms/',
    server: 'https://erp8070.baidu.com',
    plugin: 'uuap2',
    useUser: loginUser,
    users: loginInfo(loginUser, 'xx7y'),
    // 刷新登录信息
    reloginSeq: 13
};

var okrConfig = {
    server: 'https://okr8070.dev.weiyun.baidu.com:8153',
    plugin: 'uuap2',
    useUser: loginUser,
    users: loginInfo(loginUser, 'xx7y'),
    // 刷新登录信息
    reloginSeq: 11
}

module.exports = Object.assign({}, okrConfig);
