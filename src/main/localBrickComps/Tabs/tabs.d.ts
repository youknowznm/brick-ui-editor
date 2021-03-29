/**
 * @file tabs
 * @author wujun07
 * @owner wujun07:2019-12-05
 */
import * as React from 'react';
import { TabPaneId, TabsContextValue } from './tabs-context';
import { TabPane, TabPaneProps } from './tab-pane';
import { EventListenerHandler } from '@befe/brick-utils';
import { ConfigContext } from '@befe/brick-comp-config-provider';
import { MenuPopperProps } from '@befe/brick-comp-menu';
interface TabItem extends TabPaneProps {
    /**
     * tab 页内容
     */
    content?: React.ReactNode;
}
export interface TabsProps {
    /**
     * 用户可自定义 class
     */
    className?: string;
    /**
     * 尺寸
     * use config context `defaultSize` as default
     */
    size?: 'sm' | 'md';
    /**
     * 标签卡样式类型
     */
    type?: 'plain' | 'card' | 'button-group';
    /**
     * 标签页
     */
    panes?: TabItem[];
    /**
     * 激活 tab id 的 控制值
     */
    activeId?: TabPaneId;
    /**
     * 激活 tab id 的 默认值
     */
    defaultActiveId?: TabPaneId | null;
    /**
     * activeId 变化时的回调
     */
    onChange?: (activeId: TabPaneId) => void;
    /**
     * 下拉列表触发方式
     */
    triggerType?: MenuPopperProps['type'];
    /**
     * 是否干掉非当前激活的 pane dom
     */
    shouldDestroyInactivePane?: boolean;
    /**
     * 动态添加便签按钮
     */
    addable?: boolean;
    /**
     * add button 添加tab回调
     */
    onTabAdd?: () => void;
    /**
     * delete 删除tab回调
     */
    onTabDelete?: (activeId: TabPaneId) => void;
}
interface TabsState {
    activeId?: TabPaneId | null;
    visibleFrom?: number;
    visibleTo?: number;
    shouldShowEllipsisPopper?: boolean;
}
/**
 * Tabs
 * @description brick component Tabs
 * @for-mobx
 */
export declare class Tabs extends React.Component<TabsProps, TabsState> {
    static displayName: string;
    static defaultProps: {
        className: string;
        type: string;
        defaultActiveId: null;
        shouldDestroyInactivePane: boolean;
        addable: boolean;
    };
    static contextType: React.Context<import("@befe/brick-comp-config-provider/src").ConfigContextValue>;
    context: React.ContextType<typeof ConfigContext>;
    windowResizeHandler: EventListenerHandler | null;
    static getDerivedStateFromProps(nextProps: TabsProps): Pick<TabsProps, "size" | "className" | "activeId" | "type" | "onChange" | "panes" | "defaultActiveId" | "triggerType" | "shouldDestroyInactivePane" | "addable" | "onTabAdd" | "onTabDelete"> | null;
    state: TabsState;
    bTabsRef: React.RefObject<HTMLUListElement>;
    tabsContainerRef: React.RefObject<HTMLDivElement>;
    tabContainerWidthCache: number;
    tabsWidthCache: number[];
    get className(): string;
    get size(): "sm" | "md" | undefined;
    get contextValue(): TabsContextValue;
    get validChildren(): React.ReactComponentElement<typeof TabPane, Pick<TabPaneProps, "disabled" | "label" | "id" | "className" | "deletable" | "status">>[] | null;
    get tabsAll(): TabItem[];
    get tabs(): TabItem[];
    get tabsEllipsis(): TabItem[];
    setTabContainerWidthCache: () => void;
    setTabsWidthCache: () => number[];
    handleClickTab: (id: string | number, e?: React.MouseEvent<Element, MouseEvent> | undefined) => void;
    handleGroupButtonClick: (value: (string | number)[] | undefined) => void;
    isTabPaneDisabled(id: TabPaneId): boolean;
    getTabFromAndTo: () => {
        from: number;
        to: number;
    };
    transformToVisible: (from?: number) => void;
    updateEllipsis(): void;
    handleAddButtonClick: () => void;
    handleTabDelete: (id: string | number, e: React.MouseEvent<Element, MouseEvent>) => void;
    handleMenuPopperChange: (status: boolean) => void;
    renderTab: (tab: TabItem, idx: number, className: string) => JSX.Element;
    renderTabs(tabs: TabItem[], className: string, tabRef?: React.RefObject<HTMLUListElement>): JSX.Element;
    renderTabsEllipsisList(): JSX.Element;
    renderTabsEllipsis(): JSX.Element;
    renderAddButton(): JSX.Element | undefined;
    renderButtonGroupTabs(): JSX.Element;
    renderTabsContainer(): JSX.Element;
    renderTabPanes(): JSX.Element[] | null;
    renderTabPanesContainer(): JSX.Element | null;
    componentDidMount(): void;
    componentWillUnmount(): void;
    componentDidUpdate(prevProps: Readonly<TabsProps>, prevState: Readonly<TabsState>, snapshot?: any): void;
    render(): JSX.Element;
}
export {};
