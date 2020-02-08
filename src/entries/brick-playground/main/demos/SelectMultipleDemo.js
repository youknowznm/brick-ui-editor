import * as React from 'react'

import wrapDemoComp from '../utils/wrapDemoComp'

import {
    ComposedSelectMultiple as _SelectMultiple
} from "../composedComps/Select";
const SelectMultiple = wrapDemoComp(_SelectMultiple)

const SelectMultipleDemo = () => {

    const sizeList = ['xs', 'sm', 'md', 'lg']

    const renderSelectBySize = size => {
        return (
            <div key={size}>
                <SelectMultiple
                    placeholder={'请选择'}
                    size={size}
                    {...optionProps}
                />
            </div>
        )
    }

    const optionProps = {
        menuItems: [
            {value: 'option_1', label: 'option_1'},
            {value: 'option_2', label: 'option_2'},
            {value: 'option_3', label: 'option_3'},
        ],
        group1Label: '分类 1',
        group1MenuItems: [
            {value: 'option_11', label: 'option_11'},
            {value: 'option_12', label: 'option_12', disabled: true},
        ],
        group2Label: '分类 2',
        group2MenuItems: [
            {value: 'option_21', label: 'option_21'},
            {value: 'option_22', label: 'option_22', disabled: true},
        ],
        group3Label: '分类 3',
        group3MenuItems: [
            {value: 'option_31', label: 'option_31'},
            {value: 'option_32', label: 'option_32', disabled: true},
        ],
    }

    return <div className="demo-block select-demo-block">
        <div>
            {sizeList.map(renderSelectBySize)}
        </div>
    </div>
}

export default SelectMultipleDemo
