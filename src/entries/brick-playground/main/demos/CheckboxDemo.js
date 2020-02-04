import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import {Checkbox} from '@befe/brick'

import {GenericCheckboxGroup as OriginGenericCheckboxGroup} from '@befe/brick'
const GenericCheckboxGroup = wrapDemoComp(OriginGenericCheckboxGroup)

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
            <Checkbox checked={checked}>item-1</Checkbox>
            <Checkbox checked={false}>item-2</Checkbox>
            <Checkbox disabled>item-3</Checkbox>
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 2 intermidiate ===== */}
        <div>
            <Checkbox indeterminate={true} checked={false}>item-1</Checkbox>
            <Checkbox checked={false}>item-2</Checkbox>
            <Checkbox disabled>item-3</Checkbox>
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 3 intensive ===== */}
        <div>
            <GenericCheckboxGroup
                type={'intensive'}
                defaultValue={[value]}
                options={options}
            />
        </div>

    </div>
}

export default CheckboxDemo
