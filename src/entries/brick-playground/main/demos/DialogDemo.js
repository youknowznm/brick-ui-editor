import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import _Dialog from '../composedComps/Dialog'
const Dialog = wrapDemoComp(_Dialog)

const DialogDemo = () => {
    return <div className="demo-block dialog-demo-block">
        {/* ===== 0 basic ===== */}
        <Dialog
            headline="弹窗标题"
        >
            弹窗内容
        </Dialog>
    </div>
}

export default DialogDemo
