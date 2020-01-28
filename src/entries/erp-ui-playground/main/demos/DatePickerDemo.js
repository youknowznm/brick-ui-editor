import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../components/wrapDemoComp'

import {DatePicker, GenericDatePickerGroup} from '../components/_localDatePickerSrc'

// import {DatePicker as OriginDatePicker} from '@befe/brick'
//
// const DatePicker = wrapDemoComp(OriginDatePicker)

const DatePickerDemo = () => {

    return <div className="demo-block date-picker-demo-block">
        {/* ===== 0 basic ===== */}
        <div className="picker-wrap">
            <DatePicker
                defaultValue={new Date(2019, 7)}
            />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 1 disabled & error ===== */}
        <div className="picker-wrap">
            <DatePicker
                status="error"
                defaultValue={new Date(2020, 1)}
                getDisabledItem={(date, today) => date < today.subtract(4, 'day')}
            />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 2 month ===== */}
        <div className="picker-wrap">
            <DatePicker
                mode={'month'}
                defaultValue={new Date(2019, 7)}
            />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 3 quater ===== */}
        <div className="picker-wrap">
            <DatePicker
                mode={'quarter'}
                disabled={true}
                defaultValue={new Date(2019, 7)}
            />
        </div>

    </div>
}

export default DatePickerDemo
