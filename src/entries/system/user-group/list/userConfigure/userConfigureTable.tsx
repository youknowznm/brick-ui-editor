import * as React from 'react'
import {Table, TableRow, TableProps, Switch} from '@befe/brick'
import {TypeUserGroupRecordVO} from "./model";

type TypeProps = {
    tableData: TableRow[]
    pageSize: number
    pageNum: number
    changeUserStatus: (user: TypeUserGroupRecordVO) => void
}

export function ConfigureGroupTable(props: TypeProps): React.ReactElement {

    const renderStatusSwitch = (row: TypeUserGroupRecordVO, rowIdx: number): React.ReactElement => {
        const defaultChecked = row.inUse! === 'Y';
        return (
            <Switch
                defaultChecked={defaultChecked}
                checkedLabel={'开启'}
                uncheckedLabel={'停用'}
                size={'md'}
                beforeChange={(): void => {props.changeUserStatus(row)}}
            />
        )
    };

    const tableColumns: any[] = [
        {
            thContent: '序号',
            key: 'hId',
            width: 70,
            tdContent: (row: TypeUserGroupRecordVO, rowIdx: number): number => {
                return props.pageSize * (props.pageNum - 1) + rowIdx +1;
            }
        },
        {
            thContent: '姓名',
            key: 'userName',
            tdContent: (row: TypeUserGroupRecordVO, rowIdx: number): string => {
                return `${row.userName || ''}（${row.userUuap}）`
            }
        },
        {
            thContent: '部门',
            key: 'departmentName'
        },
        {
            thContent: '用户状态',
            key: 'userStatus',
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
            key: 'lastUpdatedName',
            tdContent: (row: TypeUserGroupRecordVO, rowIdx: number): string => {
                return row.lastUpdatedName || row.createdName!
            }
        },
        {
            thContent: '操作时间',
            key: 'lastUpdateDate',
            tdContent: (row: TypeUserGroupRecordVO, rowIdx: number): string => {
                return row.lastUpdateDate || row.creationDate!
            }
        },
        {
            thContent: '状态',
            key: 'status',
            align: 'center',
            tdContent: (row: TypeUserGroupRecordVO, rowIdx: number): React.ReactElement =>
                renderStatusSwitch(row, rowIdx),
        },
    ];

    const tableProps: TableProps = {
        rowId: 'hId',
        data: props.tableData.slice(),
        columns: tableColumns,
    };

    return (
        <Table {...tableProps} />
    );
}

