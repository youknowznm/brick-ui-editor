/**
 * @file select-option-group
 * @author wujun07
 * @owner wujun07:2019-11-07
 */
import * as React from 'react';
import { MenuSubmenuProps } from '@befe/brick-comp-menu';
declare type PropsFromMenuSubmenu = Omit<MenuSubmenuProps, 'itemContent'>;
export interface SelectOptionGroupProps extends PropsFromMenuSubmenu {
    /**
     * 用户可自定义 class
     */
    className?: string;
    /**
     * 选项组类型
     */
    type?: 'group' | 'popper';
    /**
     * 显示值
     */
    label?: React.ReactNode;
}
/**
 * SelectOptionGroup
 * @description brick component SelectOptionGroup
 * @for-mobx
 */
export declare class OptionGroup extends React.Component<SelectOptionGroupProps> {
    static displayName: string;
    static defaultProps: {
        className: string;
        type: string;
    };
    get className(): string;
    get subMenuProps(): MenuSubmenuProps;
    render(): JSX.Element;
}
export {};
