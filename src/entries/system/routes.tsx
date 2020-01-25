import * as React from 'react'
import {RouteItem} from '../../layouts'
import { SITE_NODE_USER, SITE_NODE_USER_GROUP, SITE_NODE_DATA_AUTHORITY} from "./site-map";

const routes: RouteItem[] = [
    // 用户
    {
        key: 'user-list',
        ...SITE_NODE_USER,
        component: React.lazy(
            () => import(/* webpackChunkName: "system-list" */'./user/list/page')
        ),
    },
    // 用户组
    {
        key: 'user-group-list',
        ...SITE_NODE_USER_GROUP,
        component: React.lazy(
            () => import(/* webpackChunkName: "system-list" */'./user-group/list/page')
        ),
    },
    //数据权限
    {
        key: 'data-authority-management',
        ...SITE_NODE_DATA_AUTHORITY,
        component: React.lazy(
            () => import(/* webpackChunkName: "system-list" */'./data-authority/management/page')
        ),
    },
    // 活动状态管理
    {
        key: 'task-list',
        label: '任务活动管理',
        path: '/task-list',
        component: React.lazy(
            () => import(/* webpackChunkName: "system-list" */'./task-activity/list/page')
        ),
    }
]

export {routes}
