const MODULE_EXTERNAL = null;
const MODULE_MAIN = 'main';

export const SHOW_SIDE_MENU = 'side-menu';
export const SHOW_HEAD_MENU = 'head-menu';
export const SHOW_BREAD_CRUMB = 'breadcrumb';

export const DEFAULT_SHOW_LIST = [
    SHOW_SIDE_MENU,
    SHOW_BREAD_CRUMB
];

export const DEFAULT_SIDEBAR_COLLAPSED = false;

export const PAGE_ERP_HOME = {
    title: () => 'ERP 首页',
    url: '/',
    module: null
};

/**
 *
 * @def: {}
 *  title: () => string
 *  url: string
 *  module: 'main' | null
 */
export const PAGE_SETUP_COMPANY_CONFIG = {
    title: () => '启动公司设置',
    url: '/setup-company-config',
    module: MODULE_MAIN
};

export const PAGE_BILLS_QUERY = {
    title: () => '单据查询',
    url: '/bills-query',
    module: MODULE_MAIN
};

export const PAGE_EXPENSE_INDEX = {
    title: () => '费用首页',
    url: '/index',
    module: MODULE_MAIN
};

export const PAGE_EXPENSE_EDIT = {
    title: () => '编辑费用',
    url: '/edit-expense',
    module: MODULE_MAIN
};

export const PAGE_ADVANCED_QUERY = {
    title: () => '高级查询',
    url: '/advanced-query',
    module: MODULE_MAIN
};

/**
 * @def: [ siteMapNode ]
 *  siteMapNode: {}
 *      page: #@PAGE
 *      showOn: [ SHOW_BREAD_CRUMB, SHOW_HEAD_MENU, SHOW_SIDE_MENU ]
 *      sideMenuKey: string | undefined
 *      isOpen: boolean | false
 *      children: [ #@.sideMapNode ]
 *      pageextra: string
 *      pageKey: string | processed from url & pageextra
 *
 *      // -------- internal use -----------
 *      onClickToggle: func
 */
export const SITE_MAP = [{
    page: PAGE_ERP_HOME,
    showOn: [SHOW_BREAD_CRUMB],
    children: [
        {
            title: () => 'OIE 配置',
            sideMenuKey: 'oie-config',
            isOpen: true,
            children: [
                {
                    page: PAGE_SETUP_COMPANY_CONFIG
                }
            ]
        },
        {
            page: PAGE_EXPENSE_INDEX,
            sideMenuKey: 'expense',
            sideMenuIcon: 'account-setting',
            children: [
                {
                    page: PAGE_EXPENSE_EDIT
                },
                {
                    page: PAGE_BILLS_QUERY
                }
            ]
        },
        {
            page: PAGE_BILLS_QUERY,
            showOn: [SHOW_BREAD_CRUMB],
            pageextra: 'fromRoot'
        }
    ]
}];
