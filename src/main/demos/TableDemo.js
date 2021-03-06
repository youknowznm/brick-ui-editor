import * as React from 'react'

import {toJS} from "mobx";

import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

import _Table from '../composedComps/Table.js'

const Table = wrapDemoComp(_Table)

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
    {/*<Table*/}
    {/*    data={data}*/}
    {/*    columns={columns}*/}
    {/*    useCheckbox={false}*/}
    {/*    operationsLabelsJoined=""*/}
    {/*/>*/}
    {/*<Divider className="demo-block-separator" />*/}
    {/* ===== 1 ===== */}
    {/*<h3 className="demo-type-desc">普通</h3>*/}
    <Table
      data={data}
      columns={columns}
      useCheckbox={true}
      operationsLabelsJoined="编辑 删除"
    />
    <Divider className="demo-block-separator"/>
    {/*/!* ===== 2 ===== *!/*/}
    {/*<h3 className="demo-type-desc">限制高度</h3>*/}
    {/*<Table*/}
    {/*    data={data}*/}
    {/*    columns={columns}*/}
    {/*    useCheckbox={true}*/}
    {/*    operationsLabelsJoined="编辑 删除"*/}
    {/*    maxBodyHeight={120}*/}
    {/*/>*/}
    {/*<Divider className="demo-block-separator" />*/}
  </div>
}

TableDemo.wrapName = 'TableDemo'

export default TableDemo
