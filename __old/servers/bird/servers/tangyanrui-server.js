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
const serverDev = {
    server: 'http://fssc.dev.weiyun.baidu.com:8819/',
    // plugin: 'uuap2',
    // useUser: loginUser,
    // users: loginInfo(loginUser, passwordSuffix['8070']),
    reloginSeq: 35,
    cookie: 'BIDUPSID=6110C52F3533E89AB1C29CCD418CB123; PSTM=1548144556; BAIDUID=6110C52F3533E89AB1C29CCD418CB123:SL=0:NR=10:FG=1; BDUSS=EUwaERGSXB1MG01VkptaEVROWV-ZHl5N0dKZEc3UzBaZDV0c3JqckRVMjJEcVJkRVFBQUFBJCQAAAAAAAAAAAEAAAAB2FVqQlBfwO7P6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALaBfF22gXxdb; fssc-8020Uss=wXt8ehkNjLCzZRlqMJP9fpsghhwfrrdm0CeE8qMIrmc-23197-oRZdihoidbmQN6whdx4EwjmtiCHVnowpza1gdJY92OmwA0QO53DzUvz6eNK2m2lc; MCITY=-131%3A; UUAP_P_TOKEN=PT-401327198734200833-7rw8hWEePU-uuap; BKMASKSID=09f7e45136e852b3b976beba3f67d5a9; cflag=13%3A3; UUAP_P_TOKEN_OFFLINE=PT-403898004345618432-2qYzMWsgtI-beta; accToken=SgOkMPNbMilhjh50QEvYmFROLJVXkkolTK2721qnqhI-104909-KUqtuAzm9eLaEakDgmtvOcBMqTlC917ZiAdF2179zqYG3NrXD6BAMHqGzoW1cQMO; fssc-8050Uss=SgOkMPNbMilhjh50QEvYmFROLJVXkkolTK2721qnqhI-104908-johW2NqJZLPp2awNAevhrQuroGHej7FxlgraiGpZbRaAp5PFhdmqDjOB7Xcd2dpj; yjs_js_security_passport=d3470c48b3b9bb2d34e5cb724c4c72d79ed6579b_1574591722_js; eapSassVisitUrl=http://fssc.dev.weiyun.baidu.com:8819/'
};

module.exports = serverDev;
