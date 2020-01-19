/**
 * @file: Error 状态对象
 * @author: meijingjing
 * @date: 2019-04-09
 * @description: Error 路由配置
 */

import {wrapState} from '@befe/utils/dev-pattern-vm/index-mobile';

export const errorRoute = {
    path: 'error',
    getComponent(next, callback) {
        require.ensure([], () => {
            wrapState(
                callback, require('./index')
            );
        });
    }
};
