/**
 * @file IndexModule 路由配置
 * @author zhangenming
 */

import {wrapState} from '@befe/utils/dev-pattern-vm/index-pc-normal';

import RawLayoutVM from 'frontend/layout/RawLayoutVM';

import {errorRoutes, default404Route} from '@befe/erp-comps/page/erp/Error/routes';

const routes = [
    {
        path: '/index',
        getComponent(next, callback) {
            require.ensure([], () => {
                wrapState(
                    callback, require('./MainPageVM')
                );
            }, 'index-page');
        }
    }

    /* <ROUTE> */
];

export default {
    path: '/',
    indexRoute: {
        onEnter: (nextState, replace) => replace('/index')
    },
    childRoutes: [{
        component: wrapState(null, RawLayoutVM),
        childRoutes: [
            ...routes,
            ...errorRoutes,
            default404Route
        ]
    }]
};
