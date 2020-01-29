import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import {Checkbox, GenericCheckboxGroup} from '@befe/brick'

// import {Checkbox as OriginCheckbox} from '@befe/brick'
//
// const Checkbox = wrapDemoComp(OriginCheckbox)

const CheckboxDemo = () => {

    const checked = true;
    const options = [
        {value: 'item_1', label: 'item-1'},
        {value: 'item_2', label: 'item-2'},
        {value: 'item_3', label: 'item-3'},
    ]
    const value = 'item_1'


    return <div className="demo-block checkbox-demo-block">
        {/* ===== 0 basic ===== */}
        <div>
            <Checkbox checked={checked}>Apple</Checkbox>
            <Checkbox checked={false}>Banana</Checkbox>
            <Checkbox disabled>Orange</Checkbox>
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 2 intermidiate ===== */}
        <div>
            <Checkbox indeterminate={true} checked={false}>Apple</Checkbox>
            <Checkbox checked={false}>Banana</Checkbox>
            <Checkbox disabled>Orange</Checkbox>
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 3 intensive ===== */}
        <div>
            <GenericCheckboxGroup
                type={'intensive'}
                defaultValue={[value]}
                options={options}
                onChange={() => {}}
            />
        </div>

    </div>
}

export default CheckboxDemo
