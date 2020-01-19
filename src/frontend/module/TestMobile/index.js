/**
 * @file TestMobile 业务模块入口文件
 * @author meijingjing
 * @date 2019-02-25
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

// import {startByBrowserHistory} from '@befe/utils/dev-pattern-vm/index-mobile';
import {start} from '@befe/utils/dev-pattern-vm/index-mobile';

import './style.less';

import React from 'react';

import routes from './routes';
import AppState from './AppState';


const app = new AppState();
start(routes, app);
