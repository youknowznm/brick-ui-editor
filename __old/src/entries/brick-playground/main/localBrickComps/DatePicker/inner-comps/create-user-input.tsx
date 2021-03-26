import {Icon} from '@befe/brick-comp-icon';
import {SvgCalendar} from '@befe/brick-icon';
import {Input} from '@befe/brick-comp-input';
import * as React from 'react';
import {createRef} from '../modules/create-ref';
import {InnerDatePicker} from './inner-date-picker';
import {handleUserInputChange} from './handle-user-input-change';

export function createDatePickerUserInput(
    comp: InnerDatePicker
) {
    const inputRef = createRef<Input>();

    function getInputValue() {
        if (comp.state.isUserInput) {
            return comp.state.userInputText;
        }

        const value = comp.state.value;
        return value ? value.format(comp.computedItemFormat) : '';
    }

    function renderSuffix() {
        return <Icon
            svg={SvgCalendar}
            onClick={comp.handleCalendarIconClick}
        />;
    }

    function startUserInput() {
        comp.setState({
            open: true,
            isUserInput: true,
            isZooming: false,
            userInputText: getInputValue(),
        });

        comp.checkOpenStatus({
            open: true,
            isUserInput: true
        });

        inputRef.elem!.elemInput.select();
    }

    function completeUserInput() {
        comp.setState({
            isUserInput: false,
        });

        comp.checkOpenStatus({
            isUserInput: false
        });
    }

    function handleChange(e: React.ChangeEvent) {
        handleUserInputChange({
            e,
            comp,

            itemFormatProp: 'computedItemFormat',
            valueProp: 'value',
            displayedProp: 'displayedDate',
            inputTextProp: 'userInputText'
        });
    }

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.nativeEvent.code === 'Tab') {
            comp.setState({
                open: false,
            });
            comp.checkOpenStatus({
                open: false,
            });
        }
    }

    return {

        renderInput() {
            const {
                placeholder,
                status,
                disabled
            } = comp.props;

            return <Input
                ref={inputRef.ref}
                value={getInputValue()}
                disabled={disabled}
                status={status}
                suffix={renderSuffix()}
                placeholder={placeholder}

                onFocus={startUserInput}
                onBlur={completeUserInput}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
            />;
        },

        get inputElem() {
            return inputRef.elem ? inputRef.elem.elemInput : undefined;
        }
    };
}
