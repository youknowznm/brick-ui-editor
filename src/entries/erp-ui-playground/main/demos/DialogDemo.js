import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

// import {Dialog} from '../localBrickComps/Dialog'

import {Dialog as OriginDialog} from '../localBrickComps/Dialog'
const Dialog = wrapDemoComp(OriginDialog)

const DialogDemo = () => {
    return <div className="demo-block dialog-demo-block">
        {/* ===== 0 basic ===== */}
        <Dialog
            headline="弹窗"
            type="error"
            // size="xl"
            height="md"
            visible={true}
            // portalContainer={() => document.querySelector('.dialog-demo-block')}
        >
            弹窗内容 弹窗内容 弹窗内容 弹窗内容 弹窗内容 弹窗内容
        </Dialog>
    </div>
}

export default DialogDemo
