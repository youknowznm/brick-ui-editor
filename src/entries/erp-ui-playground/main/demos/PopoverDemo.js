import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../components/wrapDemoComp'

import {Popover as OriginPopover, PopoverConfirm} from '../components/_localPopoverSrc'
// import {Popover as OriginPopover} from '@befe/brick'
import {Button} from '@befe/brick'

const Popover = wrapDemoComp(OriginPopover)

const PopoverDemo = () => {

    const wrap = document.querySelector('.popover-demo-block')

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
                    <Popover
                        placement={placement}
                        content="内容"
                        portalContainer={wrap}
                    >
                        <Button>{placement}</Button>
                    </Popover>
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
        <PopoverConfirm key={type} message={content} type={type} portalContainer={wrap}>
            <Button type={'intensive'} color={btnType[type] || type}>{type}</Button>
        </PopoverConfirm>
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
            <PopoverConfirm
                portalContainer={wrap}
                message={'这是一段确认信息'}
            >
                <Button>简单</Button>
            </PopoverConfirm>
            <PopoverConfirm
                type={null}
                portalContainer={wrap}
                headline={headline}
                message={'这是一段确认信息'}
            >
                <Button>带标题</Button>
            </PopoverConfirm>
            {types.map(renderTypePopover)}
        </div>
    </div>
}

export default PopoverDemo