import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import {Button} from '@befe/brick'

import OriginComposedPopover from '../composedComps/ComposedPopover'
import OriginComposedPopoverConfirm from '../composedComps/ComposedPopoverConfirm'

const ComposedPopover = wrapDemoComp(OriginComposedPopover)
const ComposedPopoverConfirm = wrapDemoComp(OriginComposedPopoverConfirm)

const PopoverDemo = () => {

    const placements = [
        ['top-start', 'top', 'top-end'],
        ['left-start', '', '', 'right-start'],
        ['left', '', '', 'right'],
        ['left-end', '', '', 'right-end'],
        ['bottom-start', 'bottom', 'bottom-end'],
    ];

    const renderPlacement = (placement, idx) => {
        return (
            <div className={'trigger-wrap'} key={idx}>
                {placement ? (
                    <ComposedPopover
                        placement={placement}
                        content="内容"
                        btnContent={placement}
                    />
                ) : null}
            </div>
        )
    }

    const headline = '标题'
    const content = '请再次确认要进行操作'
    const btnType = {
        info: 'primary'
    }

    const types = ['info', 'success', 'warning', 'error']
    const renderTypePopover = (type) => (
        <ComposedPopoverConfirm
            key={type}
            confirmMessage={content}
            confirmType={type}
            btnType="intensive"
            btnColor={btnType[type] || type}
            btnContent={type}
        />
    )

    return <div className="demo-block popover-demo-block">
        {/* ===== 0 basic ===== */}
        <div className="section-basic">
            {placements.map((row, rowIdx) => (
                <div key={rowIdx} className={'trigger-row'}>
                    {row.map(renderPlacement)}
                </div>
            ))}
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 1 confirm ===== */}
        <div className="">
            <ComposedPopoverConfirm
                confirmMessage="这是一段确认信息"
                btnContent="简单"
            />
            <ComposedPopoverConfirm
                confirmMessage="这是一段确认信息"
                confirmType={null}
                confirmHeadline={headline}
                btnContent="带标题"
            />
            {types.map(renderTypePopover)}
        </div>
    </div>
}

export default PopoverDemo
