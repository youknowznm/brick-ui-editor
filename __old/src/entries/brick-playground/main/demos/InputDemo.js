import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import _Input from '../composedComps/Input'
const Input = wrapDemoComp(_Input)

const InputDemo = () => {

    return <div className="demo-block input-demo-block">
        {/* ===== 0 basic ===== */}
        <div>
            <h3 className="demo-type-desc inline">普通</h3>
            <Input
                value={'内容'}
                placeholder={'占位符'}
            />
        </div>
        <div>
            <h3 className="demo-type-desc inline">禁用</h3>
            <Input
                value={'内容'}
                placeholder={'占位符'}
                disabled={true}
            />
        </div>
        <div>
            <h3 className="demo-type-desc inline">错误</h3>
            <Input
                value={'内容'}
                placeholder={'占位符'}
                status="error"
            />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 1 size ??? 似乎未生效 ===== */}
        {/* ===== 2 前缀和后缀 ===== */}
        <h3 className="demo-type-desc">前缀/后缀</h3>
        <div>
            <Input
                textPrefix={'文字前缀'}
            />
        </div>
        <div>
            <Input
                textSuffix={'文字后缀'}
            />
        </div>
        <div>
            <Input
                iconPrefix={'SvgBell'}
            />
        </div>
        <div>
            <Input
                iconSuffix={'SvgSearch'}
            />
        </div>
        <div>
            <Input
                iconPrefix={'SvgBell'}
                iconSuffix={'SvgSearch'}
            />
        </div>
        <Divider className="demo-block-separator" />
    </div>
}

InputDemo.wrapName = 'InputDemo'

export default InputDemo
