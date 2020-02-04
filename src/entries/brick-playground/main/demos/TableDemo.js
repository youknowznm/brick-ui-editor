import * as React from 'react'

import {toJS} from "mobx";

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

// import {Table} from '@befe/brick'

import OriginComposedTable from '../composedComps/ComposedTable'
const ComposedTable = wrapDemoComp(OriginComposedTable)

const columns = []
for (let i = 1; i < 11; i++) {
    columns.push({
        key: `key${i}`,
        thContent: `标题${i}`,
    })
}

const data = []
const item = {}
for (let i = 1; i < 11; i++) {
    item[`key${i}`] = `数据${i}`
}
for (let j = 1; j < 11; j++) {
    data.push(toJS(item))
}

const TableDemo = () => {

    return <div className="demo-block table-demo-block">
        {/* ===== 0 ===== */}
        <ComposedTable
            data={data}
            columns={columns}
            useCheckbox={false}
            operationsLabelsJoined=""
        />
        <Divider className="demo-block-separator" />
        {/* ===== 1 ===== */}
        <ComposedTable
            data={data}
            columns={columns}
            useCheckbox={true}
            operationsLabelsJoined="编辑 删除"
        />
        <Divider className="demo-block-separator" />
        {/* ===== 2 ===== */}
        <ComposedTable
            data={data}
            columns={columns}
            useCheckbox={true}
            operationsLabelsJoined="编辑 删除"
            maxBodyHeight={200}
        />
    </div>
}

export default TableDemo
