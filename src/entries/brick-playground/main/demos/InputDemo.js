import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import _Input from '../composedComps/Input'
const Input = wrapDemoComp(_Input)

const InputDemo = () => {

    // const getInputWithFix = ({prefix = null, suffix = null} = {}) => {
    //     return <div className="control-wrap">
    //         <Input
    //             className="inline-block-demo"
    //             prefix={prefix}
    //             suffix={suffix}
    //         />
    //     </div>;
    // }

    return <div className="demo-block input-demo-block">
        {/* ===== 0 basic ===== */}
        <div>
            <Input
                // onChange={() => {}}
                className="inline-block-demo"
                value={'内容'}
                placeholder={'占位符'}
            />
            <Input
                // onChange={() => {}}
                className="inline-block-demo"
                value={'内容'}
                placeholder={'占位符'}
                status="error"
            />
            <Input
                // onChange={() => {}}
                className="inline-block-demo"
                value={'内容'}
                placeholder={'占位符'}
                disabled={true}
            />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 1 size ??? 似乎未生效 ===== */}
        {/* ===== 2 前缀和后缀 ===== */}
        <Input
            className="inline-block-demo"
            textPrefix={'这是前缀'}
        />
        <Input
            className="inline-block-demo"
            textSuffix={'这是后缀'}
        />
        <Input
            className="inline-block-demo"
            iconPrefix={'SvgBell'}
        />
        <Input
            className="inline-block-demo"
            iconSuffix={'SvgSearch'}
        />
        <Input
            className="inline-block-demo"
            iconPrefix={'SvgBell'}
            iconSuffix={'SvgSearch'}
        />
        <Divider className="demo-block-separator" />

    </div>
}

export default InputDemo
