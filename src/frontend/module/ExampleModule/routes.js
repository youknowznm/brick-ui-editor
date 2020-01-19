/**
 * @file exampleModule 路由配置
 * @author wujun07
 */

import {wrapState} from '@befe/utils/dev-pattern-vm/index-pc-normal';

import {errorRoutes, default404Route} from '@befe/erp-comps/page/erp/Error/routes';
import {CommonERPLayoutVM} from 'frontend/layout/index';

import * as SITE_MAP from './site-map';

/**
 * 注意事项:
 * 这是一个样例模块，不要将其重名为你项目业务模块！！！
 * */

const routes = [
    {
        path: SITE_MAP.PAGE_EXAMPLE_INDEX.path,
        getComponent(next, callback) {
            require.ensure([], () => {
                wrapState(
                    callback, require('./IndexPageVM')
                );
            }, 'example-index');
        }
    }, {
        path: SITE_MAP.PAGE_EXAMPLE_SOME_LIST.path,
        getComponent(next, callback) {
            require.ensure([], () => {
                wrapState(
                    callback, require('./SomeListPageVM')
                );
            }, 'example-some-list');
        }
    }

    /* <ROUTE> */
];

export default {
    path: '/',
    indexRoute: {
        onEnter: (nextState, replace) => replace(SITE_MAP.PAGE_EXAMPLE_INDEX.path)
    },
    childRoutes: [{
        component: wrapState(null, CommonERPLayoutVM),
        childRoutes: [
            ...routes,
            ...errorRoutes,
            default404Route
        ]
    }]
};
