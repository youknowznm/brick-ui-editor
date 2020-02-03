import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import {Dialog} from '../localBrickComps/Dialog'

// import {Dialog as OriginDialog} from '../localBrickComps/Dialog'
// const Dialog = wrapDemoComp(OriginDialog)

const DialogDemo = () => {
    return <div className="demo-block dialog-demo-block">
        {/* ===== 0 basic ===== */}
        <Dialog
            headline="弹窗"
            type="error"
            visible={true}
            // portalContainer={() => document.querySelector('.dialog-demo-block')}
        >
            dialog-content操你妈
        </Dialog>
        {/* ===== 1 size ===== */}
    </div>
}

export default DialogDemo
