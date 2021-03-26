import {InnerRangePicker} from './inner-range-picker';
import * as React from 'react';
import {InputWrapper} from '@befe/brick-comp-input';
import {SvgCalendar} from '@befe/brick-icon';
import {Icon} from '@befe/brick-comp-icon';
import {TypePickerStatus} from './prop-types';
import {createRef} from '../modules/create-ref';
import {createFocusHandler} from './range-input-utils/create-focus-handler';
import {createUserInput} from './range-input-utils/create-range-field-input';

export function createRangePickerUserInput(
    comp: InnerRangePicker
) {

    const context = {
        startFocusHandler: createFocusHandler(
            comp,
            'startFocus'
        ),
        endFocusHandler: createFocusHandler(
            comp,
            'endFocus'
        ),
        startInput: createUserInput(comp, {
            isInputProp: 'isStartUserInput',
            inputValueProp: 'startUserInputText',
            valueProp: 'startValue',
            displayedProp: 'startDisplayedDate',
        }),
        endInput: createUserInput(comp, {
            isInputProp: 'isEndUserInput',
            inputValueProp: 'endUserInputText',
            valueProp: 'endValue',
            displayedProp: 'endDisplayedDate',
        }),
        refInput: createRef<HTMLDivElement>(),
    };

    function isFocus() {
        const {startFocus, endFocus} = comp.state;
        return startFocus || endFocus;
    }

    function init() {
        context.startFocusHandler.init({
            onFocus: context.startInput.startInput,
            onBlur: context.startInput.endInput,
        });

        context.endFocusHandler.init({
            onFocus: context.endInput.startInput,
            onBlur: context.endInput.endInput,
        });
    }

    init();

    return {
        renderInput(opts: {
            status?: TypePickerStatus
            disabled?: boolean
        }) {
            const disabled = opts.disabled;

            return <InputWrapper
                suffix={<Icon svg={SvgCalendar}/>}
                focus={isFocus()}
                status={opts.status}
                disabled={disabled}
                refWrapper={context.refInput.ref}
            >
                <input type={'text'}
                       disabled={disabled}

                       placeholder={comp.props.startPlaceholder}
                       value={context.startInput.getValue()}

                       onChange={context.startInput.handleChange}
                       onKeyDown={context.startInput.handleKeyDown}
                       onFocus={context.startFocusHandler.handleFocus}
                       onBlur={context.startFocusHandler.handleBlur}
                />
                <span className={'brick-sep'}>～</span>
                <input type={'text'}
                       disabled={disabled}

                       placeholder={comp.props.endPlaceholder}
                       value={context.endInput.getValue()}

                       onChange={context.endInput.handleChange}
                       onKeyDown={context.endInput.handleKeyDown}
                       onFocus={context.endFocusHandler.handleFocus}
                       onBlur={context.endFocusHandler.handleBlur}
                />
            </InputWrapper>;
        },
        get inputElem(): HTMLDivElement | null {
            return context.refInput.elem;
        }
    };
}
