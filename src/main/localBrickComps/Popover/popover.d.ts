/**
 * @file popover
 * @author wujun07
 * @owner wujun07:2020-01-09
 */
import * as React from 'react';
import { PopperProps, PopperTrigger, PopperTriggerProps } from '@befe/brick-comp-popper';
import { ConfigContext } from '@befe/brick-comp-config-provider';
declare type PropsFromPopper = Pick<PopperProps, 'placement' | 'withArrow'>;
export interface PopoverProps extends PopperTriggerProps, PropsFromPopper {
    /**
     * 用户可自定义 class
     */
    className?: string;
    /**
     * 是否有箭头
     */
    withArrow?: boolean;
    /**
     * 标题
     */
    headline?: React.ReactNode;
    /**
     * 内容
     */
    content?: React.ReactNode;
    /**
     * 操作
     */
    actions?: React.ReactNode;
    /**
     * 操作位置
     */
    actionsAlign?: 'left' | 'center' | 'right';
    /**
     * 是否有关闭小叉
     */
    withCloseX?: boolean;
    /**
     * 点击关闭小叉回调
     */
    onClickCloseX?: (e: React.MouseEvent) => void;
}
/**
 * Popover
 * @description brick component Popover
 * @for-mobx
 */
export declare class Popover extends React.Component<PopoverProps> {
    static displayName: string;
    static defaultProps: {
        className: string;
        placement: string;
        withArrow: boolean;
    };
    static contextType: React.Context<import("@befe/brick-comp-config-provider/src").ConfigContextValue>;
    context: React.ContextType<typeof ConfigContext>;
    refTrigger: React.RefObject<PopperTrigger>;
    get className(): string;
    get actionAlign(): "left" | "right" | "center" | undefined;
    get withCloseX(): boolean;
    get triggerProps(): {
        ref: React.RefObject<PopperTrigger>;
        disabled?: boolean | undefined;
        visible?: boolean | undefined;
        children?: React.ReactNode;
        target?: HTMLElement | (() => void | HTMLElement | null) | undefined;
        type?: "click" | "focus" | "hover" | undefined;
        onChange?: ((visible: boolean, e?: Event | React.SyntheticEvent<Element, Event> | undefined) => void) | undefined;
        defaultVisible?: boolean | undefined;
        beforeChange?: ((visible: boolean) => boolean | void | Promise<any>) | undefined;
        mouseEnterDelayInMS?: number | undefined;
        mouseLeaveDelayInMS?: number | undefined;
        focusDelayInMS?: number | undefined;
        blurDelayInMS?: number | undefined;
        onClickCloseX?: ((e: React.MouseEvent<Element, MouseEvent>) => void) | undefined;
    };
    get popperProps(): PopperProps;
    /**
     * @public
     */
    setVisible(visible: boolean, e?: Event | React.SyntheticEvent): void;
    handleClickClose: (e: React.MouseEvent<Element, MouseEvent>) => void;
    renderCloseX(): JSX.Element | null;
    renderHeadline(): JSX.Element | null;
    renderContent(): JSX.Element | null;
    renderActions(): JSX.Element | null;
    render(): JSX.Element;
}
export {};
