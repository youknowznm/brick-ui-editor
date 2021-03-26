import {InnerRangePicker} from '../inner-range-picker';
import * as React from 'react';
import {handleUserInputChange} from '../handle-user-input-change';

const ITEM_FORMAT_PROP = 'computedItemFormat';

export function createUserInput(
    comp: InnerRangePicker,
    opts: {
        isInputProp: 'isStartUserInput' | 'isEndUserInput'
        inputValueProp: 'startUserInputText' | 'endUserInputText'
        valueProp: 'startValue' | 'endValue'
        displayedProp: 'startDisplayedDate' | 'endDisplayedDate'
    }
) {
    function getDisplayedValue() {
        const value = comp.state[opts.valueProp];
        return value ? value.format(comp[ITEM_FORMAT_PROP]) : '';
    }

    return {
        getValue() {
            if (comp.state[opts.isInputProp]) {
                return comp.state[opts.inputValueProp];
            }
            return getDisplayedValue();
        },
        startInput() {
            // @ts-ignore
            comp.setState({
                open: true,
                [opts.isInputProp]: true,
            });
        },
        endInput() {
            // @ts-ignore
            comp.setState({
                [opts.isInputProp]: false,
                [opts.inputValueProp]: getDisplayedValue(),
            });
        },
        handleChange(e: React.ChangeEvent) {
            const {
                displayedProp,
                valueProp,
                inputValueProp: inputTextProp
            } = opts;

            handleUserInputChange({
                e,
                comp,

                valueProp,
                itemFormatProp: ITEM_FORMAT_PROP,
                displayedProp,
                inputTextProp,
            });
        },
        handleKeyDown(e: React.KeyboardEvent) {
            if (e.nativeEvent.code === 'Tab') {
                comp.setState({
                    open: false,
                });
            }
        }
    };
}
