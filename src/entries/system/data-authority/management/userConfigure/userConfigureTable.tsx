import * as React from 'react'
import {Table, TableRow, TableProps, ButtonProps, Switch} from '@befe/brick'
import {DataAuthUsersVO} from "../../../../../services/system/data-authority-management-api";

interface OperationProps extends ButtonProps {
    key?: string
    label?: React.ReactNode
}

export function UserConfigureTable(props: {
    data: DataAuthUsersVO[]
    pageNum: number
    pageSize: number
    methods: {

    }
}): React.ReactElement {

    function getOptionsMap(row: DataAuthUsersVO, rowIdx: number): {
        [key: string]: OperationProps
    } {
        return {
            "edit": {
                label: '编辑',
                onClick: (): void => {}
            },
        };
    }

    function getOptions(row: DataAuthUsersVO, rowIdx: number): OperationProps[] {
        const options = row.options || [];
        const optionsMap = getOptionsMap(row, rowIdx);

        //@todo: 操作多于3个，显示更多
        // if (options.length > 3) {
        //     return [
        //         optionsMap[options[0]],
        //         optionsMap[options[1]],
        //         {
        //             label: '更多',
        //         }
        //     ]
        // }

        return options.map((option: string) => optionsMap[option]);
    }

    /**
     *
     *@todo: 使用code、onchange
     * ENABLED：启用
     * NOT_ENABLED：未启用
     * STOPPED：停用
     */
    function renderStatusSwitch(row: DataAuthUsersVO, rowIdx: number): React.ReactElement {
        const status = {
            defaultChecked: row.dataStatus === 'ENABLED',
            checkedLabel: '启用',
            unCheckedLabel: row.dataStatus === 'NOT_ENABLED' ? '未启用' : '停用'
        };
        return (
            <Switch
                {...status}
                size={'md'}
            />
        )
    }

    const tableColumns: any[] = [
        {
            thContent: '序号',
            key: 'index',
            width: 70,
            tdContent: (row: DataAuthUsersVO, rowIdx: number): number => {
                return (rowIdx + 1) + (props.pageSize * (props.pageNum - 1))
            },
        },
        {
            thContent: '姓名',
            key: 'userName'
        },
        {
            thContent: '部门',
            key: 'departmentName',
        },
        {
            thContent: '用户状态',
            key: 'userStatusName',
        },
        {
            thContent: '启用日期',
            key: 'startDate',
        },
        {
            thContent: '停用日期',
            key: 'endDate',
        },
        {
            thContent: '操作人',
            key: 'lastUpdatedName',
            tdContent: (row: DataAuthUsersVO, rowIdx: number): string => {
                return row.lastUpdatedName || row.createdName || ''
            },
        },
        {
            thContent: '操作时间',
            key: 'lastUpdateDate',
            tdContent: (row: DataAuthUsersVO, rowIdx: number): string => {
                return row.lastUpdateDate || row.creationDate || ''
            },
        },
        {
            thContent: '权限状态',
            key: 'dataStatusName',
            align: 'center',
            tdContent: renderStatusSwitch
        },
        {
            thContent: '操作',
            key: 'operations',
            align: 'center',
            width: 200,
            operations: (row: DataAuthUsersVO, rowIdx: number): OperationProps[] => getOptions(row, rowIdx)
        },
    ];

    const tableProps: TableProps = {
        rowId: 'authId',
        data: props.data.slice() as TableRow[],
        columns: tableColumns,
    };

    return (
        <Table {...tableProps} />
    );
}

