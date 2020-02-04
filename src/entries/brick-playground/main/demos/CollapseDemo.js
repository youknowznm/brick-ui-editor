import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

// import {CollapsePanel} from '@befe/brick'

// import {ComposedCollapse, CollapsePanel} from '@befe/brick'
import OriginComposedCollapse from '../composedComps/ComposedCollapse.js'

const ComposedCollapse = wrapDemoComp(OriginComposedCollapse)

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
        <div>
            <ComposedCollapse
                singleExpanded={false}
                defaultExpandedIds={defaultExpandedIds}
                data={demoData}
            />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 1 被禁用 ===== */}
        <div>
            <ComposedCollapse
                singleExpanded={true}
                defaultExpandedIds={defaultExpandedIds}
                data={demoData.map((item, index) => Object.assign({}, item, {
                     disabled: index === 1 ? true : false
                }))}
            />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 2 图标位置 ===== */}
        <div>
            <ComposedCollapse
                expandIconPosition="right"
                singleExpanded={false}
                defaultExpandedIds={defaultExpandedIds}
                data={demoData}
            />
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 3 自定义内容 ===== */}
        <div>
            <ComposedCollapse
                singleExpanded={false}
                defaultExpandedIds={defaultExpandedIds}
                data={demoData.map((item, index) => Object.assign({}, item, {
                    extra: `额外标题${index + 1}`,
                }))}
            />
        </div>
    </div>
}

export default CollapseDemo
