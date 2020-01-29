import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../components/wrapDemoComp'

import {Option, OptionGroup, Select} from '../localBrickComps'

// import {Select as OriginSelect} from '@befe/brick'
//
// const Select = wrapDemoComp(OriginSelect)

const SelectDemo = () => {

    const options = [
        {value: 'option_1', label: 'option_1'},
        {
            value: 'group_1',
            label: '分类一',
            children: [
                {value: 'option_2', label: 'option_2'},
                {value: 'option_3', label: 'option_3'},
            ]
        },
        {value: 'option_4', label: 'option_4'},
        {value: 'option_5', label: 'option_5', disabled: true},
        {
            value: 'group_2',
            label: '分类二',
            children: [
                {value: 'option_7', label: 'option_7'},
                {value: 'option_8', label: 'option_8'},
            ]
        },
    ]

    const sizeList = ['xs', 'sm', 'md', 'lg']

    const renderSelectBySize = size => {
        return (
            <div key={size}>
                <div className="control-wrap">
                    <Select className="inline-block-demo" size={size} placeholder={'请选择'}>
                        <Option value={'option_1'}>option-1</Option>
                        <Option value={'option_2'}>option-2</Option>
                        <OptionGroup label={'group-1'}>
                            <Option value={'option_3'}>option-3</Option>
                            <Option value={'option_4'}>option-4</Option>
                        </OptionGroup>
                    </Select>
                </div>
            </div>
        )
    }

    return <div className="demo-block select-demo-block">
        {/* ===== 0 basic ===== */}
        <div>
            <div className={'control-wrap'}>
                <Select className="inline-block-demo" options={options} placeholder={'请选择'} />
            </div>
            <div className={'control-wrap'}>
                <Select className="inline-block-demo" options={options} mode={'multiple'} />
            </div>
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 1 size ===== */}
        <div>
            {sizeList.map(renderSelectBySize)}
        </div>
        <Divider className="demo-block-separator" />

    </div>
}

export default SelectDemo
