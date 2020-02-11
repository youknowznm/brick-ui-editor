import * as React from 'react'

import wrapDemoComp from '../utils/wrapDemoComp'

import _PopoverConfirm from '../composedComps/PopoverConfirm.js'
const PopoverConfirm = wrapDemoComp(_PopoverConfirm)

const PopoverConfirmDemo = () => {

    const headline = '标题'
    const content = '请再次确认要进行操作'
    const btnType = {
        info: 'primary'
    }

    const types = ['info', 'success', 'warning', 'error']
    const renderTypePopover = (type) => (
        <PopoverConfirm
            key={type}
            confirmMessage={content}
            confirmType={type}
            btnType="intensive"
            btnColor={btnType[type] || type}
            btnContent={type}
        />
    )

    return <div className="demo-block popover-confirm-demo-block">
        {/* ===== 1 confirm ===== */}
        <div className="">
            <PopoverConfirm
                confirmMessage="这是一段确认信息"
                btnContent="简单"
            />
            <PopoverConfirm
                confirmMessage="这是一段确认信息"
                confirmType={null}
                confirmHeadline={headline}
                btnContent="带标题"
            />
            {types.map(renderTypePopover)}
        </div>
    </div>
}

export default PopoverConfirmDemo