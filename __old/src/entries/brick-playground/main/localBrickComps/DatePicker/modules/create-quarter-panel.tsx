import {InnerDatePicker} from '../inner-comps/inner-date-picker';
import {createInitOpts} from './create-init-opts';
import dayjs, {Dayjs} from 'dayjs';
import {UiPanel} from '../ui-comps/ui-panel';
import * as React from 'react';
import {UiPanelTitle} from '../ui-comps/ui-panel-title';
import {createDisplayedDateSwitcher} from './create-date-switcher';
import {UiItemLayout} from '../ui-comps/ui-item-layout';
import {getMonthRows, getQuarterRows, getYearList} from '../utils/date-utils';
import {TypeLayoutItem} from '../ui-comps/types';
import {UILayoutItem} from '../ui-comps/ui-item';
import {UiAside} from '../ui-comps/ui-aside';
import {createRef} from './create-ref';
import {createAction} from 'mobx/lib/core/action';
import {createAside} from './create-aside';
import {DEFAULT_TITLE_FORMAT} from '../inner-comps/const-default-format';


type TypeInitOpts = {
    onSelected: (value: Dayjs) => void
    onZoomIn?: () => void
};

const TITLE_FORMAT = DEFAULT_TITLE_FORMAT.quarter;

export function createQuarterPanel(
    comp: InnerDatePicker,
    opts: {
        valueProp: 'value' | 'displayedDate'
        displayProp: 'displayedDate' | 'zoomedDisplayedDate'
    }
) {
    const {
        valueProp,
        displayProp,
    } = opts;

    const initOpts = createInitOpts<TypeInitOpts>('MonthPanel');
    const displayedSwitcher = createDisplayedDateSwitcher(
        comp,
        {
            displayProp,
        }
    );

    const aside = createAside(
        comp,
        {
            displayProp
        }
    );

    function getDisplayed() {
        return comp.state[displayProp]!;
    }

    function getPanelTitleText() {
        return getDisplayed().format(
            TITLE_FORMAT
        );
    }

    function handleZoomIn() {
        initOpts.get().onZoomIn!();
    }

    function getSelectedValueTimestamp() {
        const value = comp.state[valueProp];
        return value && value.startOf('quarter').valueOf();
    }

    function handleSelectDate(selectedTimestamp: number) {
        const selectedDate = dayjs(selectedTimestamp);

        // @ts-ignore
        comp.setState({
            [valueProp]: selectedDate
        });

        initOpts.get().onSelected(selectedDate);
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

                selected={itemValue === selectedValueTimestamp}
                disabled={disabled}

                onClick={handleSelectDate}
            />
        };
    }

    function renderPanelContent() {
        const displayed = getDisplayed();
        return <UiItemLayout
            rows={
                getQuarterRows(displayed.year())
            }

            renderItem={
                renderContentItem.bind(
                    null,
                    dayjs().startOf('quarter'),
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

            hasZooming={false}
            isZooming={true}

            shouldShowInner={false}
            actionShowType={'both'}

            onFastLeftClick={goBackwardYear}
            onFastRightClick={goForwardYear}
            onPlainLeftClick={goBackwardMonth}
            onPlainRightClick={goForwardMonth}

            onZoomingClick={handleZoomIn}
        />;
    }


    const api = {
        init(
            opts: TypeInitOpts,
        ) {
            initOpts.init(opts);

            const switcherOpts = {
                onDisplayDateChange: (displayedDate: Dayjs) => {
                    aside.setYearRangeAnchor(displayedDate.year());
                    aside.syncAsideScroll();
                }
            };
            displayedSwitcher.init(switcherOpts);
        },

        renderPanel() {
            return <UiPanel
                titleElem={renderPanelTitle()}
                contentElem={renderPanelContent()}
                asideElem={aside.render()}
                contentType={'quarter'}
            />;
        },
    };

    return aside.extendApi(api);
}

export type TypeModuleMonthPanel = ReturnType<typeof createQuarterPanel>
