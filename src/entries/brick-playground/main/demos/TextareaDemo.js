import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import _Textarea from '../composedComps/Textarea'
const Textarea = wrapDemoComp(_Textarea)

const TextareaDemo = () => {

    const [value, setValue] = React.useState('文字')

    const handleChange = evt => {
        setValue(evt.target.value)
    }

    return <div className="demo-block switch-demo-block">
        {/* ===== 0 basic ===== */}
        <div>
            <div className="textarea-wrap">
                <h3 className="demo-type-desc inline">普通</h3>
                <Textarea defaultValue={'overflow'} maxLength={5} />
            </div>
            <div className="textarea-wrap">
                <h3 className="demo-type-desc inline">禁用</h3>
                <Textarea placeholder={'请描述'} disabled />
            </div>
            <div className="textarea-wrap">
                <h3 className="demo-type-desc inline">错误</h3>
                <Textarea defaultValue={'invalid'} maxLength={10} status={'error'} />
            </div>
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 1 size ===== */}
        <h3 className="demo-type-desc inline">尺寸</h3>
        <div>
            <div className="textarea-wrap">
                <Textarea size={'sm'} placeholder={'sm'} rows={2} />
            </div>
            <div className="textarea-wrap">
                <Textarea size={'md'} placeholder={'md'} rows={2} />
            </div>
        </div>
        <Divider className="demo-block-separator" />
    </div>
}

TextareaDemo.wrapName = 'TextareaDemo'

export default TextareaDemo
