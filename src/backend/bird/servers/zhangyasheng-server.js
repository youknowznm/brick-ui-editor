/**
 * @time 2018/10/30 下午2:16
 * @description
 * @author zhangyasheng
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
    //
    // users: {
    //     yangshuanghua: 'bpit@B49474',
    // },
    //
    // // 刷新登录信息
    // reloginSeq: 4,
    cookie: 'BAIDUID=CC601CF2813035AC9E0B9DEE46A92343:FG=1; BIDUPSID=CC601CF2813035AC9E0B9DEE46A92343; PSTM=1541746027; UUAP_P_TOKEN=PT-410852-ZFwf7JG4j9U4lSlCM1vZ0Ofyap9dJJflsyN-uuap; BDUSS=RRWDBVRWdMZGY1ZVp4SjQtMm5jdHJVcEJXLW9QTUpqSENIME5SZVRjWDR-eEZjQUFBQUFBJCQAAAAAAAAAAAEAAACVvRBKyfXKx1~J8Mq~AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPhy6lv4cupbOE; contract_management_locale=ZHS; H_PS_PSSID=1450_21082_27377_26350_27244; UUAP_P_TOKEN_OFFLINE=PT-19666-AOMlRBBgG0WUuGDkqd3JC2NmMe5inWaLwFQ-itebeta; accToken=hIPBZBGUc3WoyntF3e8F9nfMYHa2E1XHrGd6tRR1Ru8-4687-kbxF0eGPSfh9kPrvWQruAvlOvY5oUQQOOhtu73Gqlypz5nc3WcxIY2RzKl0gBgtw; oieWebPcUss=hIPBZBGUc3WoyntF3e8F9nfMYHa2E1XHrGd6tRR1Ru8-4686-2eKuidYBJoQkOGQZGaC4ZVTas9E1AkcL3n50gThQlBV1xfAzahYFdc21gLjdkwcD'
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
