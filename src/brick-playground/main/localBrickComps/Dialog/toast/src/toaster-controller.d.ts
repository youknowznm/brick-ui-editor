import * as React from 'react';
import { ToastItem } from './toaster';
declare type ToasterOption = Partial<ToastItem>;
interface ToastMethod {
    (content: React.ReactNode, option?: ToasterOption): ToastObject;
    (headline: React.ReactNode, content?: React.ReactNode, option?: ToasterOption): ToastObject;
    (p1: React.ReactNode, p2?: React.ReactNode | ToasterOption, p3?: ToasterOption): ToastObject;
}
/**
 * @docgen-skip
 */
interface ToasterController {
    (option: ToasterOption): ToastObject;
    success: ToastMethod;
    info: ToastMethod;
    warning: ToastMethod;
    error: ToastMethod;
}
interface ToastObject {
    id: string;
    remove: () => void;
}
declare function removeToast(id: string): void;
declare const toast: ToasterController;
export { toast, removeToast };
