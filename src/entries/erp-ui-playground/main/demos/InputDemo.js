import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../components/wrapDemoComp'

import {Input} from '@befe/brick'
import {Icon} from '@befe/brick'

import {
    SvgBell,
    SvgSearch,
} from '@befe/brick-icon';

// import {Input as OriginInput} from '@befe/brick'
//
// const Input = wrapDemoComp(OriginInput)

const InputDemo = () => {

    const getInputWithFix = ({prefix = null, suffix = null} = {}) => {
        return <div className="control-wrap">
            <Input
                className="input-demo"
                prefix={prefix}
                suffix={suffix}
            />
        </div>;
    }

    return <div className="demo-block input-demo-block">
        {/* ===== 0 basic ===== */}
        <div>
            <Input className="input-demo" value={'内容'} placeholder={'占位符'} />
            <Input className="input-demo" value={'内容'} placeholder={'占位符'} status="error" />
            <Input className="input-demo" value={'内容'} placeholder={'占位符'} disabled />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 1 size ??? 似乎未生效 ===== */}
        {/* ===== 2 前缀和后缀 ===== */}
        {getInputWithFix({prefix: '这是前缀'})}
        {getInputWithFix({suffix: '这是后缀'})}
        {getInputWithFix({prefix: <Icon svg={SvgBell}/>})}
        {getInputWithFix({suffix: <Icon svg={SvgSearch}/>})}
        {getInputWithFix({prefix: <Icon svg={SvgBell}/>, suffix: <Icon svg={SvgSearch}/>})}
        <Divider className="demo-block-separator" />

    </div>
}

export default InputDemo
