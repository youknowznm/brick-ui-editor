/**
 * @file menu-popper
 * @author wujun07
 * @owner wujun07:2019-10-11
 */
import * as React from 'react';
import { PopperTrigger, PopperTriggerProps, PopperProps } from '@befe/brick-comp-popper';
import { ConfigContext } from '@befe/brick-comp-config-provider';
import { PropsFromPopper } from './common';
export interface MenuPopperProps extends PopperTriggerProps, PropsFromPopper {
    /**
     * 用户可自定义 class
     */
    className?: string;
    /**
     * 尺寸
     */
    size?: 'xs' | 'sm' | 'md' | 'lg';
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * popper 位置
     * 详见 [popper](/components/popper)
     * @default 'right-start'
     */
    placement?: PopperProps['placement'];
    /**
     * popper 的 target 元素
     */
    targetContent?: React.ReactNode;
    /**
     * 是否处于 loading 状态
     */
    loading?: boolean;
    /**
     * 无内容提示
     */
    emptyHint?: React.ReactNode;
}
/**
 * PopperMenu
 * @description brick component Menu
 * @for-mobx
 */
export declare class MenuPopper extends React.Component<MenuPopperProps> {
    static displayName: string;
    static defaultProps: {
        className: string;
        disabled: boolean;
        type: string;
        placement: string;
        matchMinWidthToTarget: boolean;
    };
    static contextType: React.Context<import("@befe/brick-comp-config-provider/src").ConfigContextValue>;
    context: React.ContextType<typeof ConfigContext>;
    refTrigger: React.RefObject<PopperTrigger>;
    get className(): string;
    get triggerProps(): {
        ref: React.RefObject<PopperTrigger>;
        disabled?: boolean | undefined;
        loading?: boolean | undefined;
        visible?: boolean | undefined;
        size?: "sm" | "md" | "xs" | "lg" | undefined;
        children?: React.ReactNode;
        target?: HTMLElement | (() => void | HTMLElement | null) | undefined;
        type?: "click" | "focus" | "hover" | undefined;
        matchMinWidthToTarget?: boolean | undefined;
        onChange?: ((visible: boolean, e?: Event | React.SyntheticEvent<Element, Event> | undefined) => void) | undefined;
        defaultVisible?: boolean | undefined;
        beforeChange?: ((visible: boolean) => boolean | void | Promise<any>) | undefined;
        mouseEnterDelayInMS?: number | undefined;
        mouseLeaveDelayInMS?: number | undefined;
        focusDelayInMS?: number | undefined;
        blurDelayInMS?: number | undefined;
        emptyHint?: React.ReactNode;
    };
    get popperProps(): {
        placement?: "auto" | "left" | "right" | "top" | "bottom" | "auto-start" | "auto-end" | "top-start" | "top-end" | "right-start" | "right-end" | "bottom-end" | "bottom-start" | "left-end" | "left-start" | undefined;
        matchMinWidthToTarget?: boolean | undefined;
        className: string;
    };
    get size(): "sm" | "md" | "xs" | "lg" | undefined;
    handleClickNonMenu: (e: React.MouseEvent<Element, MouseEvent>) => void;
    renderPopperContent(): {} | null | undefined;
    render(): JSX.Element;
}
