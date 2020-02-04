/**
 * @file sub-options
 * @author wujun07
 * @owner wujun07:2019-11-08
 */
import * as React from 'react';
import { MenuSubmenuProps } from '@befe/brick-comp-menu';
export interface SubOptionsProps extends MenuSubmenuProps {
    /**
     * 用户可自定义 class
     */
    className?: string;
    /**
     * 子菜单类型
     */
    type?: 'group' | 'popper';
}
/**
 * SubOptions
 * @description brick component SubOptions
 * @for-mobx
 */
export declare class SubOptions extends React.Component<SubOptionsProps> {
    static displayName: string;
    static defaultProps: {
        className: string;
    };
    get className(): string;
    render(): JSX.Element;
}
