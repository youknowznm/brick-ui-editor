import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import _Collapse from '../composedComps/Collapse.js'
const Collapse = wrapDemoComp(_Collapse)

const CollapseDemo = () => {
    const defaultExpandedIds = []
    const demoData = [
        {
            id: 1,
            headline: '标题1',
            content: '内容1内容1内容1内容1内容1内容1',
            disabled: false,
            extra: '',
        },
        {
            id: 2,
            headline: '标题2',
            content: '内容2内容2内容2内容2内容2内容2',
            disabled: false,
            extra: '',
        },
        {
            id: 3,
            headline: '标题3',
            content: '内容3内容3内容3内容3内容3内容3',
            disabled: false,
            extra: '',
        },
    ]
    return <div className="demo-block collapse-demo-block">
        {/* ===== 0 basic ===== */}
        <h3 className="demo-type-desc">常规</h3>
        <div>
            <Collapse
                singleExpanded={false}
                defaultExpandedIds={defaultExpandedIds}
                data={demoData}
            />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 1 被禁用 ===== */}
        <h3 className="demo-type-desc">禁用</h3>
        <div>
            <Collapse
                singleExpanded={true}
                defaultExpandedIds={defaultExpandedIds}
                data={demoData.map((item, index) => Object.assign({}, item, {
                     disabled: index === 1 ? true : false
                }))}
            />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 2 图标位置 ===== */}
        <h3 className="demo-type-desc">图标位置</h3>
        <div>
            <Collapse
                expandIconPosition="right"
                singleExpanded={false}
                defaultExpandedIds={defaultExpandedIds}
                data={demoData}
            />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 3 自定义内容 ===== */}
        <h3 className="demo-type-desc">额外标题</h3>
        <div>
            <Collapse
                singleExpanded={false}
                defaultExpandedIds={defaultExpandedIds}
                data={demoData.map((item, index) => Object.assign({}, item, {
                    extra: `额外标题${index + 1}`,
                }))}
            />
        </div>
        <Divider className="demo-block-separator" />
    </div>
}

CollapseDemo.wrapName = 'CollapseDemo'

export default CollapseDemo
