import * as React from 'react'

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import {Pagination, ErpLogo} from '@befe/brick'

import subHead from './subhead.svg'

// import {HeaderNav as OriginHeaderNav} from '@befe/brick'
//
// const HeaderNav = wrapDemoComp(OriginHeaderNav)

const PaginationDemo = () => {

    const renderPaginationBySize = (size) => {
        return (
            <div key={size}>
                <div className="pagination-wrap">
                    <Pagination total={100} size={size} />
                </div>
            </div>
        )
    }

    return <div className="demo-block breadcrumb-demo-block">
        {/* ===== 0 basic ===== */}
        <div>
            <div className="pagination-wrap">
                <Pagination total={50}/>
            </div>
            <div className="pagination-wrap">
                <Pagination total={100}/>
            </div>
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 1 radio-group ===== */}
        <div>
            {['xs', 'sm', 'md'].map(size => renderPaginationBySize(size))}
        </div>
        <Divider className="demo-block-separator" />
        {/* ===== 2 simple ===== */}
        <div>
            <Pagination total={50} simple/>
        </div>
    </div>
}

export default PaginationDemo
