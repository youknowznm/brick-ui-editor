/**
 * @time 2018/11/06
 * @description
 * @author zhangenming
 */

// 用于解决 https 请求问题 (忽略https的证书)
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

// var loginUser = 'tianaxiao';
// var loginUser = 'shuxiaogang'; // 管理员总监提名
// var loginUser = 'wangzeguang'; // 管理员总监提名
// var loginUser = 'wangqiao02'; // 管理员总监提名
// var loginUser = 'huyi03'; // 管理员总监提名
// var loginUser = 'tujie';
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
// var loginUser = 'yangshuanghua'; // 评委评定
// var loginUser = 'yangsirui'; // 评委评定
var loginUser = 'jiafei03';
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

function loginInfo(user, passwordOrSuffix, isRaw) {
    var loginCode = {};
    if (!isRaw) {
        loginCode[user] = user + passwordOrSuffix;
    }
    else {
        loginCode[user] = passwordOrSuffix;
    }
    return loginCode;
}

var config8030 = {
    server: 'https://erp8030.baidu.com/lcms/',
    plugin: 'uuap2',
    useUser: loginUser,
    users: loginInfo(loginUser, 'Most3FDA'),
    // 刷新登录信息
    reloginSeq: 3
};
var config8010 = {
    server: 'https://erp8010.baidu.com/lcms/',
    plugin: 'uuap2',
    useUser: loginUser,
    users: loginInfo(loginUser, 'by1t'),
    // 刷新登录信息
    reloginSeq: 3
};

var config8050 = {
    // server: 'http://oie8050_pc.dev.weiyun.baidu.com/oie/pc/',
    server: 'http://oie-8050-web.dev.weiyun.baidu.com:8121/oie/pc',
    // server: '172.21.213.88:8082/oie/pc',
    // username: 'jiafei03',
    // users: {
    //     jiafei03: 'bpit@B102754'
    // },
    cookie: 'BAIDUID=65187CA3293B8D32B141D34885845E7A:FG=1; PSTM=1540782635; BIDUPSID=75F85557131A16A5A1C325A46FB35395; UUAP_P_TOKEN=PT-26496-euchn5V3zTJUeKeu3RVz5nXWZtWjtaptuli-uuap; UUAP_P_TOKEN_OFFLINE=PT-3927-b9f5ccpNjvVaJpHxSoM5BX16WdE6CMgpAaq-itebeta; accToken=hIPBZBGUc3WoyntF3e8F9nfMYHa2E1XHrGd6tRR1Ru8-3250-e2izCpmFlCvSONeffFzHXf2UnEtWlwT3BjXZwC72CrdjsYIb3ybW907UW6ZavGRt; oieWebPcUss=hIPBZBGUc3WoyntF3e8F9nfMYHa2E1XHrGd6tRR1Ru8-3249-xQEyEpVEeHeksXDYVov2ODjFRob55PcecWSYvRRcMPQptT7VSdcQRXgbjT4RmNXD; PROD=tKW2NBnruLnU0XbF1UZ0O7eKfr; LOGIN_SOURCE=SSO',
    // plugin: 'uuap2',
    useUser: loginUser,
    //
    // users: {
    //     yangshuanghua: 'bpit@B49474',
    // },
    //
    // // 刷新登录信息
    // reloginSeq: 4
};

// var config8050 = {
//     server: 'https://erp8050.baidu.com/lcms/',
//     cookie: ''
// };

var config8070 = {
    // server: 'http://172.21.209.100:8088',
    // plugin: 'uuap2',
    // useUser: loginUser,
    // users: loginInfo(loginUser, 'xx7y'),
    // // 刷新登录信息
    // reloginSeq: 32
};

module.exports = Object.assign(
    {},
    config8050
);
