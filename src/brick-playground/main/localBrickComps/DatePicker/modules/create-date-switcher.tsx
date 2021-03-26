import {Dayjs} from 'dayjs';
import {createInitOpts} from './create-init-opts';
import dayjs from 'dayjs';
import {InnerDatePicker} from '../inner-comps/inner-date-picker';
import {InnerRangePicker} from '../inner-comps/inner-range-picker';

export type TypeDisplayedDateSwitcherInitOpts = {
    onDisplayDateChange: (date: Dayjs) => void
};

/**
 * 控制面板上, 前后一年或前后一月的操作逻辑
 *
 * @param comp
 * @param opts
 */
export function createDisplayedDateSwitcher(
    comp: InnerDatePicker | InnerRangePicker,
    opts: {
        displayProp: 'displayedDate' | 'zoomedDisplayedDate' | 'startDisplayedDate' | 'endDisplayedDate'
    }
) {
    const {displayProp} = opts;
    const initOpts = createInitOpts<TypeDisplayedDateSwitcherInitOpts>('DisplayedDateSwitcher');

    function navigateTo(
        type: 'add' | 'subtract',
        unit: dayjs.OpUnitType
    ) {
        // @ts-ignore
        const display = comp.state[displayProp]![type](1, unit);

        // @ts-ignore
        comp.setState({
            [displayProp]: display,
        });

        if (initOpts.inited) {
            initOpts.get().onDisplayDateChange(display);
        }
    }

    return {
        init: initOpts.init,

        goBackwardYear() {
            navigateTo('subtract', 'year');
        },

        goForwardYear() {
            navigateTo('add', 'year');
        },

        goBackwardMonth() {
            navigateTo('subtract', 'month');
        },

        goForwardMonth() {
            navigateTo('add', 'month');
        }
    };
}
