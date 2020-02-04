/**
 * @file menu-submenu
 * @author wujun07
 * @owner wujun07:2019-10-12
 */
import * as React from 'react';
import { MenuPopperProps } from './menu-popper';
import { MenuContext } from './menu-context';
import { MenuItemId } from './common';
export interface MenuSubmenuProps {
    /**
     * 用户可自定义 class
     */
    className?: string;
    /**
     * 子菜单类型
     */
    type?: 'group' | 'folder' | 'popper';
    /**
     * 唯一标识
     */
    id?: MenuItemId;
    /**
     * 菜单项元素
     */
    itemContent?: React.ReactNode;
    /**
     * popper menu 触发类型
     */
    popperTriggerType?: 'hover' | 'click';
    /**
     * popper menu 位置
     */
    popperPlacement?: MenuPopperProps['placement'];
    /**
     * 点击回调
     */
    onClick?: (e: React.MouseEvent) => void;
}
/**
 * MenuSubmenu
 * @description brick component MenuSubmenu
 * @for-mobx
 */
export declare class Submenu extends React.Component<MenuSubmenuProps> {
    static displayName: string;
    static defaultProps: {
        className: string;
        type: string;
        disabled: boolean;
        popperTriggerType: string;
    };
    static contextType: React.Context<import("./menu-context").MenuContextValue>;
    context: React.ContextType<typeof MenuContext>;
    get className(): string;
    get layout(): "horizontal" | "vertical" | "vertical-right" | undefined;
    get isLayoutHorizontal(): boolean;
    get popperMenuPlacement(): MenuPopperProps['placement'];
    get isExpanded(): boolean;
    get hasDescendantSelected(): boolean;
    get mustBePopper(): boolean;
    get menuPopperSize(): "sm" | undefined;
    get submenuSize(): "sm" | "md" | undefined;
    handlerClickItemContent: (e: React.MouseEvent<Element, MouseEvent>) => void;
    renderMenuArrow(): JSX.Element | null;
    renderMenuItem(submenu: React.ReactChild | null): JSX.Element;
    renderSubmenu(): JSX.Element;
    render(): JSX.Element;
}
