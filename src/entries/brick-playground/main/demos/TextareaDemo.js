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
                <Textarea
                    value={value}
                    onChange={handleChange}
                    placeholder={'leave description please'}
                    maxLength={100}
                />
            </div>
            <div className="textarea-wrap">
                <Textarea defaultValue={'overflow'} maxLength={5} />
            </div>
            <div className="textarea-wrap">
                <Textarea defaultValue={'invalid'} maxLength={10} status={'error'} />
            </div>
        </div>
        <div>
            <div className="textarea-wrap">
                <Textarea defaultValue={'这是一段描述'} disabled />
            </div>
            <div className="textarea-wrap">
                <Textarea placeholder={'请描述'} disabled />
            </div>
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 1 size ===== */}
        <div>
            <div className="textarea-wrap">
                <Textarea size={'sm'} placeholder={'sm'} rows={2} />
            </div>
            <div className="textarea-wrap">
                <Textarea size={'md'} placeholder={'md'} rows={2} />
            </div>
        </div>
    </div>
}

export default TextareaDemo
