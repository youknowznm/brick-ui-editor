import * as React from 'react';
import {createDatePickerUserInput} from './create-user-input';
import {createDatePanel} from '../modules/create-date-panel';
import {createMonthPanel, TypeModuleMonthPanel} from '../modules/create-month-panel';
import {createQuarterPanel} from '../modules/create-quarter-panel';
import {Popper} from '@befe/brick-comp-popper';
import {createDelayActionQueue, createListenerGroup, pickDerivedStateFromProps} from '@befe/brick-utils';
import dayjs, {Dayjs} from 'dayjs';
import {default as c} from 'classnames';
import {getDateRows} from '../utils/date-utils';
import {TypeActionLink, TypeDatePickerMode, TypeDateValue, TypePickerSize, TypePickerStatus} from './prop-types';
import {DEFAULT_ITEM_FORMAT, DEFAULT_TITLE_FORMAT} from './const-default-format';

export interface IDatePickerProps {
    /**
     * 用户可自定义 class
     */
    className?: string

    /**
     * 选中的日期值 (控制属性)
     */
    value?: TypeDateValue

    /**
     * 选中的日期值 (非控制属性)
     */
    defaultValue?: TypeDateValue

    disabled?: boolean

    /**
     * @todo
     *
     * 整体大小控制 's' (small) | 'm' (medium)
     */
    size?: TypePickerSize

    /**
     * 是否当前出于出错状态
     */
    status?: TypePickerStatus

    /**
     * 选择器的取值类型
     */
    mode?: TypeDatePickerMode

    /**
     * 用来将 value 格式化给 input 框, 以及从 input 框中还原 value
     *
     * 默认:
     * - date:     'YYYY-MM-DD'
     * - month:    'YYYY-MM'
     * - quarter:  'YYYY-\QQ'
     *
     * 可参考:
     * [基础 format 格式](https://github.com/iamkun/dayjs/blob/HEAD/docs/en/API-reference.md#format-formatstringwithtokens-string)
     * & [高级 format 格式](https://github.com/iamkun/dayjs/blob/66ce23f2e18c5506e8f1a7ef20d3483a4df80087/docs/en/Plugin.md#advancedformat)
     */
    itemFormat?: string

    /**
     * 用来格式化面板上的标题文本, 默认 "YYYY年M月"
     */
    titleFormat?: string

    renderItem?: (
        currentDate: Dayjs,
        today: Dayjs
    ) => (JSX.Element | string | number)

    getDisabledItem?: (currentDate: Dayjs, today: Dayjs) => boolean

    /**
     * 只在 date 模式有意义, 是否允许选择时间
     *
     * default: false
     */
    showTime?: boolean

    /**
     * 某天中, 可选的时间范围
     *
     * start, end 0 ~ 24 x 60 x 60 (一天的秒数), 如果为 null, 视为 无限制
     */
    getDisabledTime?: (currentDate: Dayjs) => { start: number | null; end: number | null; }

    /**
     * 面板的显隐 (控制属性)
     */
    open?: boolean | undefined

    /**
     * 日期选择器 input 框的 placeholder
     */
    placeholder?: string

    style?: CSSStyleDeclaration

    /**
     * @todo
     *
     * 面板的附加 className
     */
    popupClassName?: string
    /**
     * @todo
     *
     * 面板的附加 style 控制
     */
    popupStyle?: CSSStyleDeclaration

    /**
     * 当选择中一个日期时, 会触发该回调
     *
     * @param selected
     */
    onChange?: (selected: Dayjs | null) => void

    /**
     * @todo:review
     * 当选择器的面板显隐状态发生更改时, 会触发该回调
     *
     * @param openStatus
     */
    onOpenChange?: (openStatus: boolean) => void

    /**
     * @todo
     * 自定义绘制 "面板的脚区域"
     */
    renderFooter?: () => JSX.Element | Array<TypeActionLink>

    /**
     * @todo
     * 自定义绘制面板的侧边快捷操作
     */
    renderQuickActions?: () => JSX.Element | Array<TypeActionLink>

    /**
     * 提供给日期 (date) 选择中, 快速切换月份时, 年份的起始范围
     *
     * 默认: 已选中年或当前年的往前 12年
     */
    yearStart: number

    /**
     * 参见 yearStart,
     *
     * 默认: 已选中年或当前年的往后 12年
     */
    yearEnd: number
}

interface IDatePickerState {
    open: boolean
    isZooming: boolean
    prevMode?: TypeDatePickerMode

    inputValue: string

    value: Dayjs | null

    displayedDate: Dayjs | null
    zoomedDisplayedDate: Dayjs | null

    isUserInput: boolean
    userInputText: string

    defaultItemFormat: string
    defaultTitleFormat: string
}

function getDefault<T>(targetValue: T, defaultValue: T): T {
    return typeof targetValue === 'undefined' ? defaultValue : targetValue;
}

function createGenericPannelRenderer(
    comp: InnerDatePicker
) {

}

const mode2PanelProp = {
    month: 'monthPanel',
    quarter: 'quarterPanel',
};

/**
 * @for-mobx
 *
 * InnerDatePicker
 * @description brick component InnerDatePicker
 */
export class InnerDatePicker extends React.Component<IDatePickerProps, IDatePickerState> {
    // === 对外 static API ===
    static dayjs = dayjs;

    // === 内部 static API ===
    static displayName = 'DatePicker';

    static defaultProps = {
        mode: 'date',
        className: '',
        disabled: false,
        status: 'normal',

        yearStart: 12,
        yearEnd: 12,
    };

    // === 内部 props ===
    state: IDatePickerState = {
        open: typeof this.props.open === 'undefined' ? false : this.props.open,
        isZooming: false,

        inputValue: '',

        // @todo:check
        value: null,

        displayedDate: null,
        zoomedDisplayedDate: null,

        isUserInput: false,
        userInputText: '',

        defaultItemFormat: '',
        defaultTitleFormat: '',
    };

    userInput = createDatePickerUserInput(this);
    datePanel = createDatePanel(this, {
        valueProp: 'value',
        displayProp: 'displayedDate',
    });

    zoomedDatePanel: TypeModuleMonthPanel = createMonthPanel(this, {
        hasZoomHandler: true,
        valueProp: 'displayedDate',
        displayProp: 'zoomedDisplayedDate',
    });

    monthPanel = createMonthPanel(this, {
        hasZoomHandler: false,
        valueProp: 'value',
        displayProp: 'displayedDate',
    });

    quarterPanel = createQuarterPanel(this, {
        valueProp: 'value',
        displayProp: 'displayedDate',
    });

    inputWrapperElem: HTMLDivElement | null = null;
    refInputWrapper = (node: HTMLDivElement | null): void => {
        this.inputWrapperElem = node;
    };

    panelWrapperElem: Popper | null = null;
    refPanelWrapper = (node: Popper | null): void => {
        this.panelWrapperElem = node;
    };

    actionQueue = createDelayActionQueue();
    listenerGroup = createListenerGroup();

    // === 公共对内控制 API ===
    focus() {

    }

    // === 组件: 生命周期 ===
    constructor(props: any) {
        super(props);

        const initValue = typeof this.props.defaultValue === 'undefined' ? this.props.value : this.props.defaultValue;
        this.state.value = initValue ? dayjs(initValue) : null;

        // 如果有 state.value 值, 需要对齐该显示月份
        this.state.displayedDate = dayjs(this.state.value || undefined);

        const onItemSelected = (selectedDate: Dayjs) => {
            this.changeValue(selectedDate);
            this.changeDatePickerOpenStatus(false);
        };

        this.datePanel.init({
            onZoomOut: () => {
                this.setState({
                    isZooming: true,
                    zoomedDisplayedDate: this.state.displayedDate
                });

                this.zoomedDatePanel.setYearRangeAnchor(this.state.displayedDate!.year());
                this.zoomedDatePanel.syncAsideScroll();
            },
            onSelected: onItemSelected
        });

        this.zoomedDatePanel.init({
            onZoomIn: () => {
                this.setState({
                    isZooming: false,
                });
            },
            onSelected: () => {
                this.setState({
                    isZooming: false
                });
            }
        });

        this.monthPanel.init({
            onSelected: onItemSelected
        });

        this.quarterPanel.init({
            onSelected: onItemSelected
        });

    }

    static getDerivedStateFromProps(nextProps: IDatePickerProps, nextState: IDatePickerState) {
        let partialState = pickDerivedStateFromProps(nextProps, ['open', 'value']);
        const mode = nextProps.mode || 'date';

        if (partialState && partialState.value) {
            partialState.value = dayjs(partialState.value)
                .startOf(mode);
        }

        if (!nextState || mode !== nextState.prevMode) {
            // @ts-ignore
            partialState = partialState || {};

            Object.assign(partialState, {
                prevMode: mode,
                defaultItemFormat: DEFAULT_ITEM_FORMAT[mode],
                defaultTitleFormat: DEFAULT_TITLE_FORMAT[mode],
            });
        }

        return partialState || null;
    }

    componentDidUpdate(prevProps: Readonly<IDatePickerProps>, prevState: Readonly<IDatePickerState>, snapshot?: any): void {
        this.actionQueue.execute();
    }

    componentDidMount(): void {
        this.listenerGroup.add(document, {
            'mousedown': (e: MouseEvent) => {
                if (
                    this.state.open

                    && this.panelWrapperElem
                    && this.panelWrapperElem.nodePopper
                    && !this.panelWrapperElem.nodePopper.contains(e.target as Node)

                    && this.inputWrapperElem
                    && !this.inputWrapperElem.contains(e.target as Node)
                ) {
                    this.setState({
                        open: false,
                    });
                    this.checkOpenStatus({open: false});
                }
            }
        });
        this.actionQueue.execute();
    }

    componentWillUnmount(): void {
        this.listenerGroup.removeAll();
    }

    // === getter ===
    get className() {
        const {className} = this.props;
        return c(
            'brick-date-picker',
            className
        );
    }

    get computedItemFormat() {
        if (this.props.itemFormat) {
            return this.props.itemFormat;
        }
        return this.state.defaultItemFormat;
    }

    // === inner methods ===
    changeValue = (selectedDate: Dayjs) => {
        const onChange = this.props.onChange;

        if (onChange) {
            onChange(selectedDate);
        }
        this.setState({
            value: selectedDate
        });
    };

    /**
     * - 确保打开时, scroll 到特定的年份
     * - displayDate 被重置
     */
    previousOpen: boolean | null = null;
    checkOpenStatus = (opts: {
        open?: boolean
        isUserInput?: boolean
    }) => {
        const open = getDefault(opts.open, this.state.open);
        const userInput = getDefault(opts.isUserInput, this.state.isUserInput);

        const computedOpen = open || userInput || null;

        if (computedOpen && computedOpen !== this.previousOpen) {
            const value = this.state.value;
            const displayedDate = value ? value.clone() : dayjs();
            this.setState({
                displayedDate,
            });

            // @ts-ignore
            const panelProp = mode2PanelProp[this.props.mode];
            if (panelProp) {
                // @ts-ignore
                this[panelProp].setYearRangeAnchor(displayedDate.year());
                // @ts-ignore
                this[panelProp].syncAsideScroll();
            }
        }
        this.previousOpen = computedOpen;
    };

    // === handlers ===
    handleCalendarIconClick = () => {
        this.changeDatePickerOpenStatus(true);
    };

    // ==== 选择器面板的显隐控制 ====
    changeDatePickerOpenStatus = (visible: boolean) => {
        this.setState({
            open: visible,
            isZooming: false,
        });
        this.checkOpenStatus({open: visible});
    };

    // === renderers ===
    renderPanel = () => {
        const mode = this.props.mode;
        if (mode === 'date') {
            if (!this.state.isZooming) {
                return this.datePanel.renderPanel();
            } else {
                return this.zoomedDatePanel.renderPanel();
            }
        } else if (mode === 'month') {
            return this.monthPanel.renderPanel();
        } else if (mode === 'quarter') {
            return this.quarterPanel.renderPanel();
        }
    };

    render() {
        const value = dayjs(this.state.value as Dayjs);

        const shouldShowPanel = this.state.isUserInput || this.state.open;

        // @zhangenming 200127 为了适配 eup, 写死 popper 的 portalContainer
        const portalContainer = document.querySelector('.date-picker-demo-block')

        return (
            <div className={this.className}
                 ref={this.refInputWrapper}>
                {this.userInput.renderInput()}
                <Popper
                    portalContainer={portalContainer}
                    className={this.props.popupClassName}
                    visible={shouldShowPanel}
                    placement={'bottom-start'}
                    target={this.userInput.inputElem}
                    ref={this.refPanelWrapper}
                >
                    {this.renderPanel()}
                </Popper>
            </div>
        );
    }
}
