import * as React from 'react'

import wrapDemoComp from '../utils/wrapDemoComp'

import _Dialog from '../composedComps/Dialog'
const Dialog = wrapDemoComp(_Dialog)

const DialogDemo = () => {
    return <div className="demo-block dialog-demo-block">
        {/* ===== 0 basic ===== */}
        <Dialog
            headline="弹窗标题"
            size="md"
        >
            弹窗内容
        </Dialog>
    </div>
}

DialogDemo.wrapName = 'DialogDemo'

export default DialogDemo
