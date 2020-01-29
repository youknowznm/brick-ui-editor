import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../components/wrapDemoComp'

import {Radio, RadioGroup} from '@befe/brick'

// import {Radio as OriginRadio} from '@befe/brick'
//
// const Radio = wrapDemoComp(OriginRadio)

const RadioDemo = () => {

    const checked = true;
    const options = [
        {value: 'item_1', label: 'item-1'},
        {value: 'item_2', label: 'item-2'},
        {value: 'item_3', label: 'item-3'},
    ]
    const value = ['item_1']


    return <div className="demo-block radio-demo-block">
        {/* ===== 0 basic ===== */}
        <div>
            <Radio checked={checked}>good</Radio>
            <Radio disabled>not good</Radio>
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 1 radio-group ===== */}
        <div>
            <RadioGroup value={value} options={options} />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 2 intensive ===== */}
        <div>
            <RadioGroup value={value} options={options} type={'intensive'} />
        </div>

    </div>
}

export default RadioDemo
