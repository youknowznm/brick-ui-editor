import * as React from 'react'

import {mockBasicData} from './table-mock-data'

import {Checkbox} from '@befe/brick-comp-checkbox'


import Divider from '@material-ui/core/Divider';

import wrapDemoComp from '../utils/wrapDemoComp'

// import {Table} from '@befe/brick'

import OriginComposedTable from '../composedComps/ComposedTable'
const ComposedTable = wrapDemoComp(OriginComposedTable)

const TableDemo = () => {

    const columns = [
        // {
        //     key: 'checkbox',
        //     thContent: <Checkbox />,
        //     checkbox: (row, rowIdx) => ({
        //         // onChange: e => console.log(e.target.checked, row, rowIdx)
        //     })
        // },
        {
            thContent: '工号',
            key: 'employeeNumber'
        },
        {
            thContent: '邮箱',
            key: 'emailAddress',
            width: 200,
            tdContent: (row, rowIdx) => row.emailAddress,
        },
        {
            thContent: '员工类型',
            key: 'holdJobValue',
            width: 100,
        },
        {
            thContent: '职位',
            key: 'positionName',
            width: 250
        },
        {
            thContent: '粉丝数',
            key: 'personId',
            align: 'right',
        },
        {
            thContent: '用户名',
            key: 'uuapUserName'
        },
        // {
        //     key: 'operations',
        //     thContent: '操作',
        //     width: 150,
        //     operations: (row, rowIdx) => [
        //         {
        //             label: '编辑'
        //         },
        //         {
        //             label: '删除'
        //         }
        //     ]
        // }
    ]

    const fixedColumns = [
        // {
        //     key: 'checkbox',
        //     fixed: 'left',
        //     thContent: <Checkbox />,
        //     checkbox: (row, rowIdx) => ({
        //         // onChange: e => console.log(e.target.checked, row, rowIdx)
        //     })
        // },
        {
            thContent: '工号',
            fixed: 'left',
            key: 'employeeNumber'
        },
        {
            thContent: '邮箱',
            key: 'emailAddress',
            // width: 120,
            tdContent: (row, rowIdx) => row.emailAddress + ' ^_^ ' + rowIdx,
        },
        {
            thContent: '部门名称',
            key: 'departmentName',
        },
        {
            thContent: '员工类型',
            key: 'holdJobValue',
            width: 100,
        },
        {
            thContent: '职位',
            key: 'positionName',
            width: 400,
        },
        {
            thContent: '粉丝数',
            key: 'personId',
            align: 'right',
        },
        {
            thContent: '用户名',
            key: 'uuapUserName'
        },
        // {
        //     key: 'operations',
        //     fixed: 'right',
        //     thContent: '操作',
        //     width: 150,
        //     operations: (row, rowIdx) => [
        //         {
        //             label: '编辑'
        //         },
        //         {
        //             label: '删除'
        //         }
        //     ]
        // }
    ]

    const data = mockBasicData()

    return <div className="demo-block table-demo-block">
        {/* ===== 0 ===== */}
        <ComposedTable
            data={data}
            columns={columns}
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
            maxBodyHeight={300}
        />
    </div>
}

export default TableDemo
