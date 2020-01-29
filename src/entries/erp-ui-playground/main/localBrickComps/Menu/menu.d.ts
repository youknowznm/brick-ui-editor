/**
 * @file menu
 * @author wujun07
 * @owner wujun07:2019-10-11
 */
import * as React from 'react';
import { MenuItemId, MenuLayout, MenuSize, MultipleItemType } from './common';
import { MenuContextValue, MenuContext } from './menu-context';
export interface MenuProps {
    /**
     * 用户可自定义 class
     */
    className?: string;
    /**
     * 布局方式
     */
    layout?: MenuLayout;
    /**
     * 尺寸
     */
    size?: MenuSize;
    /**
     * 选中的 item id 列表
     */
    selectedIds?: MenuItemId[];
    /**
     * 展开的 submenu id 列表
     */
    expandedIds?: MenuItemId[];
    /**
     * 是否为多选
     */
    multiple?: boolean;
    /**
     * 点选 item 的回调
     */
    onSelect?: (id: MenuItemId, selectedIds: MenuItemId[], currentSelectedIds: MenuItemId[]) => void;
    /**
     * 反选 item 的回调
     */
    onDeselect?: (id: MenuItemId, selectedIds: MenuItemId[], currentSelectedIds: MenuItemId[]) => void;
    /**
     * selectIds 变化时的回调
     * select / deselect 均会调用
     */
    onChangeSelectedIds?: (selectedIds: MenuItemId[]) => void;
    /**
     * 子菜单展开时的回调
     */
    onExpand?: (id: MenuItemId, expandedIds: MenuItemId[], currentExpandedIds: MenuItemId[]) => void;
    /**
     * 子菜单折叠时的回调
     */
    onCollapse?: (id: MenuItemId, expandedIds: MenuItemId[], currentExpandedIds: MenuItemId[]) => void;
    /**
     * expandedIds 变化时的回调
     * expand / collapse 均会调用
     */
    onChangeExpandedIds?: (expandedIds: MenuItemId[]) => void;
    /**
     * 多选选项类型（暂定）
     */
    multipleItemType?: MultipleItemType;
    /**
     * 使用反色，适用于深色背景色上（暂定）
     */
    reverseColor?: boolean;
}
interface MenuState {
    selectedIds: MenuItemId[];
    expandedIds: MenuItemId[];
}
/**
 * Menu
 * @description brick component Menu
 * @for-mobx
 */
export declare class Menu extends React.Component<MenuProps, MenuState> {
    static displayName: string;
    static defaultProps: {
        className: string;
        layout: string;
        multiple: boolean;
        multipleItemType: string;
        reverseColor: boolean;
    };
    static contextType: React.Context<MenuContextValue>;
    static getDerivedStateFromProps(nextProps: MenuProps): Pick<MenuProps, "layout" | "size" | "multiple" | "onSelect" | "onDeselect" | "className" | "selectedIds" | "expandedIds" | "onChangeSelectedIds" | "onExpand" | "onCollapse" | "onChangeExpandedIds" | "multipleItemType" | "reverseColor"> | null;
    context: React.ContextType<typeof MenuContext>;
    state: MenuState;
    get className(): string;
    get size(): "sm" | "md" | undefined;
    get contextValue(): MenuContextValue;
    handlerItemClick: (id: string | number, e: React.MouseEvent<Element, MouseEvent>) => void;
    handlerClickSubMenu: (id: string | number, e: React.MouseEvent<Element, MouseEvent>) => void;
    toggleSelected(id: MenuItemId): void;
    toggleExpanded(id: MenuItemId): void;
    setSelectIds(selectedIds: MenuItemId[]): void;
    setExpandedIds(expandedIds: MenuItemId[]): void;
    render(): JSX.Element;
}
export {};
