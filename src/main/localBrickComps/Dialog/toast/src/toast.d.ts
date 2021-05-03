/**
 * @file toast
 * @author wujun07
 * @owner wujun07:2019-11-29
 */
import * as React from 'react';
import {AlertType, SvgFC} from '@befe/brick-core';
import {ConfigContext} from '@befe/brick-comp-config-provider';

export declare const ToastTypes: ["info", "success", "warning", "error"];

export interface ToastProps {
    /**
     * 用户可自定义 class
     */
    className?: string;
    /**
     * 提示类型
     */
    type?: AlertType;
    /**
     * 自定义 icon
     */
    icon?: SvgFC;
    /**
     * 提示标题
     */
    headline?: React.ReactNode;
    /**
     * 提示内容
     */
    content?: React.ReactNode;
    /**
     * 显示时长
     * - <= 0 表示不自动关闭
     * - <= default 的正值将自动修正为 default
     */
    durationInMS?: number;
    /**
     * 关闭回调
     */
    onClose?: () => void;
    /**
     * 是否可手工关闭
     */
    manualClose?: boolean;
}

/**
 * Toast
 * @description brick component Toast
 * @for-mobx
 */
export declare class Toast extends React.Component<ToastProps> {
    static displayName: string;
    static defaultProps: {
        className: string;
        durationInMS: number;
        manualClose: boolean;
    };
    static contextType: React.Context<import("@befe/brick-comp-config-provider/src").ConfigContextValue>;
    context: React.ContextType<typeof ConfigContext>;

    get className(): string;

    get isCompact(): boolean;

    get duration(): number;

    get iconSvg(): (props: React.SVGProps<SVGSVGElement>) => Pick<React.ReactSVGElement, "key" | "type" | "props">;

    closeTimer: import("@befe/brick-utils/src").DelayHandler<[], void>;
    handleMouseEnter: (e: React.MouseEvent<Element, MouseEvent>) => void;
    handleMouseLeave: (e: React.MouseEvent<Element, MouseEvent>) => void;
    close: () => void;

    startDelayClose(): void;

    renderCloseX(): JSX.Element | null;

    componentDidMount(): void;

    renderIcon(): JSX.Element;

    renderHeadline(): JSX.Element | null;

    renderContent(): JSX.Element | null;

    render(): JSX.Element;
}
