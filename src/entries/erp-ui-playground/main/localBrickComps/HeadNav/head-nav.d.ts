/**
 * @file head-nav
 * @author wujun07
 * @owner wujun07:2019-11-25
 */
import * as React from 'react';
import { ConfigContext } from '@befe/brick-comp-config-provider';
import { MenuItemProps, MenuItemId, MenuProps } from '@befe/brick-comp-menu';
interface MenuItemObject extends MenuItemProps {
    label: React.ReactNode;
    href?: string;
    target?: string;
    selected?: boolean;
    children?: MenuItemObject[];
}
declare type PropsFromMenu = Pick<MenuProps, 'reverseColor'>;
export interface HeadNavProps extends PropsFromMenu {
    /**
     * 用户可自定义 class
     */
    className?: string;
    /**
     * logo
     */
    logo?: React.ReactNode;
    /**
     * menu
     */
    menu?: MenuItemObject[];
    /**
     * menu 已选择的 id 列表的控制值
     */
    menuSelectedIds?: MenuItemId[];
    /**
     * menu item 的点击回调
     */
    onClickMenuItem?: (item: MenuItemObject, e: React.MouseEvent) => void;
    /**
     * 头像 url
     */
    avatar?: string;
    /**
     * 用户主信息，一般为 姓名(工号)
     */
    userInfoPrimary?: React.ReactNode;
    /**
     * 用户次要信息，一般为 部门
     */
    userInfoSecondary?: React.ReactNode;
    /**
     * 用户菜单
     */
    userMenu?: MenuItemObject[];
    /**
     * @todo 用户附加内容，预留，尚无设计细则
     */
    userExtra?: React.ReactNode;
}
interface HeadNavState {
    avatar?: string;
}
/**
 * HeadNav
 * @description brick component HeadNav
 * @for-mobx
 */
export declare class HeadNav extends React.Component<HeadNavProps, HeadNavState> {
    static displayName: string;
    static defaultProps: {
        className: string;
        reverseColor: boolean;
    };
    static contextType: React.Context<import("@befe/brick-comp-config-provider/src").ConfigContextValue>;
    context: React.ContextType<typeof ConfigContext>;
    get className(): string;
    get themeDefaultSize(): "sm" | "md" | undefined;
    get hasUserMenu(): boolean;
    get menu(): {} | undefined;
    get selectedMenuIds(): (string | number)[];
    renderMenuItem: (item: MenuItemObject, index: number) => JSX.Element;
    renderLogo(): JSX.Element;
    renderMenu(): JSX.Element | null;
    renderUserExtra(): JSX.Element | null;
    renderUserMenuItem(item: MenuItemObject): JSX.Element;
    getSelectedIds(menuItems?: MenuItemObject[] | undefined): (string | number)[];
    renderUserMenu(): JSX.Element | null;
    renderUserInfo(): JSX.Element;
    renderUser(): JSX.Element;
    renderShadowMenu(): JSX.Element | null;
    render(): JSX.Element;
}
export {};
