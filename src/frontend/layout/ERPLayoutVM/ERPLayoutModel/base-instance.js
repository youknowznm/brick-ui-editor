import {
    i18n
} from '@befe/utils/dev-pattern-vm/index-pc-normal';
import {ERPLayoutModel} from './ERPLayoutModel';
import {SITE_MAP} from './base-site-map';
import {pcNormalUrlUtils} from 'frontend/utils/url-utils/pc-normal-url-utils';
import {pcNormalAgentTheme} from 'frontend/service/agent-theme/pc-normal-agent-theme';

const baseERPLayoutModelInstance = new ERPLayoutModel({

    // ======= required props
    // 必要配置项
    agentTheme: pcNormalAgentTheme,
    urlUtils: pcNormalUrlUtils,

    // ======== public props
    // 必要时进行配置

    // defaultShowOnList: [SHOW_SIDE_MENU],
    // shouldShowHeader: true,
    // headerMenuAlign: 'left',
    // shouldShowHeaderMenu: false,
    logoInfo: {
        erpUrl: '/',
        homeUrl: '#/index',
        subTitle: '子系统'
    },
    // customLogoHook: null,
    // shouldShowProfile: true,
    // rawProfileInfo: {
    //     departmentName: '',
    //     fullName: '',
    //     avatarUrl: undefined,
    //     employeeNumber: '',
    //     userAccount: ''
    // },
    // customProfileMenu: [],
    // shouldShowSidebar: true,
    // isSidebarCollapsed: false,
    // shouldShowBreadcrumbs: true,
    // shouldBreadcrumbsPrependErpHome: false,
    // shouldShowFooter: true,
    // shouldCheckPermission: true,

    // ======== extendable methods
    // 必要时进行覆写，注意有些覆写要求调用特定的 layout api 对数据进行处理

    // fetchUserInfo() {},
    // fetchPermissions() {},
    // checkPermission() {},
    // switchLanguage(lang) {},
    // logout() {},

    // customSideMenuItemHook(siteNode) {},
    // customHeaderMenuItemHook(siteNode) {},
    // customBreadcrumbsHook(crumbsStack) {},
    // customFooterContentHook(){},

    onConstruct() {
        this.setSiteMap(SITE_MAP);
        // this.fetchUserInfo();
        // this.fetchPermissions();
    }

});

export { baseERPLayoutModelInstance };
