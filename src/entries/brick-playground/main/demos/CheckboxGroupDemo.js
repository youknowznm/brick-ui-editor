import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import _CheckboxGroup from '../composedComps/CheckboxGroup'
const CheckboxGroup = wrapDemoComp(_CheckboxGroup)

const CheckboxDemo = () => {

    return <div className="demo-block checkbox-group-demo-block">
        {/* ===== 0 basic ===== */}
        <h3 className="demo-type-desc">普通</h3>
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
            <CheckboxGroup
                defaultValue={['item_1']}
                size={'md'}
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
        <h3 className="demo-type-desc">部分选中</h3>
        <div>
            <CheckboxGroup
                defaultValue={['item_1']}
                options={[
                    {value: 'item_1', label: 'item-1', indeterminate: true},
                    {value: 'item_2', label: 'item-2', disabled: true},
                    {value: 'item_3', label: 'item-3'},
                    {value: 'item_4', label: 'item-4'},
                ]}
            />
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
        <h3 className="demo-type-desc">强调</h3>
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
        <Divider className="demo-block-separator" />
    </div>
}

CheckboxDemo.wrapName = 'CheckboxDemo'

export default CheckboxDemo
