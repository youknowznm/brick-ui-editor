import dayjs, {Dayjs} from 'dayjs';
import {InnerDatePicker} from '../inner-comps/inner-date-picker';
import {UiItemLayout} from '../ui-comps/ui-item-layout';
import {getDateRows, weekTitleRow} from '../utils/date-utils';
import * as React from 'react';
import {UiPanel} from '../ui-comps/ui-panel';
import {UiPanelTitle} from '../ui-comps/ui-panel-title';
import {createInitOpts} from './create-init-opts';
import {createDisplayedDateSwitcher, TypeDisplayedDateSwitcherInitOpts} from './create-date-switcher';
import {TypeLayoutItem} from '../ui-comps/types';
import {UILayoutItem} from '../ui-comps/ui-item';
import {InnerRangePicker} from '../inner-comps/inner-range-picker';
import {DEFAULT_TITLE_FORMAT} from '../inner-comps/const-default-format';

type TypeInitOpts = {
    onSelected: (value: Dayjs) => void
    onZoomOut: () => void
};

const TITLE_FORMAT = DEFAULT_TITLE_FORMAT.date;

export function createDatePanel(
    comp: InnerDatePicker | InnerRangePicker,
    opts: {
        valueProp: 'value' | 'startValue'
        displayProp: 'displayedDate' | 'startDisplayedDate'
    }
) {
    const {
        valueProp,
        displayProp,
    } = opts;

    const initOpts = createInitOpts<TypeInitOpts>('DatePanel');
    const displayedSwitcher = createDisplayedDateSwitcher(
        comp,
        {
            displayProp,
        }
    );

    function getDisplayed() {
        // @ts-ignore
        return comp.state[displayProp]!;
    }

    function getPanelTitleText() {
        return getDisplayed().format(TITLE_FORMAT);
    }

    function handleZoomOut() {
        initOpts.get().onZoomOut();
    }

    function getSelectedValueTimestamp() {
        // @ts-ignore
        const value = comp.state[valueProp];
        return value && value.valueOf();
    }

    function handleSelectDate(selectedTimestamp: number) {
        const selectedDate = dayjs(selectedTimestamp);
        // @ts-ignore
        comp.setState({
            [valueProp]: selectedDate
        });

        initOpts.get().onSelected(selectedDate);
    }

    function handleClickOutside(timestamp: number) {
        // @ts-ignore
        comp.setState({
            [displayProp]: dayjs(timestamp).startOf('month')
        });
    }

    function renderContentItem(
        today: Dayjs,
        selectedValueTimestamp: number | null,
        item: TypeLayoutItem
    ) {
        const data = item.data!;
        let disabled = false;

        if (comp.props.getDisabledItem) {
            disabled = comp.props.getDisabledItem(data.date, today);
        }

        const itemValue = item.data!.date.valueOf();

        return {
            elem: <UILayoutItem
                key={item.key}
                value={itemValue}
                text={item.text}

                outside={data.outside}
                selected={itemValue === selectedValueTimestamp}
                disabled={disabled}
                today={item.key === today.valueOf()}

                onClick={handleSelectDate}
                onClickOutside={handleClickOutside}
            />
        };
    }

    function renderPanelContent() {
        const displayed = getDisplayed();
        return <UiItemLayout
            titleRow={weekTitleRow}
            rows={
                getDateRows(
                    displayed.year(),
                    displayed.month()
                )
            }
            renderItem={
                renderContentItem.bind(
                    null,
                    dayjs().startOf('day'),
                    getSelectedValueTimestamp()
                )
            }
        />;
    }

    function renderPanelTitle() {
        const {
            goBackwardYear,
            goForwardYear,
            goBackwardMonth,
            goForwardMonth,
        } = displayedSwitcher;

        return <UiPanelTitle
            text={getPanelTitleText()}

            hasZooming={true}
            isZooming={false}

            shouldShowInner={true}
            actionShowType={'both'}

            onFastLeftClick={goBackwardYear}
            onFastRightClick={goForwardYear}
            onPlainLeftClick={goBackwardMonth}
            onPlainRightClick={goForwardMonth}

            onZoomingClick={handleZoomOut}
        />;
    }

    return {
        init(
            panelOpts: TypeInitOpts,
            switcherOpts?: TypeDisplayedDateSwitcherInitOpts
        ) {
            initOpts.init(panelOpts);
            if (switcherOpts) {
                displayedSwitcher.init(switcherOpts);
            }
        },

        renderPanel() {
            return <UiPanel
                titleElem={renderPanelTitle()}
                contentElem={renderPanelContent()}
                contentType={'date'}
            />;
        }
    };
}

type TypeModuleDatePanel = ReturnType<typeof createDatePanel>
