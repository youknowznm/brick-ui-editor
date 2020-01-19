import {
    SHOW_BREAD_CRUMB,
    SHOW_HEAD_MENU
} from 'frontend/layout/ERPLayoutVM/ERPLayoutModel/layout-consts';

const module = 'main';

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

export const MODULE_MAIN = module;

export const PAGE_MAIN_INDEX = {
    title: () => 'main模块首页',
    path: '/index',
    module: MODULE_MAIN
};

export const SITE_MAP_MAIN = {
    title: () => '主模块',
    ...PAGE_MAIN_INDEX
};
