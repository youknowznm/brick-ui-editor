/**
 * @file dialog-confirm
 * @author wujun07
 * @owner wujun07:2020-01-07
 */
import * as React from 'react';
import {SvgFC, AlertType} from '@befe/brick-core';
import {ButtonProps} from '@befe/brick-comp-button';
import {DialogProps} from './dialog';

declare type PropsFromButton = Pick<ButtonProps, 'loadingDelay'>;
declare type PropsFromDialog = Pick<DialogProps, 'size' | 'headline' | 'confirmLabel' | 'cancelLabel' | 'onConfirm' | 'onCancel'>;

export interface DialogConfirmProps extends PropsFromButton, PropsFromDialog {
    /**
     * 用户可自定义 class
     */
    className?: string;
    /**
     * 类型
     */
    type?: AlertType;
    /**
     * 自定义 icon
     */
    icon?: SvgFC;
    /**
     * 提示内容
     */
    message?: React.ReactNode;
}

/**
 * DialogConfirm
 * @description brick component DialogConfirm
 * @for-mobx
 */
export declare class DialogConfirm extends React.Component<DialogConfirmProps> {
    static displayName: string;
    static defaultProps: {
        className: string;
        type: string;
    };

    get className(): string;

    get dialogProps(): {
        visible: boolean;
        size?: "sm" | "md" | "xs" | "lg" | "xl" | undefined;
        headline?: React.ReactNode;
        onConfirm?: ((event: React.MouseEvent<Element, MouseEvent>) => void | Promise<any>) | undefined;
        onCancel?: ((event: React.MouseEvent<Element, MouseEvent>) => void | Promise<any>) | undefined;
        confirmLabel?: string | undefined;
        cancelLabel?: string | undefined;
    };

    get iconSvg(): SvgFC | undefined;

    renderIcon(): JSX.Element | null;

    renderContent(): JSX.Element;

    render(): JSX.Element;
}

export {};
