import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import {Dialog as OriginDialog} from '@befe/brick'
import {SvgEdit, SvgGear} from '@befe/brick-icon'

const Dialog = wrapDemoComp(OriginDialog)

const DialogDemo = () => {
    const portalContainer = document.querySelector('.dialog-demo-block')
    return <div className="demo-block dialog-demo-block">
        {/* ===== 0 basic ===== */}
        <Dialog
            headline="弹窗"
            type="error"
            visible={true}
            portalContainer={portalContainer}
        >
            <p>dialog-content</p>
        </Dialog>
        {/* ===== 1 size ===== */}
    </div>
}

export default DialogDemo
