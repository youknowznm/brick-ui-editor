/**
 * @file MobileApproveModuleModule 业务模块入口文件
 * @author lzheng
 * @date 2018-08-02
 */

// document.body.innerHTML = '<h1>Hello world</h1>'
//
// console.log('hello world 2');

/**
 * 注意事项:
 *
 * 1. 业务模块创建之后, 入口需要在 frontend-entries.js 进行配置 / 维护.
 * 2. 构建与否需要在 build-plan/prod.js 中配置 (即使用 matriks2 dest 时, 对构建模块的开关问题)
 */

import './style.less';

import {mobileApprovalUtils, i18n} from '../../wrapper/mobile';

import React from 'react';
import {render} from 'react-dom';

if (__DEVELOPMENT__) {
    // @todo:temp eruda init
    const eruda = require('eruda');
    eruda.init();
}

i18n.setLang(document.documentElement.lang);

mobileApprovalUtils.init(window.mobileApproval);
mobileApprovalUtils.syncHeight();

window.__webpack_public_path__ = window.DEPLOY_URLS.bpmProxyUrl + window.DEPLOY_URLS.serverUrl + 'dist/';

setTimeout(() => {
    const AppState = require('./AppState').default;
    const app = new AppState();

    const {startMobileApproval, i18n} = require('@befe/utils/dev-pattern-vm/index-mobile');

    // // @todo:temp
    // // i18n.load()
    // //     .then(() => start(app));

    startMobileApproval(app);
});
