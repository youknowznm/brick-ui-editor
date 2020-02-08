import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import _ComposedPagination from '../composedComps/ComposedPagination'
const ComposedPagination = wrapDemoComp(_ComposedPagination)

const PaginationDemo = () => {

    const renderPaginationBySize = (size) => {
        return (
            <div key={size}>
                <ComposedPagination total={100} size={size} />
                <Divider className="demo-block-separator" />
            </div>
        )
    }

    return <div className="demo-block pagination-demo-block">
        {/* ===== 0 basic ===== */}
        <ComposedPagination total={50}/>
        <Divider className="demo-block-separator" />
        <ComposedPagination total={100}/>
        <Divider className="demo-block-separator" />
        {/* ===== 1 size ===== */}
        {
            ['xs', 'sm', 'md'].map(size => renderPaginationBySize(size))
        }
        {/* ===== 2 simple ===== */}
        <ComposedPagination total={50} simple/>
    </div>
}

export default PaginationDemo
