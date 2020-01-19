/**
 * @file {{moduleName}} 路由配置
 * @author {{userName}}
 */

import {wrapState} from '@befe/utils/dev-pattern-vm/index-pc-normal';

import {errorRoutes, default404Route} from '@befe/erp-comps/page/erp/Error/routes';
import {CommonERPLayoutVM} from 'frontend/layout/index';
import * as SITE_MAP from './site-map';

const routes = [
    {
        // path: '/index',
        path: SITE_MAP./*{{indexPageConst}}*//*skip*/PAGE_INDEX_NAME/*skip*/.path,
        getComponent(next, callback) {
            require.ensure([], () => {
                wrapState(
                    callback, require('./IndexPageVM')
                );
            }, '{{moduleNameBaseKebab}}-index');
        }
    }
    /* <ROUTE> */
];

export default {
    path: '/',
    indexRoute: {
        onEnter: (nextState, replace) => replace(SITE_MAP./*{{indexPageConst}}*//*skip*/PAGE_INDEX_NAME/*skip*/.path)
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
