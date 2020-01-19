/**
 * @file mainModule 路由配置
 * @author lzheng
 */

import {wrapState} from '@befe/utils/dev-pattern-vm/index-pc-normal';

import {errorRoutes, default404Route} from '@befe/erp-comps/page/erp/Error/routes';
import {CommonERPLayoutVM} from 'frontend/layout/index';

import * as SITE_MAP from './site-map';

const routes = [
    {
        path: SITE_MAP.PAGE_MAIN_INDEX.path,
        getComponent(next, callback) {
            require.ensure([], () => {
                wrapState(
                    callback, require('./IndexPageVM')
                );
            }, 'main-index');
        }
    }

    /* <ROUTE> */
];

export default {
    path: '/',
    indexRoute: {
        onEnter: (nextState, replace) => replace(SITE_MAP.PAGE_MAIN_INDEX.path)
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
