/**
 * @file tab-pane
 * @author wujun07
 * @owner wujun07:2019-12-05
 */
import * as React from 'react';
import { TabPaneId, TabsContext } from './tabs-context';
export interface TabPaneProps {
    /**
     * 用户可自定义 class
     */
    className?: string;
    /**
     * 唯一标识
     */
    id: TabPaneId;
    /**
     * 标签页上的内容
     */
    label: React.ReactNode;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 是否可删除
     */
    deletable?: boolean;
    /**
     * tab标签页的状态, 暂时只有error
     */
    status?: 'error';
}
/**
 * Tab
 * @description brick component TabPane
 * @for-mobx
 */
export declare class TabPane extends React.Component<TabPaneProps> {
    static displayName: string;
    static defaultProps: {
        className: string;
    };
    static contextType: React.Context<import("./tabs-context").TabsContextValue>;
    context: React.ContextType<typeof TabsContext>;
    get className(): string;
    get isActive(): boolean;
    render(): JSX.Element;
}
