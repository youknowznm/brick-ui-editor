
const ENTRY_SYSTEM = 'system'

export const SITE_NODE_USER = {
    label: '用户',
    path: '/user-list',
    key: 'user',
    entry: ENTRY_SYSTEM,
};

export const SITE_NODE_USER_GROUP = {
    label: '用户组',
    path: '/user-group-list',
    entry: ENTRY_SYSTEM,
}


export const SITE_NODE_USER_CONTROL = {
    label: '用户管理',
    children: [
        SITE_NODE_USER_GROUP,
        SITE_NODE_USER,
    ]
}

export const SITE_NODE_DATA_AUTHORITY = {
        label: '数据权限',
        path: '/data-authority-management',
        entry: ENTRY_SYSTEM,
}

export const SITE_NODE_ACTIVITY = {
    label: '活动状态管理',
    children: [
        {
            label: '任务活动管理',
            path: '/task-list',
            entry: ENTRY_SYSTEM
        },
        {
            label: '单据状态管理',
            path: '/document-status',
            entry: ENTRY_SYSTEM
        }
    ]
}
export const SITE_NODE_BUSINESS_CATEGORIES = {
    label: '业务分类管理',
    children: []
}
export const SITE_NODE_BASIC_INFORMATION = {
    label: '基础信息管理',
    children: []
}
export const SITE_NODE_BASIC = {
    label: '基础设置',
    children: []
}

export const SITE_MAP_SYSTEM = {
    label: '系统管理',
    children: [
        SITE_NODE_USER_CONTROL,
        SITE_NODE_DATA_AUTHORITY,
        SITE_NODE_ACTIVITY,
        // SITE_NODE_BUSINESS_CATEGORIES,
        // SITE_NODE_BASIC_INFORMATION,
        // SITE_NODE_BASIC
    ],
}
