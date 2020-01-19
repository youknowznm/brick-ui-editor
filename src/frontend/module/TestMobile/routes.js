/**
 * @file mobileModule 路由配置
 * @author meijingjing
 */

import {wrapState} from '@befe/utils/dev-pattern-vm/index-mobile';

import MobileLayoutVM from 'frontend/layout/MobileLayoutVM';

import {errorRoute} from './ErrorPageVM/route';

const routes = [
    {
        path: '/index',
        getComponent(next, callback) {
            require.ensure([], () => {
                wrapState(
                    callback, require('./IndexPageVM')
                );
            }, 'index-page');
        }
    }
];

export default {
    path: '/',
    indexRoute: {
        onEnter: (nextState, replace) => replace('/index')
    },
    childRoutes: [
        {
            component: wrapState(null, MobileLayoutVM),
            childRoutes: [
                ...routes,
            ]
        },
        errorRoute
    ]
};
