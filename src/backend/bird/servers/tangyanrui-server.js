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
    server: 'http://oie-8050-web.dev.weiyun.baidu.com:8121/oie/pc',
    // plugin: 'uuap2',
    // useUser: loginUser,

    // users: {
    //     jiafei03: 'jiafei03'
    // },
    cookie: 'UUAP_P_TOKEN=PT-46790-9vEiNaSoCYncOcfigzm9bfP1iAy5pc5nMTT-uuap; BAIDUID=7E42CBFCDB07F5F2C43DDB5A18348ABB:FG=1; UUAP_P_TOKEN_OFFLINE=PT-3938-bYAimhwNq4jzzb6KThlbfuHmfOScIT7et2q-itebeta; accToken=hIPBZBGUc3WoyntF3e8F9nfMYHa2E1XHrGd6tRR1Ru8-3256-PP4LbJUOcdx4FUJzn5GcCaZKGlwurOZNRhPZX1TbqsBm2CpNkfosumvrM4or3LR1; oieWebPcUss=hIPBZBGUc3WoyntF3e8F9nfMYHa2E1XHrGd6tRR1Ru8-3255-GVAWfL6ywQ0MJFXK5Bbb7pZ1gmUH1BhkWMoiYj7qMph5MxNcqvZuJOyv5JeQULIc',
    // 刷新登录信息
    reloginSeq: 4
};

// var config8050 = {
//     server: 'https://erp8050.baidu.com/lcms/',
//     cookie: ''
// };

var config8070 = {
    server: 'https://erp8070.baidu.com/',
    plugin: 'uuap2',
    useUser: loginUser,
    users: loginInfo(loginUser, 'xx7y'),
    // 刷新登录信息
    reloginSeq: 32
};
var configRd = {
    server: 'http://172.21.203.61:8082/oie/pc'
};

module.exports = Object.assign(
    {},
    config8050
);
