/**
 * @file toaster
 * @author wujun07
 * @owner wujun07:2019-11-29
 */
import * as React from 'react';
import {ToastProps} from './toast';

export interface ToastItem extends ToastProps {
    id: string;
}

export interface ToasterProps {
    /**
     * 用户可自定义 class
     */
    className?: string;
}

interface ToasterState {
    toastList: ToastItem[];
}

/**
 * Toaster
 * @description brick component Toaster
 * @for-mobx
 */
export declare class Toaster extends React.Component<React.PropsWithRef<ToasterProps>, ToasterState> {
    static displayName: string;
    static defaultProps: {
        className: string;
    };
    state: {
        toastList: never[];
    };

    get className(): string;

    renderToast: (toast: ToastItem) => JSX.Element;

    add(toast: ToastItem): void;

    remove(id: string): void;

    render(): JSX.Element;
}

export interface ToasterObject {
    toast: (toast: ToastItem) => void;
    remove: (key: string) => void;
    destroy: () => void;
}

export declare function createToaster(props?: ToasterProps): ToasterObject;

export {};
