import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import _DatePicker from '../composedComps/DatePicker.js'
const DatePicker = wrapDemoComp(_DatePicker)

const DatePickerDemo = () => {
    return <div className="demo-block date-picker-demo-block">
        {/* ===== 0 basic ===== */}
        <div>
            <h3 className="demo-type-desc inline">普通</h3>
            <DatePicker
                defaultValue={new Date(2019, 7)}
            />
        </div>
        <div>
            <h3 className="demo-type-desc inline">月份</h3>
            <DatePicker
                mode={'month'}
                defaultValue={new Date(2019, 7)}
            />
        </div>
        <div>
            <h3 className="demo-type-desc inline">季度</h3>
            <DatePicker
                mode={'quarter'}
                defaultValue={new Date(2019, 7)}
            />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 1 disabled & error ===== */}
        <div>
            <h3 className="demo-type-desc inline">禁用</h3>
            <DatePicker
                disabled={true}
                defaultValue={new Date(2020, 1)}
                getDisabledItem={(date, today) => date < today.subtract(4, 'day')}
            />
        </div>
        <Divider className="demo-block-separator" />
        <div>
            <h3 className="demo-type-desc inline">错误</h3>
            <DatePicker
                status="error"
                defaultValue={new Date(2020, 1)}
                getDisabledItem={(date, today) => date < today.subtract(4, 'day')}
            />
        </div>
        <Divider className="demo-block-separator" />
    </div>
}

DatePickerDemo.wrapName = 'DatePickerDemo'

export default DatePickerDemo
