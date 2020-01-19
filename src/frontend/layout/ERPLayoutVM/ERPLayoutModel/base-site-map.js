import {SHOW_SIDE_MENU, SHOW_HEAD_MENU, SHOW_BREAD_CRUMB} from './layout-consts';

import {SITE_MAP_EXAMPLE} from 'frontend/module/ExampleModule/site-map';
import {SITE_MAP_MAIN} from 'frontend/module/MainModule/site-map';

const MODULE_EXTERNAL = null;

export const DEFAULT_SIDEBAR_COLLAPSED = false;

export const PAGE_ERP_HOME = {
    title: () => 'ERP 首页',
    url: '/',
    module: null
};

/**
 * @def: siteMapNode
 *  siteMapNode: {}
 *      page: #@PAGE
 *      showOn: [ SHOW_BREAD_CRUMB, SHOW_HEAD_MENU, SHOW_SIDE_MENU ]
 *      isOpen: boolean | false
 *      children: [ #@.sideMapNode ]
 *      pageextra: string
 *      pageKey: string | processed from url & pageextra
 *
 *      // -------- internal use -----------
 *      onClickToggle: func
 */
export const SITE_MAP = {
    page: PAGE_ERP_HOME,
    showOn: [SHOW_BREAD_CRUMB],
    children: [
        SITE_MAP_EXAMPLE,
        SITE_MAP_MAIN
    ]
};
