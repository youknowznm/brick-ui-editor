/**
 * @file PAGE_NAME 页面入口组件
 * @author YOURNAME
 */

import {
    computed,
    Component,
    h,
    suh
} from '@befe/utils/dev-pattern-vm/index-pc-normal';

import PageContainer from '@befe/erp-comps/v2/components/PageContainer2019';
import ERPHeader from '@befe/erp-comps/v2/components/Header2019';
// import ERPLogo from '@befe/erp-comps/v2/components/Header2019/ERPLogo';
import SideMenu from '@befe/erp-comps/v2/components/SideMenu';
import Breadcrumbs from '@befe/erp-comps/v2/components/Breadcrumbs2019';
import Dialog from '@befe/erp-comps/v2/components/Dialog';
import Icon from '@befe/erp-comps/v2/components/Icon';

import Page403 from '@befe/erp-comps/page/erp/Error/403';

import pageStyle from './style.use.less';

@suh(pageStyle)
export default class BaseERPLayout extends Component {

    static shouldInjectApp = true;

    renderChildren() {
        const {props, local} = this;
        const {layoutModel} = local;

        if (layoutModel.is403) {
            return h(Page403);
        }

        return layoutModel.isReady || layoutModel.isReady === undefined ? props.children : null;
    }

    render() {
        const {props, local} = this;
        const {layoutModel} = local;
        const {computedBreadcrumbs} = layoutModel;

        return h(PageContainer, {},
            h(PageContainer.Header, {},
                h(ERPHeader, {
                    logo: layoutModel.computedLogo,

                    menuAlign: layoutModel.headerMenuAlign,
                    menu: layoutModel.computedHeaderMenu,

                    avatar: layoutModel.computedProfileInfo.avatarUrl,
                    userInfoPrimary: layoutModel.computedProfileInfo.primary,
                    userInfoSecondary: layoutModel.computedProfileInfo.secondary,

                    settingMenu: layoutModel.computedProfileMenu
                })
            ),

            // page 内容区域
            h(PageContainer.Content, {},
                h.div('page-content', {},
                    computedBreadcrumbs && computedBreadcrumbs.length ? h(Breadcrumbs, {
                        useHomeIcon: true,
                        crumbs: computedBreadcrumbs
                    }) : null,

                    h.div(`page-content-inner ${layoutModel.isLoading ? 'is-loading' : ''}`, {},
                        // props.children
                        this.renderChildren()
                    ),

                    layoutModel.isLoading ? h(Dialog, 'page-content-loading', {
                        visible: true
                    },
                        h.div('page-content-loading-inner', {},
                            h(Icon, {
                                type: 'img',
                                name: 'pln-loading'
                            })
                        )
                    ) : null,

                )
            ),

            layoutModel.shouldShowSidebar ? h(PageContainer.Sidebar, {
                isCollapsed: layoutModel.isSidebarCollapsed,
                onToggle: layoutModel.toggleSidebar
            },
                h(SideMenu, {
                    menu: layoutModel.computedSideMenu
                })
            ) : null,

            layoutModel.shouldShowFooter ? h(PageContainer.Footer, {},
                layoutModel.computedFooter
            ) : null
        );
    }
}
