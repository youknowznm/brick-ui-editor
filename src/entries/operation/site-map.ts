export const ENTRY_ARCHIVE = 'operation';
export const SITE_NODE_ARCHIVING_LIST = {
    label: '公司组列表',
    path: '/group-list',
    entry: ENTRY_ARCHIVE
}

export const SITE_MAP_OPERATION = {
    label: '运营管理',
    entry: ENTRY_ARCHIVE,
    children: [
        SITE_NODE_ARCHIVING_LIST,
    ]
}
