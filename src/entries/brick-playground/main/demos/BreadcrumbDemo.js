import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import { Breadcrumb } from '@befe/brick'
import { Icon } from '@befe/brick-comp-icon'
import { SvgSignInfo } from '@befe/brick-icon'


// import {Breadcrumb as OriginBreadcrumb} from '@befe/brick'
//
// const Breadcrumb = wrapDemoComp(OriginBreadcrumb)

const BreadcrumbDemo = () => {

    const dataList = [
        {
            label: <><Icon svg={SvgSignInfo}/>首页</>,
            href: '#',
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
            <Breadcrumb data={dataList}/>
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 1 size ===== */}
        <div>
            {['sm', 'md'].map((size, index) => <Breadcrumb data={dataListForSize} size={size} key={index}/>)}
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 2 divider ===== */}
        <div>
            <Breadcrumb data={dataListForSize} divider='/'/>
        </div>

    </div>
}

export default BreadcrumbDemo
