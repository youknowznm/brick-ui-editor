import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import OriginComposedBreadcrumb from '../composedComps/ComposedBreadcrumb'
const ComposedBreadcrumb = wrapDemoComp(OriginComposedBreadcrumb)

const BreadcrumbDemo = () => {

    const dataList = [
        {
            // label: <><Icon svg={SvgSignInfo}/>首页</>,
            label: '首页',
        },
        {
            label: '一级页面',
        },
        {
            label: '末级页面',
        }
    ]

    const dataListForSize = [
        {
            label: '首页',
            href: '#',
        },
        {
            label: '一级页面',
            href: '#',
        },
        {
            label: '末级页面',
            href: '#',
        }
    ]

    return <div className="demo-block breadcrumb-demo-block">
        {/* ===== 0 basic ===== */}
        <div>
            <ComposedBreadcrumb data={dataList}/>
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 1 size ===== */}
        <ComposedBreadcrumb data={dataListForSize} size="sm" />
        <Divider className="demo-block-separator" />
        <ComposedBreadcrumb data={dataListForSize} size="md" />
        <Divider className="demo-block-separator" />
        {/* ===== 2 divider ===== */}
        <div>
            <ComposedBreadcrumb data={dataListForSize} divider='/'/>
        </div>

    </div>
}

export default BreadcrumbDemo
