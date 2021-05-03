/**
 * @file dialog-foot
 * @author wujun07
 * @owner wujun07:2019-11-26
 */
import * as React from 'react';

export interface DialogFootProps {
    /**
     * 用户可自定义 class
     */
    className?: string;
}

/**
 * DialogFoot
 * @description brick component DialogFoot
 * @for-mobx
 */
export declare class DialogFoot extends React.Component<DialogFootProps> {
    static displayName: string;
    static defaultProps: {
        className: string;
    };

    get className(): string;

    render(): JSX.Element;
}
