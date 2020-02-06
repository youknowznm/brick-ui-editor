import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

// import {Textarea} from '@befe/brick'

// import {Textarea as OriginTextarea} from '@befe/brick'
// const Textarea = wrapDemoComp(OriginTextarea)

import OriginComposedTextarea from '../composedComps/ComposedTextarea'
const ComposedTextarea = wrapDemoComp(OriginComposedTextarea)

const TextareaDemo = () => {

    const [value, setValue] = React.useState('文字')

    const handleChange = evt => {
        setValue(evt.target.value)
    }

    return <div className="demo-block switch-demo-block">
        {/* ===== 0 basic ===== */}
        <div>
            <div className="control-wrap">
                <ComposedTextarea
                    className="inline-block-demo"
                    value={value}
                    onChange={handleChange}
                    placeholder={'leave description please'}
                    maxLength={100}
                />
            </div>
            <div className="control-wrap">
                <ComposedTextarea className="inline-block-demo" defaultValue={'overflow'} maxLength={5} />
            </div>
            <div className="control-wrap">
                <ComposedTextarea className="inline-block-demo" defaultValue={'invalid'} maxLength={10} status={'error'} />
            </div>
        </div>
        <div>
            <div className="control-wrap">
                <ComposedTextarea className="inline-block-demo" defaultValue={'这是一段描述'} disabled />
            </div>
            <div className="control-wrap">
                <ComposedTextarea className="inline-block-demo" placeholder={'请描述'} disabled />
            </div>
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 1 size ===== */}
        <div>
            <div className="control-wrap">
                <ComposedTextarea className="inline-block-demo" size={'sm'} placeholder={'sm'} rows={2} />
            </div>
            <div className="control-wrap">
                <ComposedTextarea className="inline-block-demo" size={'md'} placeholder={'md'} rows={2} />
            </div>
        </div>
    </div>
}

export default TextareaDemo
