/**
 * @file select
 * @author wujun07
 * @owner wujun07:2019-11-07
 */
import * as React from 'react';
import { MenuPopperProps } from '@befe/brick-comp-menu';
import { ConfigContext } from '@befe/brick-comp-config-provider';
import { OptionObject, OptionValue, SelectValue } from './common';
export interface SelectProps {
    /**
     * 用户可自定义 class
     */
    className?: string;
    /**
     * 选择模式
     */
    mode?: 'single' | 'multiple';
    /**
     * 选中控制值
     */
    value?: SelectValue;
    /**
     * 选中默认值
     */
    defaultValue?: SelectValue;
    /**
     * 选项列表
     */
    options?: OptionObject[];
    /**
     * 最大选择个数
     * `mode` 为 `multiple` 时有效
     */
    maxNumber?: number;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 未选择占位提示
     */
    placeholder?: string;
    /**
     * 尺寸
     */
    size?: 'xs' | 'sm' | 'md' | 'lg';
    /**
     * 选项列表弹出位置
     */
    placement?: MenuPopperProps['placement'];
    /**
     * 值变化时的回调
     */
    onChange?: (value: SelectValue) => void;
}
export interface SelectState {
    value: SelectValue;
    popperVisible: boolean;
}
declare function optionValuePropChecker(props: SelectProps, propName: keyof SelectProps, componentName: string): false | Error | undefined;
/**
 * Select
 * @description brick component Select
 * @for-mobx
 */
export declare class Select extends React.Component<SelectProps, SelectState> {
    static displayName: string;
    static propTypes: {
        value: typeof optionValuePropChecker;
        defaultValue: typeof optionValuePropChecker;
    };
    static defaultProps: {
        className: string;
        mode: string;
        disabled: boolean;
    };
    static context: React.Context<import("@befe/brick-comp-config-provider/src").ConfigContextValue>;
    static getDerivedStateFromProps(nextProps: SelectProps): Pick<SelectProps, "disabled" | "size" | "value" | "className" | "placement" | "onChange" | "defaultValue" | "placeholder" | "mode" | "options" | "maxNumber"> | null;
    state: SelectState;
    context: React.ContextType<typeof ConfigContext>;
    constructor(props: SelectProps);
    get className(): string;
    get size(): SelectProps['size'];
    get menuSize(): "sm" | "md";
    get withMaxNumber(): boolean;
    get isFull(): boolean;
    get menuPopperProps(): MenuPopperProps;
    get hasValue(): boolean;
    get options(): OptionObject[];
    get isSelectedAll(): boolean;
    get isMultiple(): boolean;
    get selectedIds(): (string | number)[];
    get selectedOptions(): OptionObject[];
    handlerPopperVisibleChange: (popperVisible: boolean) => void;
    handleChangeSelectedIds: (selectedIds: (string | number)[]) => void;
    handleClickSelectAll: (e: React.MouseEvent<Element, MouseEvent>) => void;
    findOption(value: OptionValue, options?: OptionObject[]): OptionObject | void;
    normalizeOptions(children: React.ReactNode): OptionObject[];
    renderSuffix(): JSX.Element;
    renderPlaceholder(): JSX.Element | null;
    renderSelected(): JSX.Element | null;
    renderSelection(): React.ReactNode;
    renderTarget(): JSX.Element;
    renderOptions: (options?: OptionObject[] | undefined) => {} | undefined;
    renderSelectAllOption(): JSX.Element | null;
    renderPopper(): JSX.Element;
    render(): JSX.Element;
}
export {};
