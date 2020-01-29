/**
 * @file dialog-body
 * @author wujun07
 * @owner wujun07:2019-11-26
 */
import * as React from 'react';
export interface DialogBodyProps {
    /**
     * 用户可自定义 class
     */
    className?: string;
}
interface DialogBodyState {
    overflowX: boolean;
    overflowY: boolean;
}
/**
 * DialogBody
 * @description brick component DialogBody
 * @for-mobx
 */
export declare class DialogBody extends React.Component<DialogBodyProps, DialogBodyState> {
    static displayName: string;
    static defaultProps: {
        className: string;
    };
    state: DialogBodyState;
    body: React.RefObject<HTMLDivElement>;
    bodyInner: React.RefObject<HTMLDivElement>;
    get className(): string;
    updateBodyOverflow(): void;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<DialogBodyProps>, prevState: Readonly<{}>, snapshot?: any): void;
    render(): JSX.Element;
}
export {};
