import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import _Input from '../composedComps/Input'
const Input = wrapDemoComp(_Input)

const InputDemo = () => {

    // const getInputWithFix = ({prefix = null, suffix = null} = {}) => {
    //     return <div className="control-wrap">
    //         <Input
    //             prefix={prefix}
    //             suffix={suffix}
    //         />
    //     </div>;
    // }

    return <div className="demo-block input-demo-block">
        {/* ===== 0 basic ===== */}
        <div>
            <Input
                value={'内容'}
                placeholder={'占位符'}
            />
            <Input
                value={'内容'}
                placeholder={'占位符'}
                status="error"
            />
            <Input
                value={'内容'}
                placeholder={'占位符'}
                disabled={true}
            />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 1 size ??? 似乎未生效 ===== */}
        {/* ===== 2 前缀和后缀 ===== */}
        <Input
            textPrefix={'这是前缀'}
        />
        <Input
            textSuffix={'这是后缀'}
        />
        <Input
            iconPrefix={'SvgBell'}
        />
        <Input
            iconSuffix={'SvgSearch'}
        />
        <Input
            iconPrefix={'SvgBell'}
            iconSuffix={'SvgSearch'}
        />
        <Divider className="demo-block-separator" />

    </div>
}

export default InputDemo
