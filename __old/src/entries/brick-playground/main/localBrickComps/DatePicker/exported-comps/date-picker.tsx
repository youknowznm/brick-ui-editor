/**
 * @file date-picker
 * @author zhengliangliang
 * @owner zhengliangliang:2019-12-02
 */
import * as React from 'react';
// import * as PropTypes from 'prop-types'
import {isObjectNestedEquals, wrapCompWithSCU} from '@befe/brick-utils';
import {IDatePickerProps, InnerDatePicker} from '../inner-comps/inner-date-picker';


export const DatePicker = wrapCompWithSCU(
    InnerDatePicker,
    function (this: JSX.Element, nextProps: IDatePickerProps) {
        return !isObjectNestedEquals(
            this.props,
            nextProps,
            {
                style: null,
                popupStyle: null
            }
        );
    }
);
