import * as React from 'react'
import { Table, TableRow } from "@befe/brick";

export function initRoleTable() {
    const columns = [
        {
            thContent: '序号',
            key: 'No',
            tdContent: (row: any, rowIndex: number) => rowIndex + 1
        },
        {
            thContent: '规则名称',
            key: 'person'
        },
        {
            thContent: '任务分类',
            key: 'onGuardTime'
        },
        {
            thContent: '公司范围',
            key: 'dep'
        },
        {
            thContent: '部门范围',
            key: 'onGuard'
        },
        {
            thContent: '角色',
            key: 'role'
        },
        {
            thContent: '启用日期',
            key: 'startTime'
        },
        {
            thContent: '停用日期',
            key: 'endTime'
        },
        {
            thContent: '操作人',
            key: 'personal'
        },
        {
            thContent: '操作时间',
            key: 'optionTime'
        },
        {
            thContent: '状态',
            key: 'status', // switch,
            tdContent: (row: any) => {return ''}

        }
    ];
    return {
        render(tableData: TableRow[]) {
            return(<Table columns={columns} data={tableData}/>)
        }
    }
}

export function initGroupTable() {
    const personGroupColumns = [
        {
            thContent: '序号',
            key: 'No',
            tdContent: (row: any, rowIndex: number) => rowIndex + 1
        },
        {
            thContent: '用户组', // 名称(编号)
            key: 'businessGroup',
            tdContent: (row:any) => `${row.groupName}(${row.businessGroup})`
        },
        {
            thContent: '启用日期',
            key: 'openTime'
        },
        {
            thContent: '停用日期',
            key: 'closeTime'
        },
        {
            thContent: '操作人',
            key: 'creationDate'
        },
        {
            thContent: '操作时间',
            key: 'lastUpdateDate'
        },
        {
            thContent: '备注',
            key: 'hId'
        },
        {
            thContent: '状态',
            key: 'userStatus', // switch,
            tdContent: (row: any) => {return ''}

        }
    ]
    return {
        render(tableData: TableRow[]) {
            return <Table
                columns={personGroupColumns}
                data={tableData}
                rowId={'id'}
            />
        }
    }
}
