/**
 * @file APP_NAME 路由配置
 * @author YOURNAME
 */
import {isValidElement} from 'react';
import {wrapState, BaseModel} from '@befe/utils/dev-pattern-vm/index-pc-normal';
import {
    errorRoutes,
    default404Route
} from '@befe/erp-comps/page/erp/Error/routes';

import {CommonERPLayoutVM as LayoutVM} from 'frontend/layout/index';

const reqContextLoader = (function () {
    let firstDemoPath = '';
    let childRoutes = [];

    const load = (...reqContextList) => {
        reqContextList.forEach(reqContext => {
            childRoutes = childRoutes.concat(reqContext.keys().map(filename => {
                const component = reqContext(filename).default;
                // @deprecated `demoKey` should be deprecated
                const demoPageKey = component.demoPageKey || component.demoKey;
                // @deprecated `demoName` should be deprecated
                const demoPageName = component.demoPageName || component.demoName;
                const demoCategory = component.demoCategory;

                // console.log('filename = ', filename);

                const demoPath = '/' + demoPageKey.replace(/-demo$/, '');
                if (!firstDemoPath) {
                    firstDemoPath = demoPath;
                }

                let renderer;
                if (component && component.prototype instanceof BaseModel) {
                    renderer = wrapState(null, component);
                }
                else if (isValidElement(component)) {
                    renderer = () => component;
                }
                else {
                    renderer = component;
                }

                return {
                    name: demoPageName,
                    key: demoPageKey,
                    path: demoPath,
                    category: demoCategory,
                    component: renderer
                };
            }));
        });
        const reqContext = reqContextList;
    };

    const getResult = () => ({
        childRoutes,
        firstDemoPath
    });

    const reset = () => {
        childRoutes = [];
        firstDemoPath = '';
    };

    return {
        reset,
        load,
        getResult
    };
})();

export default ([...reqContext], {categoryNameMap = {}} = {}) => {
    reqContextLoader.reset();

    // 动态加载 @befe/ 和 frontend/ 下的样例
    reqContextLoader.load(
        ...reqContext,
    );

    let {childRoutes, firstDemoPath} = reqContextLoader.getResult();

    const menuMap = {};
    childRoutes.forEach(routeItem => {
        const {
            key,
            name,
            path,
            category
        } = routeItem;

        const menuItem = {
            key,
            name,
            path
        };

        if (category) {
            menuMap[category] = menuMap[category] || {
                key: category,
                name: categoryNameMap[category] || category,
                children: []
            };

            menuMap[category].children.push(menuItem);
        }
        else {
            menuMap[key] = menuItem;
        }

    });

    const menu = Object.keys(menuMap)
        .map(key => menuMap[key])
        .sort((cur, next) => (cur.key.toLowerCase() < next.key.toLowerCase() ? -1 : 1));

    return {
        menu,
        path: '/',
        indexRoute: {
            onEnter: (nextState, replace) => replace(firstDemoPath)
        },
        childRoutes: [{
            component: wrapState(null, LayoutVM),
            childRoutes: [
                ...childRoutes,
                ...errorRoutes,
                default404Route
            ]
        }]
    };
};
