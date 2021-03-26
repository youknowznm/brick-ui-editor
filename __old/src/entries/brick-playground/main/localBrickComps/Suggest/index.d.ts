/// <reference types="lodash" />
/**
 * @file suggest
 * @author wujun07
 * @owner wujun07:2019-12-26
 */
import * as React from 'react';
import { MenuItemId, MenuPopperProps } from '@befe/brick-comp-menu';
import { InputProps } from '@befe/brick-comp-input';
import { Input } from '@befe/brick-comp-input';
import { ConfigContext } from '@befe/brick-comp-config-provider';
declare type SuggestPropsFromInput = Pick<InputProps, 'placeholder'>;
export interface SuggestOption {
    /**
     * 唯一标识
     */
    id: MenuItemId;
    /**
     * 显示文字，用于已选择
     */
    label: string;
    /**
     * 显示内容，用于选项，如不指定则使用 label
     */
    content?: React.ReactNode;
    /**
     * 是否禁用
     */
    disabled?: boolean;
    /**
     * 子选项，只支持一层，用于 group
     */
    children?: SuggestOption[];
}
declare type SuggestValue = null | SuggestOption | SuggestOption[];
export interface SuggestProps extends SuggestPropsFromInput {
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
    value?: SuggestValue;
    /**
     * 选中默认值
     */
    defaultValue?: SuggestValue;
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
    onChange?: (value: SuggestValue) => void;
    /**
     * 查询回调
     */
    onSearch?: (query: string) => Promise<SuggestOption[]>;
    /**
     * loading 图标的延迟响应时间
     * 单位 ms
     * 0 为立即显示
     */
    loadingDelayInMS?: number;
    /**
     * 是否使用 trimmed 过的 inputValue 作为 fetch 的 query 参数
     */
    trim?: boolean;
    /**
     * 空字符串是是否进行 search
     * 设为 true 则空字符串在 focus 状态下亦会触发 search
     */
    shouldEmptySearch?: boolean;
}
interface SuggestState {
    selected: SuggestOption[];
    popperVisible: boolean;
    loading: boolean;
    fetched: boolean;
    inputValue: string;
    options: SuggestOption[];
}
/**
 * Suggest
 * @description brick component Suggest
 * @for-mobx
 */
export declare class Suggest extends React.Component<SuggestProps, SuggestState> {
    static displayName: string;
    static defaultProps: {
        mode: string;
        trim: boolean;
        placement: string;
        loadingDelayInMS: number;
        disabled: boolean;
    };
    static contextType: React.Context<import("@befe/brick-comp-config-provider/src").ConfigContextValue>;
    static getDerivedStateFromProps(nextProps: SuggestProps): {
        selected: SuggestOption[];
    } | null;
    context: React.ContextType<typeof ConfigContext>;
    state: SuggestState;
    fetchId: number;
    focused: boolean;
    refSuggest: React.RefObject<HTMLDivElement>;
    refInput: React.RefObject<Input>;
    blurDelayHandler: import("@befe/brick-utils/src").DelayHandler<[], void>;
    loadingDelayHandler: import("@befe/brick-utils/src").DelayHandler<[], void>;
    constructor(props: SuggestProps);
    get className(): string;
    get size(): "sm" | "md" | "xs" | "lg" | undefined;
    get nodeInput(): Input | null;
    get value(): SuggestOption | SuggestOption[];
    get isMultiple(): boolean;
    get isLoading(): boolean;
    get isFetched(): boolean;
    get hasSelected(): boolean;
    get menuPopperProps(): MenuPopperProps;
    get selectedIds(): (string | number)[];
    handlePopperVisibleChange: (popperVisible: boolean, e: Event | React.SyntheticEvent<Element, Event>) => void;
    handleChangeSelectedIds: (selectedIds: (string | number)[]) => void;
    handleBlurInput: (e: React.FocusEvent<Element>) => void;
    handleFocusInput: (e: React.FocusEvent<Element>) => void;
    handleChangeInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleClickClear: (e: React.MouseEvent<Element, MouseEvent>) => void;
    search: ((inputValue: any) => void) & import("lodash").Cancelable;
    getLocaleText(key: string, ...args: []): string;
    getValue(selected?: SuggestOption[]): SuggestOption | SuggestOption[];
    findOption(id: MenuItemId, options?: SuggestOption[]): SuggestOption | null;
    fetch(query: string): Promise<void>;
    clearSelection(): void;
    clearBlurTimer(): void;
    autoResetInputValue(): void;
    resetInputValue(value?: SuggestOption | SuggestOption[]): void;
    hideMenuPopper(): void;
    reset(): void;
    focus(): void;
    blur(): void;
    renderInputSuffix(): JSX.Element;
    renderSingleSelection(): JSX.Element;
    renderMultipleSelection(): null;
    renderSelection(): JSX.Element | null;
    renderMenuItem(opt: SuggestOption): JSX.Element;
    renderMenuItemGroup(opt: SuggestOption): JSX.Element | null;
    renderOptions(): (JSX.Element | null)[] | null;
    renderNoOptions(): JSX.Element | null;
    renderPopper(): JSX.Element | null;
    renderTarget(): JSX.Element;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<SuggestProps>, prevState: Readonly<SuggestState>, snapshot?: any): void;
    render(): JSX.Element;
}
export {};
