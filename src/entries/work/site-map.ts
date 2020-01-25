export const ENTRY_WORK = 'work'
export const SITE_NODE_WORK_LIST = {
    label: '工作列表',
    path: '/list',
    entry: ENTRY_WORK
}

export const SITE_MAP_WORK = {
    label: '工作列表',
    entry: ENTRY_WORK,
    ...SITE_NODE_WORK_LIST,
    // children: [
    //     SITE_NODE_WORK_LIST,
    // ],
}
