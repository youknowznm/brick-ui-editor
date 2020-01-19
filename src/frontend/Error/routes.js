/* eslint-disable */

/**
 * @file APP_NAME 路由配置
 * @author YOURNAME
 */

// 本模块独有的 PageContainer
// import ModulePageContainer from './PageContainer'

// 使用项目公用的 PageContainer
import PageContainer from 'common/components/PageContainer2019';
// import Error404 from './404'
// import Error403 from './403'

export const errorRoutes = [
    {
        path: 'error',
        indexRoute: {
            onEnter(nextState, replace) {
                replace('404');
            }
        },
        childRoutes: [
            {
                path: '404',
                // componentMobile: Error404,
                getComponent(location, callback) {
                    require.ensure([], () => callback(null, require('./404').default));
                }
            }, {
                path: '403',
                // componentMobile: Error403,
                getComponent(location, callback) {
                    require.ensure([], () => callback(null, require('./403').default));
                }
            }
        ]
    }, {
        path: '*',
        onEnter(nextState, replace) {
            replace('/error/404');
        }
    }
];

export default {
    path: '/',
    indexRoute: {
        onEnter(nextState, replace) {
            replace('index');
        }
    },
    // componentMobile: ModulePageContainer,
    component: PageContainer,
    childRoutes: errorRoutes
}
