/**
 * @file dialog
 * @author wujun07
 * @owner wujun07:2019-11-26
 */
import * as React from 'react';
import {ButtonProps} from '@befe/brick-comp-button';
import {ModalProps} from '@befe/brick-comp-modal';
import {ConfigContext} from '@befe/brick-comp-config-provider';

declare type PropsFromModal = Omit<ModalProps, 'onClickMask'>;
export declare type DialogAction = ButtonProps['onClick'];

export interface DialogProps extends PropsFromModal {
    /**
     * 用户可自定义 class
     */
    className?: string;
    /**
     * 尺寸
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /**
     * 标题
     */
    headline?: React.ReactNode;
    /**
     * 点击确认回调
     */
    onConfirm?: DialogAction;
    /**
     * 点击取消/关闭回调
     */
    onCancel?: DialogAction;
    /**
     * 自定义确认按钮文本
     */
    confirmLabel?: string;
    /**
     * 自定义取消按钮文本
     */
    cancelLabel?: string;
    /**
     * 自定义操作区
     */
    actions?: React.ReactNode;
    /**
     * 点击蒙层是否进行取消/关闭
     */
    maskCancel?: boolean;
    /**
     * 操作按钮的位置
     */
    actionsAlign?: 'left' | 'center' | 'right';
}

/**
 * Dialog
 * @description brick component Dialog
 * @for-mobx
 */
export declare class Dialog extends React.Component<DialogProps> {
    static displayName: string;
    static defaultProps: {
        className: string;
        maskCancel: boolean;
        size: string;
    };
    static contextType: React.Context<import("@befe/brick-comp-config-provider/src").ConfigContextValue>;
    context: React.ContextType<typeof ConfigContext>;

    get className(): string;

    get actionAlign(): "left" | "right" | "center" | undefined;

    get modalProps(): {
        visible?: boolean | undefined;
        children?: React.ReactNode;
        portalContainer?: HTMLElement | (() => HTMLElement) | undefined;
        destroyOnHide?: boolean | undefined;
        disablePortal?: boolean | undefined;
        confirmLabel?: string | undefined;
        cancelLabel?: string | undefined;
        actionsAlign?: "left" | "right" | "center" | undefined;
        className: string;
        onClickMask: ((e: React.MouseEvent<Element, MouseEvent>) => void | Promise<any>) | undefined;
    };

    get childrenArray(): React.ReactNode[];

    get confirmLabel(): string;

    get cancelLabel(): string;

    getLocaleText(key: string, ...args: []): string;

    handleClickConfirm: (e: React.MouseEvent<Element, MouseEvent>) => void | Promise<any>;
    handleClickCancel: (e: React.MouseEvent<Element, MouseEvent>) => void | Promise<any>;

    renderCloseX(): JSX.Element;

    renderHead(): JSX.Element;

    renderBody(): JSX.Element | null;

    renderActions(): {} | null;

    renderFoot(): JSX.Element | null;

    render(): JSX.Element;
}

export {};
