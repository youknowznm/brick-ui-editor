/**
 * @file dialog-head
 * @author wujun07
 * @owner wujun07:2019-11-26
 */
import * as React from 'react';
export interface DialogHeadProps {
    /**
     * 用户可自定义 class
     */
    className?: string;
}
/**
 * DialogHead
 * @description brick component DialogHead
 * @for-mobx
 */
export declare class DialogHead extends React.Component<DialogHeadProps> {
    static displayName: string;
    static defaultProps: {
        className: string;
    };
    get className(): string;
    render(): JSX.Element;
}
