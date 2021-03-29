import * as React from 'react';
import { DialogConfirmProps } from './dialog-confirm';
interface ConfirmOption extends DialogConfirmProps {
}
interface ConfirmObject {
    destroy: () => void;
}
interface ConfirmMethod {
    (message: React.ReactNode, option?: ConfirmOption): ConfirmObject;
    (headline: React.ReactNode, message?: React.ReactNode, option?: ConfirmOption): ConfirmObject;
    (p1: React.ReactNode, p2?: React.ReactNode | ConfirmOption, p3?: ConfirmOption): ConfirmObject;
}
/**
 * @docgen-skip
 */
interface ConfirmController {
    (option: ConfirmOption): ConfirmObject;
    info: ConfirmMethod;
    success: ConfirmMethod;
    warning: ConfirmMethod;
    error: ConfirmMethod;
}
declare const confirm: ConfirmController;
export { confirm };
