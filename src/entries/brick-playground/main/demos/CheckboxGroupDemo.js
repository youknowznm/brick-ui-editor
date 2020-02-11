import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import _CheckboxGroup from '../composedComps/CheckboxGroup'
const CheckboxGroup = wrapDemoComp(_CheckboxGroup)

const CheckboxDemo = () => {

    return <div className="demo-block checkbox-group-demo-block">
        {/* ===== 0 basic ===== */}
        <div>
            <CheckboxGroup
                defaultValue={['item_1']}
                options={[
                    {value: 'item_1', label: 'item-1', checked: true},
                    {value: 'item_2', label: 'item-2', disabled: true},
                    {value: 'item_3', label: 'item-3'},
                    {value: 'item_4', label: 'item-4'},
                ]}
            />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 2 intermidiate ===== */}
        <div>
            <CheckboxGroup
                defaultValue={['item_1']}
                size={'md'}
                options={[
                    {value: 'item_1', label: 'item-1', indeterminate: true},
                    {value: 'item_2', label: 'item-2', disabled: true},
                    {value: 'item_3', label: 'item-3'},
                    {value: 'item_4', label: 'item-4'},
                ]}
            />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 3 intensive ===== */}
        <div>
            <CheckboxGroup
                type={'intensive'}
                defaultValue={['item_1']}
                options={[
                    {value: 'item_1', label: 'item-1', checked: true},
                    {value: 'item_2', label: 'item-2', },
                    {value: 'item_3', label: 'item-3'},
                    {value: 'item_4', label: 'item-4'},
                ]}
            />
        </div>
        {/* ===== 4 large ===== */}
        <Divider className="demo-block-separator" />
        <div>
            <CheckboxGroup
                type={'intensive'}
                size={'md'}
                defaultValue={['item_1']}
                options={[
                    {value: 'item_1', label: 'item-1', checked: true},
                    {value: 'item_2', label: 'item-2', },
                    {value: 'item_3', label: 'item-3'},
                    {value: 'item_4', label: 'item-4'},
                ]}
            />
        </div>
    </div>
}

CheckboxDemo.wrapName = 'CheckboxDemo'

export default CheckboxDemo
