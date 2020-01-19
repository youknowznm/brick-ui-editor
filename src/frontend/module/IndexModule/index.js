/**
 * @file IndexModule 业务模块入口文件
 * @author zhangenming
 */

/**
 * 注意事项:
 *
 * 1. 业务模块创建之后, 入口需要在 frontend-entries.js 进行配置 / 维护.
 * 2. 构建与否需要在 build-plan/prod.js 中配置 (即使用 matriks2 dest 时, 对构建模块的开关问题)
 */

import {start} from '@befe/utils/dev-pattern-vm/index-pc-normal';

import './style.less';

import routes from './routes';
import AppState from './AppState';

import {configure} from 'mobx';

configure({
    isolateGlobalState: true
});

const app = new AppState();

start(routes, app);
