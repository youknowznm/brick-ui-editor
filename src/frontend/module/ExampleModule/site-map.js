import {
    SHOW_BREAD_CRUMB,
    SHOW_HEAD_MENU
} from 'frontend/layout/ERPLayoutVM/ERPLayoutModel/layout-consts';

const module = 'example';

/**
 * @siteNode: {
 *     title,   // 显示名称 reactElement | () => reactElement
 *     key,     // 权限key，不是必须的，如无则会跳过权限校验
 *     path,    // 站内资源 path
 *     module,  // 站内资源 模块
 *     query,   // 站内资源 hash query
 *     url,     // 站外资源地址
 *     icon,    // 主要用于侧边菜单
 *     children[@siteNode]
 * }
 * 对于站内资源 module + path + query 唯一标识一个 siteNode
 * */

export const MODULE_EXAMPLE = module;

export const PAGE_EXAMPLE_INDEX = {
    title: () => '样例模块首页',
    path: '/index',
    module: MODULE_EXAMPLE
};

export const PAGE_EXAMPLE_SOME_LIST = {
    title: () => '样例模块列某表页',
    path: '/some-list',
    module: MODULE_EXAMPLE
};

export const SITE_MAP_EXAMPLE = {
    title: () => '样例模块',
    // icon: 'notebook',
    isOpen: true,
    // ...PAGE_EXAMPLE_INDEX,
    children: [
        PAGE_EXAMPLE_INDEX,
        PAGE_EXAMPLE_SOME_LIST
    ]
};
