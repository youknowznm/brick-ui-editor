import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import _Breadcrumb from '../composedComps/Breadcrumb'

const Breadcrumb = wrapDemoComp(_Breadcrumb)

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
    <h3 className="demo-type-desc">尺寸</h3>
    <div>
      <Breadcrumb data={dataList} size="sm"/>
    </div>
    <div>
      <Breadcrumb data={dataList} size="md"/>
    </div>
    <Divider className="demo-block-separator"/>
    {/* ===== 2 divider ===== */}
    <h3 className="demo-type-desc">自定义分隔符</h3>
    <div>
      <Breadcrumb data={dataList} divider='/'/>
    </div>
    <Divider className="demo-block-separator"/>
  </div>
}

BreadcrumbDemo.wrapName = 'BreadcrumbDemo'

export default BreadcrumbDemo
