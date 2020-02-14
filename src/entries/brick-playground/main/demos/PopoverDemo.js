import * as React from 'react'

import wrapDemoComp from '../utils/wrapDemoComp'

import _Popover from '../composedComps/Popover.js'
const Popover = wrapDemoComp(_Popover)

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
                    <Popover
                        placement={placement}
                        content="内容"
                        btnContent={placement}
                    />
                ) : null}
            </div>
        )
    }

    const headline = '标题'

    return <div className="demo-block popover-demo-block">
        {/* ===== 0 basic ===== */}
        <h3 className="demo-type-desc">弹出方向</h3>
        {placements.map((row, rowIdx) => (
            <div key={rowIdx} className={'trigger-row'}>
                {row.map(renderPlacement)}
            </div>
        ))}
    </div>
}

PopoverDemo.wrapName = 'PopoverDemo'

export default PopoverDemo
