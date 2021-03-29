/**
 * @file popover-confirm
 * @author wujun07
 * @owner wujun07:2020-01-10
 */
import * as React from 'react';
import { PopoverProps, Popover } from './popover';
import { AlertType, SvgFC } from '@befe/brick-core';
import { ConfigContext } from '@befe/brick-comp-config-provider';
declare type PropsFromPopover = Omit<PopoverProps, 'type' | 'onChange'>;
export interface PopoverConfirmProps extends PropsFromPopover {
    /**
     * 用户可自定义 class
     */
    className?: string;
    /**
     * type
     */
    type?: AlertType | null;
    /**
     * 自定义 icon
     */
    icon?: SvgFC;
    /**
     * 提示内容
     */
    message?: React.ReactNode;
    /**
     * 点击确认回调
     */
    onConfirm?: (e: React.MouseEvent) => void;
    /**
     * 点击取消回调
     */
    onCancel?: (e: React.MouseEvent) => void;
    /**
     * 自定义确认按钮文本
     */
    confirmLabel?: string;
    /**
     * 自定义取消按钮文本
     */
    cancelLabel?: string;
}
/**
 * PopoverConfirm
 * @description brick component PopoverConfirm
 * @for-mobx
 */
export declare class PopoverConfirm extends React.Component<PopoverConfirmProps> {
    static displayName: string;
    static defaultProps: {
        className: string;
        type: string;
        actionsAlign: string;
    };
    static contextType: React.Context<import("@befe/brick-comp-config-provider/src").ConfigContextValue>;
    context: React.ContextType<typeof ConfigContext>;
    refPopover: React.RefObject<Popover>;
    get className(): string;
    get confirmLabel(): string;
    get cancelLabel(): string;
    get actions(): JSX.Element;
    get iconSvg(): SvgFC | null | undefined;
    get icon(): JSX.Element | null;
    get content(): {} | null;
    handleClickConfirm: (e: React.MouseEvent<Element, MouseEvent>) => void;
    handleClickCancel: (e: React.MouseEvent<Element, MouseEvent>) => void;
    handleClickCloseX: (e: React.MouseEvent<Element, MouseEvent>) => void;
    closePopover(): void;
    getLocaleText(key: string, ...args: []): string;
    render(): JSX.Element;
}
export {};
