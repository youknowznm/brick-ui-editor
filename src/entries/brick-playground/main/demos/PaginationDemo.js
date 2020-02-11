import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import _Pagination from '../composedComps/Pagination'
const Pagination = wrapDemoComp(_Pagination)

const PaginationDemo = () => {

    const renderPaginationBySize = (size) => {
        return (
            <div key={size}>
                <Pagination total={100} size={size} />
                <Divider className="demo-block-separator" />
            </div>
        )
    }

    return <div className="demo-block pagination-demo-block">
        {/* ===== 0 basic ===== */}
        <Pagination total={50}/>
        <Divider className="demo-block-separator" />
        <Pagination total={100}/>
        <Divider className="demo-block-separator" />
        {/* ===== 1 size ===== */}
        {
            ['xs', 'sm', 'md'].map(size => renderPaginationBySize(size))
        }
        {/* ===== 2 simple ===== */}
        <Pagination total={50} simple/>
    </div>
}

PaginationDemo.wrapName = 'PaginationDemo'

export default PaginationDemo
