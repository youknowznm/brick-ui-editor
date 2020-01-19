process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; //  <------ 使用8050时要加上这行，忽略https的证书

const passwordSuffix = {
    8010: 'by1t',
    8030: 'Most3FDA',
    8050: 'pp5x',
    8070: 'xx7y'
};

let loginUser = 'fengjunhui'; // 登录用户
// loginUser = 'xieyiqiu'
// loginUser = 'chengxuanfeng'

function loginInfo(user, suffix) {
    let loginCode = {};
    loginCode[user] = user + suffix;
    return loginCode;
}

const server8070 = {
    server: 'https://erp8070.baidu.com',
    plugin: 'uuap2',
    useUser: loginUser,
    users: loginInfo(loginUser, passwordSuffix['8070']),
    reloginSeq: 35
};

module.exports = server8070;
