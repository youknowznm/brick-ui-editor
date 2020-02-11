import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import _DatePicker from '../composedComps/DatePicker.js'
const DatePicker = wrapDemoComp(_DatePicker)

const DatePickerDemo = () => {
    return <div className="demo-block date-picker-demo-block">
        {/* ===== 0 basic ===== */}
        <DatePicker
            defaultValue={new Date(2019, 7)}
        />
        <Divider className="demo-block-separator" />
        {/* ===== 1 disabled & error ===== */}
        <DatePicker
            disabled={true}
            // status="error"
            defaultValue={new Date(2020, 1)}
            getDisabledItem={(date, today) => date < today.subtract(4, 'day')}
        />
        <Divider className="demo-block-separator" />
        {/* ===== 2 month ===== */}
        <DatePicker
            mode={'month'}
            defaultValue={new Date(2019, 7)}
        />
        <Divider className="demo-block-separator" />
        {/* ===== 3 quater ===== */}
        <DatePicker
            mode={'quarter'}
            // disabled={true}
            defaultValue={new Date(2019, 7)}
        />
    </div>
}

DatePickerDemo.wrapName = 'DatePickerDemo'

export default DatePickerDemo
