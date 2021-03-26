/**
 * @file erp-logo
 * @author wujun07
 * @owner wujun07:2019-12-14
 */
import * as React from 'react';
export interface ErpLogoProps {
    /**
     * 用户可自定义 class
     */
    className?: string;
    /**
     * logo 跳转链接
     */
    url?: string;
    /**
     * 副标题
     */
    subhead?: React.ReactNode;
    /**
     * 副标题跳转链接
     */
    subheadUrl?: string;
    /**
     * 是否使用原色
     */
    originColor?: boolean;
}
/**
 * ErpLogo
 * @description brick component ErpLogo
 * @for-mobx
 */
export declare class ErpLogo extends React.Component<ErpLogoProps> {
    static displayName: string;
    static defaultProps: {
        className: string;
        originColor: boolean;
    };
    get className(): string;
    render(): JSX.Element;
}
