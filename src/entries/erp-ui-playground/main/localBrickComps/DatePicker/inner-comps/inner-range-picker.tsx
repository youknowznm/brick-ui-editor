import dayjs, {Dayjs} from 'dayjs';
import * as React from 'react';
import {TypeActionLink, TypeDatePickerMode, TypeDateValue, TypePickerSize, TypePickerStatus} from './prop-types';
import {createRangePickerUserInput} from './create-range-input';
import c from 'classnames';
import {createDatePanel} from '../modules/create-date-panel';
import {Popper} from '@befe/brick-comp-popper';
import {createRef} from '../modules/create-ref';
import {DEFAULT_ITEM_FORMAT} from './const-default-format';

export interface IRangePickerProps {
    className?: string

    startValue?: TypeDateValue
    endValue?: TypeDateValue

    defaultStartValue?: TypeDateValue
    defaultEndValue?: TypeDateValue

    disabled?: boolean

    size?: TypePickerSize

    status?: TypePickerStatus

    mode?: TypeDatePickerMode

    itemFormat?: string

    renderItem?: (
        currentDate: Dayjs,
        today: Dayjs
    ) => (JSX.Element | string | number)

    getDisabledItem?: (currentDate: Dayjs, today: Dayjs) => boolean

    showTime?: boolean

    getDisabledTime?: (currentDate: Dayjs) => {
        start: number | null
        end: number | null
    }

    open?: boolean | undefined

    startPlaceholder?: string
    endPlaceholder?: string

    startStyle?: CSSStyleDeclaration
    endStyle?: CSSStyleDeclaration

    popupClassName?: string
    popupStyle?: CSSStyleDeclaration

    onChange?: (start: Dayjs | null, end: Dayjs | null) => void
    onStartChange?: (selected: Dayjs | null) => void
    onEndChange?: (selected: Dayjs | null) => void

    onOpenChange?: (openStatus: boolean) => void

    renderFooter?: () => JSX.Element | Array<TypeActionLink>
    renderQuickActions?: () => JSX.Element | Array<TypeActionLink>

    yearStart?: number
    yearEnd?: number
}

interface IRangePickerState {
    open: boolean

    isStartZooming: boolean
    isEndZooming: boolean

    startValue: Dayjs | null
    endValue: Dayjs | null

    startDisplayedDate: Dayjs | null
    endDisplayedDate: Dayjs | null

    startZoomedDisplayedDate: Dayjs | null
    endZoomedDisplayedDate: Dayjs | null

    isStartUserInput: boolean
    startUserInputText: string

    isEndUserInput: boolean
    endUserInputText: string

    startFocus: boolean
    endFocus: boolean
}

/**
 * @for-mobx
 */
export class InnerRangePicker extends React.Component<IRangePickerProps, IRangePickerState> {

    static dayjs = dayjs;

    static displayName = 'RangePicker';

    defaultItemFormat = DEFAULT_ITEM_FORMAT[this.props.mode || 'date'];

    state: IRangePickerState = {
        open: false,

        startValue: null,
        endValue: null,

        startDisplayedDate: null,
        endDisplayedDate: null,

        isStartZooming: false,
        isEndZooming: false,

        startZoomedDisplayedDate: null,
        endZoomedDisplayedDate: null,

        isStartUserInput: false,
        startUserInputText: '',

        isEndUserInput: false,
        endUserInputText: '',

        startFocus: false,
        endFocus: false,
    };

    refPanelWrapper = createRef();

    userInput = createRangePickerUserInput(this);
    startDatePanel = createDatePanel(this, {
        valueProp: 'startValue',
        displayProp: 'startDisplayedDate'
    });

    get className() {
        return c(
            'brick-range-picker',
            this.props.className
        );
    }

    get computedItemFormat() {
        const itemFormat = this.props.itemFormat;
        if (itemFormat) {
            return itemFormat;
        }

        return this.defaultItemFormat;
    }

    constructor(props: any) {
        super(props);

        const initStartValue = typeof this.props.defaultStartValue === 'undefined'
            ? this.props.startValue : this.props.defaultStartValue;

        this.state.startValue = initStartValue ? dayjs(initStartValue) : null;
        this.state.startDisplayedDate = dayjs(initStartValue || undefined);
    }

    renderPanel() {
        return this.startDatePanel.renderPanel();
    }

    render() {
        const shouldShowPanel = this.state.open;

        return <div className={this.className}>
            {this.userInput.renderInput({
                status: this.props.status,
                disabled: this.props.disabled
            })}
            <Popper
                className={this.props.popupClassName}
                visible={shouldShowPanel}
                placement={'bottom-start'}
                target={this.userInput.inputElem || undefined}
                ref={this.refPanelWrapper.ref}
            >
                {this.renderPanel()}
            </Popper>
        </div>;
    }
}
