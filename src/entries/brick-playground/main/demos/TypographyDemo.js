import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import _Typography from '../composedComps/Typography'
const Typography = wrapDemoComp(_Typography)

const TypographyDemo = () => {

    return <div className="demo-block typography-demo-block">
        {/* ===== 0 basic ===== */}
        <h3 className="demo-type-desc">字号</h3>
        <div>
            <Typography
                size="sm"
            >
                小号
            </Typography>
            <Typography
                size="md"
            >
                中号
            </Typography>
            <Typography
                size="lg"
            >
                大号
            </Typography>
        </div>
        <Divider className="demo-block-separator" />
        <h3 className="demo-type-desc">字重</h3>
        <div>
            <Typography
                weight="normal"
                size="lg"
            >
                常规体
            </Typography>
            <Typography
                size="lg"
                weight="medium"
            >
                中黑
            </Typography>
            <Typography
                size="lg"
                weight="bold"
            >
                粗体
            </Typography>
        </div>
        <Divider className="demo-block-separator" />
        <h3 className="demo-type-desc">类型</h3>
        <div>
            <Typography
                size="lg"
                type="heading"
            >
                标题
            </Typography>
            <Typography
                size="lg"
                type="primary"
            >
                主要
            </Typography>
            <Typography
                size="lg"
                type="active"
            >
                活动
            </Typography>
            <Typography
                size="lg"
                type="secondary"
            >
                次要
            </Typography>
            <Typography
                size="lg"
                type="hint"
            >
                提示
            </Typography>
            <Typography
                size="lg"
                type="disabled"
            >
                禁用
            </Typography>
        </div>
        <Divider className="demo-block-separator" />
    </div>
}

TypographyDemo.wrapName = 'TypographyDemo'

export default TypographyDemo
