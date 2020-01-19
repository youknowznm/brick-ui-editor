/**
 * @file bird server 登录信息配置
 * @author v_zhanglihong01@baidu.com
 */
// 用于解决 https 请求问题 (忽略https的证书)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// var loginUser = 'tianaxiao';
// var loginUser = 'shuxiaogang'; // 管理员总监提名
// var loginUser = 'wangzeguang'; // 管理员总监提名
// var loginUser = 'wangqiao02'; // 管理员总监提名
// var loginUser = 'huyi03'; // 管理员总监提名
// var loginUser = 'tujie';
// var loginUser = 'lijingya';
// var loginUser = 'yudajun'; // 最终发布
// var loginUser = 'zhanglifang01'; // 最终发布
// var loginUser = 'chenliyan'; // 总监提名
// var loginUser = 'huyi03'; // 总监提名
// var loginUser = 'zhangwenbin'; // 总监提名
// var loginUser = 'chenshangyi '; // 总监提名
// var loginUser = 'guandaisong'; // 总监提名
// var loginUser = 'zhaojinghua'; // 总监提名
// var loginUser = 'zhaojinghua'; // 总监提名
// var loginUser = 'xuqingchang'; // 评委评定
// var loginUser = 'wangyi38'; // 评委评定
// var loginUser = 'wangqing'; // 评委评定
// var loginUser = 'litao07'; // 评委评定
// var loginUser = 'hanzhigang'; // 评委评定
// var loginUser = 'liuzhaolong'; // 评委评定
// var loginUser = 'zhangwenjing01'; // 评委评定
// var loginUser = 'fengjunhui'; // 评委评定
// var loginUser = 'shanyifeng'; // 评委评定
// var loginUser = 'yaoyongzheng'; // 评委评定
// var loginUser = 'xieyiqiu'; // 评委评定
var loginUser = 'yangshuanghua'; // 评委评定
// var loginUser = 'yangsirui'; // 评委评定
// var loginUser = 'zhangxiaoliang04'; // 评委评定
// var loginUser = 'chengfei'; // 评委评定
// var loginUser = 'songshaoying'; // 评委评定
// var loginUser = 'ditao'; // 评委评定
// var loginUser = 'liuzhaolong'; // 评委评定
// var loginUser = 'jiaqingmei'; // 评委评定
// var loginUser = 'lisongyang'; // 评委评定
// var loginUser = 'tangxue02'; // 评委评定
// var loginUser = 'liuzhaolong'; // 评委评定
// var loginUser = 'cuiwenjing'; // 评委评定
// var loginUser = 'wangyi38'; // 评委评定
// var loginUser = 'jesse';

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
    // users: loginInfo(loginUser, 'bpit@B142889'),
    users: loginInfo(loginUser, 'pp5x'),
    // 刷新登录信息
    reloginSeq: 406
};

// var config8050 = {
//     server: 'https://erp8050.baidu.com/tpu-web/',
//     cookie: ''lcms
// };

var config8070 = {
    server: 'https://erp8070.baidu.com/lcms/',
    plugin: 'uuap2',
    useUser: loginUser,
    users: loginInfo(loginUser, 'xx7y'),
    // 刷新登录信息
    reloginSeq: 59
};

module.exports = Object.assign({}, config8070);
