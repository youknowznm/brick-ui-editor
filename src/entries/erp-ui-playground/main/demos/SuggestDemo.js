import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../components/wrapDemoComp'

import {Suggest} from '@befe/brick'

// import {Suggest as OriginSuggest} from '@befe/brick'
//
// const Suggest = wrapDemoComp(OriginSuggest)

const SuggestDemo = () => {

    const getOptions = (inputValue) => {
        return [
            {
                id: 'group_1',
                label: 'group_1',
                children: [
                    {id: 'option_2', label: inputValue},
                    {id: 'option_3', label: 'option_3'},
                ]
            },
            {id: 'option_4', label: 'option_4', disabled: true},
            {id: 'option_5', label: 'option_5'},
            {
                id: 'group_2',
                label: 'group_2',
                children: [
                    {id: 'option_7', label: 'option_7'},
                    {id: 'option_8', label: 'option_8'},
                ]
            },
        ]
    }

    const handleFetch = (inputValue) => new Promise((resolve) => {
        setTimeout(() => {
            resolve(inputValue && inputValue.length < 7 ? getOptions(inputValue) : [])
            // resolve([])
        }, 500)
    })

    return <div className="demo-block suggset-demo-block">
        {/* ===== 0 basic ===== */}
        <div>
            <Suggest
                className="inline-block-demo"
                onSearch={handleFetch}
                value="option_2"
                // onChange={setValue}
                placeholder={'7个字无结果'}
            />
        </div>
        {/* ===== 1 disabled ===== */}
        <div>
            <Suggest
                className="inline-block-demo"
                onSearch={handleFetch}
                value="option_2"
                // onChange={setValue}
                disabled={true}
                placeholder={'7个字无结果'}
            />
        </div>
        <Divider className="demo-block-separator" />

    </div>
}

export default SuggestDemo
