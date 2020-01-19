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
    server: 'https://erp8050.baidu.com/lcms/',
    plugin: 'uuap2',
    useUser: loginUser,

    users: {
        yangshuanghua: 'bpit@B49474'
    },

    // 刷新登录信息
    reloginSeq: 4
};

var config8050 = {
    server: 'http://oie-8050-web.dev.weiyun.baidu.com:8121/oie/pc',
    cookie: 'BAIDUID=D9D77AAFC0D356C369A799F8FFD9FDEB:FG=1; PSTM=1537975336; BIDUPSID=4C51BF81899485B6623C0C84E16F348E; BDUSS=lYdXVFVU9aYi1lME1GN0F-dXRpZE1LYk91NmpwaWhXdVVaS2I3OGZDVXRTTzFiQVFBQUFBJCQAAAAAAAAAAAEAAAC9xBZw1qPBwXVuc3cAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC27xVstu8VbWm; delPer=0; ZD_ENTRY=google; LOGIN_SOURCE=SSO; BDRCVFR[feWj1Vr5u3D]=I67x6TjHwwYf0; BDRCVFR[dG2JNJb_ajR]=mk3SLVN4HKm; BDRCVFR[-pGxjrCMryR]=mk3SLVN4HKm; pgv_pvi=1515687936; pgv_si=s7189356544; UUAP_P_TOKEN=PT-827-jqy4jZZy7dmFFSm0fcF7NYlfFWJa4RdrT23-uuap; H_PS_PSSID=1440_27211_21107_27509; PSINO=1; contract_management_locale=ZHS; MCITY=-131%3A; PROD=4QpK9Q8ZMYuBFNNHXI1UX1wByF; UUAP_P_TOKEN_OFFLINE=PT-24592-NtMNKqYxfrJN4Gfn940e6XCRKIfgDeug152-itebeta; accToken=hIPBZBGUc3WoyntF3e8F9nfMYHa2E1XHrGd6tRR1Ru8-5107-9DQw7f3Q7ZoDtFfLhMnRdiegWRVmU9RYLkC5TilHy9fPIqtmRO5zBu0s9dQ6RunU; oieWebPcUss=hIPBZBGUc3WoyntF3e8F9nfMYHa2E1XHrGd6tRR1Ru8-5106-kah6BbQhn3nXDh3jCBKXVifhAV2THbWmdQsaKpXF2QZyHAtoRxvir9gGqEFscP0k',
    reloginSeq: 22,
};

// @todo:to-fix 需要 fix 8070 的配置
var config8070 = {
    server: 'https://erp8070.baidu.com/',
    // plugin: 'uuap2',
    // useUser: loginUser,
    // users: loginInfo(loginUser, 'xx7y'),

    // 刷新登录信息
    reloginSeq: 32
};

module.exports = Object.assign(
    {},
    config8050
);
