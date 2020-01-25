// 建议总是将前端静态资源按一个整体 serve 出去
// 相应的，流控可以简单配置成 webapp-domain/static/* -> frontend-domain/*
module.exports = {
    dev: {
        API_CONTEXT: '',
        WEB_CONTEXT: 'static',
        ERP_HOME_URL: 'https://erp8070.baidu.com',
    },
    sit: {
        API_CONTEXT: '',
        WEB_CONTEXT: 'static',
        ERP_HOME_URL: 'https://erp8050.baidu.com',
    },
    uat: {
        API_CONTEXT: '',
        WEB_CONTEXT: 'static',
        ERP_HOME_URL: 'https://erp8030.baidu.com',
    },
    pot: {
        API_CONTEXT: '',
        WEB_CONTEXT: 'static',
        ERP_HOME_URL: 'https://erp8010.baidu.com',
    },
    prd: {
        API_CONTEXT: '',
        WEB_CONTEXT: 'static',
        ERP_HOME_URL: 'https://erp.baidu.com',
    },
    standalone: {
        API_CONTEXT: '',
        WEB_CONTEXT: '',
        ERP_HOME_URL: 'https://erp8070.baidu.com',
    }
}[process.env.WEBPACK_ENV] || {
    API_CONTEXT: '',
    WEB_CONTEXT: '',
    ERP_HOME_URL: 'https://erp8070.baidu.com',
}
