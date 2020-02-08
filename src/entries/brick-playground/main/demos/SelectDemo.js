import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import {
    ComposedSelectSingle as _ComposedSelectSingle,
    ComposedSelectMultiple as _ComposedSelectMultiple
} from "../composedComps/ComposedSelect";

const ComposedSelectSingle = wrapDemoComp(_ComposedSelectSingle)
const ComposedSelectMultiple = wrapDemoComp(_ComposedSelectMultiple)

const SelectDemo = () => {

    // const options = [
    //     {value: 'option_1', label: 'option_1'},
    //     {
    //         value: 'group_1',
    //         label: '分类一',
    //         children: [
    //             {value: 'option_2', label: 'option_2'},
    //             {value: 'option_3', label: 'option_3'},
    //         ]
    //     },
    //     {value: 'option_4', label: 'option_4'},
    //     {value: 'option_5', label: 'option_5', disabled: true},
    //     {
    //         value: 'group_2',
    //         label: '分类二',
    //         children: [
    //             {value: 'option_7', label: 'option_7'},
    //             {value: 'option_8', label: 'option_8'},
    //         ]
    //     },
    // ]

    const sizeList = ['xs', 'sm', 'md', 'lg']

    const renderSelectBySize = size => {
        return (
            <div key={size}>
                <ComposedSelectSingle
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
        {/* ===== 0 basic ===== */}
        <ComposedSelectSingle
            placeholder={'请选择'}
            {...optionProps}
        />
        <Divider className="demo-block-separator" />
        {/* ===== 1 multiple ===== */}
        <ComposedSelectMultiple
            placeholder={'请选择'}
            {...optionProps}
        />
        <Divider className="demo-block-separator" />
        {/* ===== 2 size ===== */}
        <div>
            {sizeList.map(renderSelectBySize)}
        </div>
        <Divider className="demo-block-separator" />

    </div>
}

export default SelectDemo
