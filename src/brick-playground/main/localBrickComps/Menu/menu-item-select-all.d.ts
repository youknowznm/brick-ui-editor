/**
 * @file menu-item-select-all
 * @author wujun07
 * @owner wujun07:2020-01-03
 */
import * as React from 'react';
import { MenuItemProps } from './menu-item';
import { ConfigContext } from '@befe/brick-comp-config-provider';
export interface MenuItemSelectAllProps extends Omit<MenuItemProps, 'id'> {
    /**
     * 用户可自定义 class
     */
    className?: string;
}
/**
 * MenuItemSelectAll
 * @description brick component MenuItemSelectAll
 * @for-mobx
 */
export declare class MenuItemSelectAll extends React.Component<MenuItemSelectAllProps> {
    static displayName: string;
    static defaultProps: {
        className: string;
    };
    static contextType: React.Context<import("@befe/brick-comp-config-provider/src").ConfigContextValue>;
    context: React.ContextType<typeof ConfigContext>;
    get className(): string;
    getLocaleText(key: string, ...args: []): string;
    render(): JSX.Element;
}
