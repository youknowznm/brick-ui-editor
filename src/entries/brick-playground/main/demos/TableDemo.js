import * as React from 'react'

import {toJS} from "mobx";

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

// import {Table} from '@befe/brick'

import OriginComposedTable from '../composedComps/ComposedTable'
const ComposedTable = wrapDemoComp(OriginComposedTable)

const columns = []
for (let i = 0; i < 10; i++) {
    columns.push({
        key: `key${i + 1}`,
        thContent: `标题${i + 1}`,
        align: 'center',
    })
}

const data = []
const item = {}
// 属性数
for (let i = 0; i < 10; i++) {
    item[`key${i + 1}`] = `数据${i + 1}`
}
// 行数
for (let j = 0; j < 5; j++) {
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
            maxBodyHeight={120}
            useCheckbox={false}
            operationsLabelsJoined=""
        />
        <Divider className="demo-block-separator" />
        {/* ===== 2 ===== */}
        <ComposedTable
            data={data}
            columns={columns}
            useCheckbox={true}
            operationsLabelsJoined="编辑 删除"
        />
    </div>
}

export default TableDemo
