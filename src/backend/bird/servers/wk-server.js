process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; //  <------ 使用8050时要加上这行，忽略https的证书

const passwordSuffix = {
    8010: 'by1t',
    8030: 'Most3FDA',
    8050: 'pp5x',
    8070: 'xx7y'
};

let loginUser = 'liyan31'; // 登录用户

function loginInfo(user, suffix) {
    let loginCode = {};
    loginCode[user] = user + suffix;
    return loginCode;
}

const server8050 = {
    server: 'http://idc-dev-web.dev.weiyun.baidu.com:8048',
    // 水麒麟
    loginUrl: 'http://idc-dev-web.dev.weiyun.baidu.com:8048/pages/main.html#/index',
    plugin: 'wk2',
    extendConfig: {
        loginPostionInfo: { enterpriseInputValue: 'erp' }
    },
    // plugin: 'uuap2',
    useUser: 'chenmo03',
    users: {
        chenmo03: 'bpit@B135128', // 陈莫
        maxin09: 'bpit@B106678',
        xuqianqian03: 'bpit@B106118', // 财务审批
        zhoubowen01: 'bpit@B139375', // SYS机架负责人
        liyan31: 'bpit@B97527', // 合同运营审批
        liuyixuan: 'bpit@B115570', // 预提结算
        wangyichan: 'bpit@B107205', // 预算审批（需求申请）
        lvruizhi: 'bpit@B131941', // BD接口人分发（需求申请）
        zhouhan02: 'bpit@B75407', // 任务分发选择的人
        wangnan: 'bpit@B20436', // 机房业务经理
        zhangyukun: 'bpit@B15748', // IDC带宽*传输业务经理
        liuning01: 'bpit@B6695', // CDN业务经理（调研需求申请
        zhoumin03: 'bpit@B47370', // 审批冲销增补
        yaoyue: 'bpit@B90117',
        liangyanchao: 'bpit@B135060',
        yinyueming: 'bpit@B101322',
        huangyuhui: 'bpit@B49653',
    },
    reloginSeq: 35,
}

const server8070 = {
    server: 'http://idc-test-web.dev.weiyun.baidu.com:8022',
    // 水麒麟
    loginUrl: 'http://idc-test-web.dev.weiyun.baidu.com:8022/pages/main.html#/index',
    plugin: 'wk',
    extendConfig: {
        loginPostionInfo: { enterpriseInputValue: 'erp' }
    },
    // plugin: 'uuap2',
    useUser: loginUser,
    users: loginInfo(loginUser, passwordSuffix['8070']),
    reloginSeq: 35,
};

module.exports = server8070;
