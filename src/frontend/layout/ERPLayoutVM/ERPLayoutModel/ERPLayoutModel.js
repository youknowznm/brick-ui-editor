import {
    setProps,
    computed,
    observable,
    action,
    h,
    i18n
} from '@befe/utils/dev-pattern-vm/index-pc-normal';
import {
    DEFAULT_SHOW_LIST,
    SHOW_SIDE_MENU,
    SHOW_HEAD_MENU,
    SHOW_BREAD_CRUMB
} from './layout-consts';
import {
    fetchUserInfoService,
    switchLanguageService,
    fetchPermissionsService,
    fetchLanguageInfoService,
    logoutService
} from './app-general-api';
import ERPLogo from '@befe/erp-comps/v2/components/Header2019/ERPLogo';

export class ERPLayoutModel {

    // ======= private props 不要直接设置这些值

    @observable siteMap = {};

    @observable module = '';
    // @todo: refactor 按语义上重命名为 path，
    @observable path = '';
    @observable query = {};

    @observable pageQueryKey = '';
    @observable currentNode = null;

    previousPathname;
    previousPageQueryKey;
    pageMetaData = {};

    @observable isPermissionsReady = false;

    @observable currentLang = i18n.getLangCode();

    // 页面是否 "加载中" 状态
    @observable loadingStatusMap = observable.map();

    // ======== public props 可以直接设置这些 props

    /**
     * siteMap node.showOn 的默认值
     * 如配置，则优先于 DEFAULT_SHOW_LIST
     * */
    defaultShowOnList;

    /**
     * 是否显示 header
     * */
    @observable shouldShowHeader = true;

    /**
     * 头部菜单的水平对齐方式，'left' | 'center' | 'right'
     * 规范上默认为 'left'
     * */
    @observable headerMenuAlign = 'left';

    /**
     * 是否显示 header menu
     * */
    @observable shouldShowHeaderMenu = false;

    /**
     * 是否显示 用户信息
     * */
    @observable shouldShowProfile = true;

    /**
     * 用户信息
     * */
    @observable rawProfileInfo = {
        departmentName: '',
        fullName: '',
        avatarUrl: undefined,
        employeeNumber: '',
        userAccount: ''
    };

    /**
     * 自定义 用户菜单
     * 如果不需要用户菜单，可置为 [] || null
     * 不配置的话将返回默认菜单项，见 computedProfileMenu
     * */
    @observable customProfileMenu;

    /**
     * 是否显示 侧边 menu
     * */
    @observable shouldShowSidebar = true;

    /**
     * 侧边 menu 是否折叠
     * */
    @observable isSidebarCollapsed = false;

    /**
     * 是否显示面包屑
     * */
    @observable shouldShowBreadcrumbs = true;

    /**
     * 是否在面包屑的添加一个 erp 首页节点
     * 一般来说，erp子系统，site-map 根节点是 erp 首页，不需要设置此项
     * 除非根节点不是 erp 首页，又有需要将 erp 首页作为面包屑第一个节点才需要设置此项
     * 此时，面包屑为 erp 首页 > 本项目首页 > 本项目当前模块 > ....
     * */
    @observable shouldBreadcrumbsPrependErpHome = false;

    /**
     * 是否显示 footer
     * */
    @observable shouldShowFooter = true;

    /**
     * 是否进行 permission 检查
     * 这是一个 layout 级别的全局设置
     * */
    @observable shouldCheckPermission = true;

    /**
     * 权限集
     * */
    @observable permissions = observable.map();

    /**
     * erp logo 信息
     * 如果需要自定义非 erp logo 使用 customLogo 即可
     * */
    @observable logoInfo = {
        erpUrl: '/',
        homeUrl: '#/index',
        subTitle: '子系统'
    };

    /**
     * 自定义 logo
     * 如配置则忽略默认的 erp logo
     * */
    customLogo

    /**
     * @required
     * */
    agentTheme = {};

    /**
     * @required
     * */
    urlUtils = {};

    // ======== extendable methods

    /**
     * layout instance 构造时做的事情
     * @def: () => {}
     * */
    onConstruct;

    /**
     * 获取用户信息
     * 获取完成时需要设置
     * this.rawProfileInfo: {}
     *      departmentName,
     *      fullName,
     *      avatarUrl,
     *      employeeNumber,
     *      userAccount
     * */
    fetchUserInfo() {
        fetchUserInfoService(
            this.agentTheme,
        ).then(
            action(rawProfileInfo => {
                this.rawProfileInfo = rawProfileInfo;
            })
        );
    }

    /**
     * 获取权限
     * 覆写此方法需要在获取后需要
     *   - 设置 this.permissions 注意 this.permissions map 是一个 observable map
     *   - 调用 this.setPermissionReady()
     * */
    fetchPermissions() {
        fetchPermissionsService().then(
            action(permissionList => {
                // 这是一个参考，用水麒麟 wk 返回的 permissions 一般格式
                // const traversePermissionList = permissionList => {
                //     permissionList.forEach(
                //         permissionResource => {
                //             this.permissions.set(
                //                 permissionResource.code,
                //                 {
                //                     type: permissionResource.type,
                //                     code: permissionResource.code,
                //                     name: permissionResource.name,
                //                     nameEn: permissionResource.nameEn,
                //
                //                     url: permissionResource.url
                //                 }
                //             );
                //
                //             if (permissionResource.subResources) {
                //                 traversePermissionList(permissionResource.subResources);
                //             }
                //
                //         }
                //     );
                // };
                //
                // traversePermissionList(permissionList);

                // mark permissions is ready
                this.setPermissionReady();
            })
        );
    }

    /**
     * 判断 siteNode 是否有权限
     * */
    checkPermission(siteNode) {
        // 没有 item.key 就不进行 permission check
        if (!this.shouldCheckPermission || siteNode.skipPermissionCheck || !siteNode.key) {
            return true;
        }

        return !!this.permissions.get(siteNode.key);
    }

    /**
     * 登出
     * */
    logout() {
        logoutService().then(logoutUrl => {
            location.href = logoutUrl;
        });
    }

    /**
     * 切换语言
     * */
    switchLanguage(langCode) {
        if (langCode === this.currentLang) {
            return;
        }

        switchLanguageService(
            this.agentTheme,
            langCode,
        );
    }

    /**
     * 预留，未使用
     * */
    getLanguageInfo() {
        fetchLanguageInfoService();
    }

    /**
     * 自定义footer content
     * @def: () => reactElement
     * @default: undefined
     * */
    customFooterContentHook

    /**
     * 自定义侧边菜单的 menuItem
     * @def: siteNode => menuItem
     * menuItem: {
     *     text,
     *     icon,
     *     link,
     *     onClick,
     * }
     *
     * */
    customSideMenuItemHook;

    /**
     * 自定义头部菜单的 menuItem
     * @def: siteNode => menuItem
     * menuItem: {
     *     text,
     *     link,
     *     onClick,
     * }
     *
     * */
    customHeaderMenuItemHook;

    /**
     * 自定义 siteNode stack
     * @def: crumbsStack => crumbsStack
     * crumbsStack[$i]: {
     *     text,
     *     link,
     *     onClick
     * }
     * */
    customBreadcrumbsHook;

    // ======== public APIs for layout 可调用的方法
    @action
    setSiteMap(siteMap) {
        if (!siteMap.children) {
            siteMap.children = [];
        }

        const pageMetaData = {};

        const traverse = nodeList => {
            nodeList.forEach(siteNode => {
                // @todo: review and to-remove 没必要再搞一个 siteNode.page 了吧？
                Object.assign(siteNode, siteNode.page, {
                    isOpen: !!siteNode.isOpen,
                    active: !!siteNode.active
                });

                if (siteNode.module && siteNode.path) {
                    const metaKey = this.getMetaKey(siteNode);

                    if (!pageMetaData[metaKey]) {
                        pageMetaData[metaKey] = {
                            nodes: [],
                            queryMap: {}
                        };
                    }

                    pageMetaData[metaKey].nodes.push(siteNode);

                    // 这里需要考虑某个相同 module:path 的 page query 的补全问题
                    if (siteNode.query) {
                        Object.keys(siteNode.query).forEach(queryKey => {
                            pageMetaData[metaKey].queryMap[queryKey] = 1;
                        });
                    }
                }

                // 往下处理 item 的子节点
                if (siteNode.children) {
                    traverse(siteNode.children);
                }

            });
        };

        traverse([siteMap]);

        Object.keys(pageMetaData).forEach(metaKey => {
            const metaData = pageMetaData[metaKey];

            metaData.queryKeys = Object.keys(metaData.queryMap);
            delete metaData.queryMap;

            metaData.nodes.forEach(
                siteNode => {
                    const query = siteNode.query || {};
                    siteNode.pageQueryKey = this.getPageQueryKey(metaData, query);
                }
            );
        });

        this.pageMetaData = pageMetaData;
        this.siteMap = siteMap;

        return this;
    }

    /**
     * 通过设置当前位置, 推算现有的位置
     */
    @action
    setCurrentPage(module, path, query = {}) {
        if (this.module !== module) {
            this.module = module;
        }

        if (this.path !== path) {
            this.path = path;
        }

        const metaKey = this.getMetaKey({module, path});
        const metaData = this.pageMetaData[metaKey];

        if (metaData) {
            this.pageQueryKey = this.getPageQueryKey(metaData, query);
        }

        if (metaData && metaData.nodes) {
            this.currentNode = metaData.nodes.find(
                pageMeta => pageMeta.pageQueryKey === this.pageQueryKey
            );
        }

        // 跳转无权限页面
        // if (this.maybe403()) {
        //     return;
        // }

        // 本判断可被认知为 "前端页面" 切换
        if (this.previousPathname !== this.path || this.previousPageQueryKey !== this.pageQueryKey) {
            // 停止 loading 状态
            this.loadingStatusMap = observable.map();
        }

        this.previousPathname = this.path;
        this.previousPageQueryKey = this.pageQueryKey;

        // save query
        this.query = query;

        return this;
    }

    @action
    setPermissionReady() {
        this.isPermissionsReady = true;
        // this.maybe403();
    }

    @action
    startLoading(processKey) {
        if (__DEVELOPMENT__) {
            if (!processKey) {
                throw new Error('请为 loading 状态设置一个 key, 这个是为了避免多个 loading 在卸载的时候, 无法区分全部加载结束还是单个结束的问题');
            }
        }

        this.loadingStatusMap.set(processKey, true);
    }

    @action
    stopLoading(processKey) {
        if (__DEVELOPMENT__) {
            if (!processKey) {
                throw new Error('请为 loading 状态设置一个 key, 这个是为了避免多个 loading 在卸载的时候, 无法区分全部加载结束还是单个结束的问题');
            }
        }

        this.loadingStatusMap.set(processKey, false);
    }

    maybe403() {
        if (this.currentNode && this.isPermissionsReady) {
            // 等待permission 请求完成
            if (!this.checkPermission(this.currentNode)) {
                this.urlUtils.replace('/error/403', {});
                return true;
            }
        }

        return false;
    }

    // ======== COMPUTED props
    @computed
    get is403() {
        if (this.currentNode && this.isPermissionsReady) {
            // 等待permission 请求完成
            if (!this.checkPermission(this.currentNode)) {
                // this.urlUtils.replace('/error/403', {});
                return true;
            }
        }

        return false;
    }

    @computed
    get isLoading() {
        const allStatus = Array.from(this.loadingStatusMap.values());
        return allStatus.some(
            status => status
        );
    }

    @computed
    get computedSideMenu() {
        return this.getMenu(SHOW_SIDE_MENU);
    }

    @computed
    get computedHeaderMenu() {
        return this.shouldShowHeaderMenu ? this.getMenu(SHOW_HEAD_MENU) : [];
    }

    @computed
    get computedBreadcrumbs() {
        const crumbs = this.shouldShowBreadcrumbs ? this.getBreadcrumbs() : [];
        if (this.shouldBreadcrumbsPrependErpHome) {
            crumbs.unshift({
                text: 'erp',
                link: this.logoInfo.erpUrl
            });
        }

        return crumbs;
    }

    @computed
    get computedProfileInfo() {
        if (!this.shouldShowProfile) {
            return {};
        }

        const info = this.rawProfileInfo;

        if (!info.fullName) {
            return {};
        }

        return {
            primary: `${info.fullName} (${info.employeeNumber})`,
            secondary: info.departmentName,
            avatarUrl: info.avatarUrl
                || `https://erp.baidu.com/ContentService/servlet/ReadImageServlet?IMAGE_NAME=${info.userAccount}.jpg`
        };
    }

    @computed
    get computedProfileMenu() {
        if (this.customProfileMenu !== undefined) {
            return this.customProfileMenu || [];
        }

        return [
            {
                key: 'i18n',
                text: _i('header_menu_switch_language'),
                children: [
                    {
                        key: 'zh-CN',
                        active: this.currentLang === 'zh-CN',
                        onClick: e => this.switchLanguage('zh-CN'),
                        text: _i('i18n_lang_chinese')
                    },
                    {
                        key: 'en-US',
                        active: this.currentLang === 'en-US',
                        onClick: e => this.switchLanguage('en-US'),
                        text: _i('i18n_lang_english')
                    }
                ]
            },
            {
                key: 'logout',
                text: _i('header_menu_logout'),
                onClick: e => this.logout()
            }
        ];
    }

    @computed
    get computedLogo() {
        if (this.customLogo !== undefined) {
            return this.customLogo;
        }

        const {
            erpUrl = '/',
            homeUrl = '#/index',
            subTitle
        } = this.logoInfo || {};

        return h(ERPLogo, {
            erpUrl,
            homeUrl,
            subTitle
        });
    }

    @computed
    get computedFooter() {
        if (typeof this.customFooterContentHook === 'function') {
            return this.customFooterContentHook();
        }

        // @todo: 国际化
        return [
            h.a({
                key: 'apply-permission'
            }, '权限申请'),

            h.a({
                key: 'more-info',
                href: 'http://wiki.baidu.com/pages/viewpage.action?pageId=357113086'
            }, 'ERP知识库'),

            h.a({
                key: 'contract',
                href: 'mailto:erphelp@baidu.com'
            }, '联系我们')
        ];
    }

    get onRenderMenuItemMap() {
        return {
            [SHOW_HEAD_MENU]: this.customHeaderMenuItemHook,
            [SHOW_SIDE_MENU]: this.customSideMenuItemHook
        };
    }

    // ======== UI handlers
    @action
    toggleSidebar = isCollapsed => {
        this.isSidebarCollapsed = isCollapsed;
    };

    @action
    toggleSideMenuItem = siteNode => {
        const {children = []} = siteNode;
        if (children && children.some(child => child.active)) {
            return;
        }

        siteNode.isOpen = !siteNode.isOpen;
    }

    // ======== private methods 不要覆写这些方法，除非你清楚你很清楚你在干嘛

    getMenu(menuType) {
        const maxMenuShowLevel = 2;
        const currentStack = [];
        const defaultShouldShow = (this.defaultShowOnList || DEFAULT_SHOW_LIST).includes(menuType);
        const onRenderMenuItemMap = this.onRenderMenuItemMap[menuType];

        const processMenuList = menuList => {
            return menuList.map((siteNode, index) => {
                let curNode;
                // 确认是否在 menu 显示
                const shouldItemShow = siteNode.showOn ? siteNode.showOn.includes(menuType) : defaultShouldShow;
                if (shouldItemShow) {
                    if (!this.checkPermission(siteNode)) {
                        return null;
                    }

                    const {
                        module,
                        url,
                        path,
                        query
                    } = siteNode;
                    curNode = {};

                    if (menuType === SHOW_SIDE_MENU && !currentStack.length) {
                        curNode.onToggle = e => this.toggleSideMenuItem(siteNode);
                    }

                    if (typeof onRenderMenuItemMap === 'function') {
                        const {
                            link,
                            text,
                            onClick,
                            icon
                        } = onRenderMenuItemMap(siteNode);
                        Object.assign(curNode, {link, text, onClick, icon});
                    }

                    if (curNode.onClick === undefined && curNode.link === undefined) {
                        if (module && path) {
                            curNode.link = this.urlUtils.getPageLink(path, query, {
                                module
                            });
                        }
                        else if (url) {
                            curNode.link = url;
                        }
                        else if (menuType === SHOW_SIDE_MENU) {
                            // console.log()
                            curNode.onClick = curNode.onToggle;
                        }
                    }

                    if (curNode.icon === undefined) {
                        curNode.icon = siteNode.icon;
                    }

                    if (curNode.text === undefined) {
                        curNode.text = typeof siteNode.title === 'function' ? siteNode.title() : siteNode.title;
                    }

                    curNode.isOpen = siteNode.isOpen;
                    curNode.key = siteNode.key || index + ''; // 这个是因为 react 里 key 不接受 number
                    curNode.pageQueryKey = siteNode.pageQueryKey;
                }

                // 不管是否在菜单显示都要处理选中状态，因为父菜单需要高亮
                if (this.isCurrentNode(siteNode)) {
                    console.log('hit the page!', siteNode);
                    if (curNode) {
                        // 当前节点菜单项直接处理成高亮
                        curNode.active = true;
                    }

                    // 处理 stack 中的父节点
                    // 规范上只有两层菜单，只处理两层高亮
                    for (let i = 0; i < maxMenuShowLevel && i < currentStack.length; i++) {
                        if (currentStack[i]) {
                            currentStack[i].active = true;
                        }
                    }

                    // 对于侧边菜单，如果2层节点在菜单上，第1层节点处理成 isOpen
                    if (menuType === SHOW_SIDE_MENU) {
                        if ((currentStack.length > 1 && currentStack[1]) || (currentStack.length === 1 && curNode)) {
                            currentStack[0].isOpen = true;
                            delete currentStack[0].active;
                        }
                    }
                }

                // 子节点处理
                if (siteNode.children) {
                    currentStack.push(curNode);
                    const childrenItems = processMenuList(siteNode.children);
                    currentStack.pop();

                    if (curNode && currentStack.length < maxMenuShowLevel) {
                        curNode.children = childrenItems;
                    }
                }

                return curNode;

            }).filter(item => item);
        };

        return processMenuList(this.siteMap.children);
    }

    getBreadcrumbs() {
        const currentStack = [];
        const defaultShouldShow = (this.defaultShowOnList || DEFAULT_SHOW_LIST).includes(SHOW_BREAD_CRUMB);

        let foundStack = null;

        const traverse = nodeList => {
            nodeList.forEach(
                siteNode => {
                    const {
                        title,
                        url,
                        path,
                        query,
                        module
                    } = siteNode;
                    const shouldItemShow = siteNode.showOn ? siteNode.showOn.includes(SHOW_BREAD_CRUMB) : defaultShouldShow;
                    if (!shouldItemShow) {
                        return;
                    }

                    const curNode = {};
                    curNode.text = typeof title === 'function' ? title() : title;

                    if (module && path) {
                        curNode.link = this.urlUtils.getPageLink(
                            path,
                            query,
                            {
                                module
                            }
                        );
                    }
                    else if (url) {
                        curNode.link = url;
                    }

                    if (this.isCurrentNode(siteNode)) {
                        foundStack = currentStack.concat(curNode);
                    }

                    if (foundStack) {
                        return;
                    }

                    if (siteNode.children) {
                        currentStack.push(curNode);
                        traverse(siteNode.children);
                        currentStack.pop();
                    }

                }
            );
        };

        traverse([this.siteMap]);

        if (foundStack) {
            delete foundStack[foundStack.length - 1].link;

            if (typeof this.customBreadcrumbsHook === 'function') {
                return this.customBreadcrumbsHook(foundStack);
            }

            return foundStack;
        }

        return [];
    }

    isCurrentNode(siteNode) {
        return siteNode.module === this.module
            && siteNode.path === this.path
            && siteNode.pageQueryKey === this.pageQueryKey;
    }

    getMetaKey(node) {
        return `${node.module}:${node.path}`;
    }

    getPageQueryKey(metaData, query = {}) {
        if (!metaData.queryKeys.length) {
            return '';
        }

        return metaData.queryKeys.map(
            queryKey => `${queryKey}=>${query[queryKey]}`
        ).join('&&');
    }

    // ========== life cycle
    constructor(props) {
        const requiredProps = [
            'agentTheme',
            'urlUtils'
        ];

        if (props) {
            requiredProps.forEach(key => {
                if (!props[key]) {
                    console.error(`props ${key} is required for layout model`);
                }

            });
        }

        setProps(this, props);
        if (this.onConstruct) {
            this.onConstruct();
        }
    }
}
