import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import _Pagination from '../composedComps/Pagination'

const Pagination = wrapDemoComp(_Pagination)

const PaginationDemo = () => {

  const renderPaginationBySize = (size) => {
    return (
      <div key={size}>
        <Pagination total={100} size={size}/>
      </div>
    )
  }

  return <div className="demo-block pagination-demo-block">
    {/* ===== 1 size ===== */}
    <h3 className="demo-type-desc">尺寸</h3>
    {
      ['xs', 'sm', 'md'].map(size => renderPaginationBySize(size))
    }
    {/* ===== 2 simple ===== */}
    <h3 className="demo-type-desc">简单分页</h3>
    <Pagination total={50} simple/>
  </div>
}

PaginationDemo.wrapName = 'PaginationDemo'

export default PaginationDemo
