import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import {Icon} from '@befe/brick'

import {
    SvgBell,
    SvgSearch,
} from '@befe/brick-icon';

// import {Input as OriginInput} from '@befe/brick'
// const Input = wrapDemoComp(OriginInput)

import OriginComposedInput from '../composedComps/ComposedInput'
const ComposedInput = wrapDemoComp(OriginComposedInput)

const InputDemo = () => {

    // const getInputWithFix = ({prefix = null, suffix = null} = {}) => {
    //     return <div className="control-wrap">
    //         <ComposedInput
    //             className="inline-block-demo"
    //             prefix={prefix}
    //             suffix={suffix}
    //         />
    //     </div>;
    // }

    return <div className="demo-block input-demo-block">
        {/* ===== 0 basic ===== */}
        <div>
            <ComposedInput
                // onChange={() => {}}
                className="inline-block-demo"
                value={'内容'}
                placeholder={'占位符'}
            />
            <ComposedInput
                // onChange={() => {}}
                className="inline-block-demo"
                value={'内容'}
                placeholder={'占位符'}
                status="error"
            />
            <ComposedInput
                // onChange={() => {}}
                className="inline-block-demo"
                value={'内容'}
                placeholder={'占位符'}
                disabled={true}
                type={'number'}
            />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 1 size ??? 似乎未生效 ===== */}
        {/* ===== 2 前缀和后缀 ===== */}
        <ComposedInput
            className="inline-block-demo"
            textPrefix={'这是前缀'}
        />
        <ComposedInput
            className="inline-block-demo"
            textSuffix={'这是后缀'}
        />
        <ComposedInput
            className="inline-block-demo"
            iconPrefix={'SvgBell'}
        />
        <ComposedInput
            className="inline-block-demo"
            iconSuffix={'SvgSearch'}
        />
        <ComposedInput
            className="inline-block-demo"
            iconPrefix={'SvgBell'}
            iconSuffix={'SvgSearch'}
        />
        <Divider className="demo-block-separator" />

    </div>
}

export default InputDemo
