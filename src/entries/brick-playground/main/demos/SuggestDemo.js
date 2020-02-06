import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import OriginComposedSuggest from "../composedComps/ComposedSuggest";
const ComposedSuggest = wrapDemoComp(OriginComposedSuggest)

const SuggestDemo = () => {

    // const getOptions = (inputValue) => {
    //     return [
    //         {
    //             id: 'group_1',
    //             label: 'group_1',
    //             children: [
    //                 {id: 'option_2', label: inputValue},
    //                 {id: 'option_3', label: 'option_3'},
    //             ]
    //         },
    //         {id: 'option_4', label: 'option_4', disabled: true},
    //         {id: 'option_5', label: 'option_5'},
    //         {
    //             id: 'group_2',
    //             label: 'group_2',
    //             children: [
    //                 {id: 'option_7', label: 'option_7'},
    //                 {id: 'option_8', label: 'option_8'},
    //             ]
    //         },
    //     ]
    // }

    const optionProps = {
        menuItems: [
            {id: 'option_1', label: 'option_1'},
            {id: 'option_2', label: 'option_2'},
            {id: 'option_3', label: 'option_3'},
        ],
        group1Label: '分类 1',
        group1MenuItems: [
            {id: 'option_11', label: 'option_11'},
            {id: 'option_12', label: 'option_12', disabled: true},
        ],
        group2Label: '分类 2',
        group2MenuItems: [
            {id: 'option_21', label: 'option_21'},
            {id: 'option_22', label: 'option_22', disabled: true},
        ],
        group3Label: '分类 3',
        group3MenuItems: [
            {id: 'option_31', label: 'option_31'},
            {id: 'option_32', label: 'option_32', disabled: true},
        ],
    }

    // const handleFetch = (inputValue) => new Promise((resolve) => {
    //     setTimeout(() => {
    //         resolve(inputValue && inputValue.length < 7 ? getOptions(inputValue) : [])
    //         // resolve([])
    //     }, 500)
    // })

    return <div className="demo-block suggset-demo-block">
        {/* ===== 0 basic ===== */}
        <ComposedSuggest
            placeholder={'请输入'}
            {...optionProps}
        />
        {/* ===== 1 disabled ===== */}
        <ComposedSuggest
            placeholder={'请输入'}
            disabled={true}
            {...optionProps}
        />
        <Divider className="demo-block-separator" />

    </div>
}

export default SuggestDemo
