import * as React from 'react'
import {Table, TableRow, TableProps, ButtonProps} from '@befe/brick'
import {DataAuthVO} from "../../../../services/system/data-authority-management-api";
import {MODAL_EDIT, TypeAuthData} from "./page";

interface OperationProps extends ButtonProps {
    key?: string
    label?: React.ReactNode
}

export function DataAuthorityTable(props: {
    data: Array<DataAuthVO>
    methods: {
        // [method: string]: (query1?: any, query2?: any) => void
        openSimpleModal: (modalName: string, authData: {
            authName: string
            remarks: string
            infoId?: string
        }) => void
        deleteDataAuth: (infoId: string) => void
        openUserConfigure: (infoId: string) => void
    }
    pageNum: number
    pageSize: number
}): React.ReactElement {

    function getOptionsMap(row: DataAuthVO, rowIdx: number): {
        [key: string]: OperationProps
    } {
        return {
            "user_config": {
                label: '配置用户',
                onClick: (): void => {
                    props.methods.openUserConfigure(row.infoId!);
                }
            },
            "auth_rule_config": {
                label: '规则配置',
            },
            "edit": {
                label: '编辑',
                onClick: (): void => {
                    props.methods.openSimpleModal(
                        MODAL_EDIT,
                        {
                            authName: row.authName!,
                            remarks: row.remarks!,
                            infoId: row.infoId!,
                        }
                    )
                }
            },
            "delete": {
                label: '删除',
                onClick: (): void => {
                    props.methods.deleteDataAuth(row.infoId!);
                }
            },
        };
    }

    function getOptions(row: DataAuthVO, rowIdx: number): OperationProps[] {
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

    const tableColumns: any[] = [
        {
            thContent: '序号',
            key: 'index',
            width: 70,
            tdContent: (row: DataAuthVO, rowIdx: number): number => {
                return (rowIdx + 1) + (props.pageSize * (props.pageNum - 1))
            },
        },
        {
            thContent: '名称',
            key: 'authName'
        },
        {
            thContent: '备注',
            key: 'remarks',
            width: 444,
        },
        {
            thContent: '最后更新人',
            key: 'lastUpdatedName',
            width: 107,
        },
        {
            thContent: '最后更新时间',
            key: 'lastUpdateDate',
            align: 'center',
        },
        {
            thContent: '操作',
            key: 'operations',
            align: 'center',
            width: 200,
            operations: (row: DataAuthVO, rowIdx: number): OperationProps[] => getOptions(row, rowIdx)
        },
    ];

    const tableProps: TableProps = {
        rowId: 'gId',
        data: props.data.slice() as TableRow[],
        columns: tableColumns,
    };

    return (
        <Table {...tableProps} />
    );
}

