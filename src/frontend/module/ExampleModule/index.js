/**
 * @file exampleModule 业务模块入口文件
 * @author lzheng
 * @date 2018-10-18
 */

/**
 * 注意事项:
 *
 * 1. 业务模块创建之后, 入口需要在 frontend-entries.js 进行配置 / 维护.
 * 2. 构建与否需要在 build-plan/prod.js 中配置 (即使用 matriks2 dest 时, 对构建模块的开关问题)
 */

import {start, i18n} from '@befe/utils/dev-pattern-vm/index-pc-normal';
import 'frontend/wrapper/erp-pc';

import './style.less';

import routes from './routes';
import AppVM from './AppVM';

i18n.load()
    .then(
        () => start(routes, new AppVM())
    );
