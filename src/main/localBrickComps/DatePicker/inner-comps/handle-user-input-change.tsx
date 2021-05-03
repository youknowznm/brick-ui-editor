import * as React from 'react';
import {InnerDatePicker} from './inner-date-picker';
import {InnerRangePicker} from './inner-range-picker';
import dayjs from 'dayjs';

export function handleUserInputChange(
    {
        e,
        comp,

        itemFormatProp,
        valueProp,
        displayedProp,
        inputTextProp,
    }: {
        e: React.ChangeEvent
        comp: InnerDatePicker | InnerRangePicker

        itemFormatProp: 'computedItemFormat'
        valueProp: 'value' | 'startValue' | 'endValue'
        displayedProp: 'displayedDate' | 'startDisplayedDate' | 'endDisplayedDate'
        inputTextProp: 'userInputText' | 'startUserInputText' | 'endUserInputText'
    }
) {
    const text = (e.target as HTMLInputElement).value;
    const trimmedText = text.trim();

    // @todo:fix 需要改成对的
    // @ts-ignore
    const itemFormat = comp[itemFormatProp] || 'YYYY-MM-DD';
    const tryParsedDate = dayjs(trimmedText, itemFormat);

    // @ts-ignore
    let value = comp.state[valueProp];
    // @ts-ignore
    let displayedDate = comp.state[displayedProp];

    if (
        tryParsedDate.isValid()

        // @todo:review 考虑一下是否严格进行日期控制? 2019-11-1 到底合法不合法?
        // 是否必须要进行严格的合规性校验?
        // && tryParsedDate.format(itemFormat) === trimmedText
    ) {
        value = tryParsedDate;
        displayedDate = tryParsedDate;
    }

    if (!trimmedText) {
        value = null;
    }
    // @ts-ignore
    comp.setState({
        [inputTextProp]: trimmedText,
        [valueProp]: value,
        [displayedProp]: displayedDate,
    });
}
