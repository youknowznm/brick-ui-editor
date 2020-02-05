import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import {CheckboxGroup, GenericCheckboxGroupGroup} from '@befe/brick'

import OriginComposedCheckboxGroup from '../composedComps/ComposedCheckboxGroup'
const ComposedCheckboxGroup = wrapDemoComp(OriginComposedCheckboxGroup)

const CheckboxDemo = () => {

    return <div className="demo-block CheckboxGroup-demo-block">
        {/* ===== 0 basic ===== */}
        <div>
            <ComposedCheckboxGroup
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
            <ComposedCheckboxGroup
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
            <ComposedCheckboxGroup
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
            <ComposedCheckboxGroup
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

export default CheckboxDemo
