import React, {ReactNode} from 'react'
import {Table, TableRow, TableProps} from '@befe/brick'
import {MODAL_EDIT, SingleData} from './page';

type TypeProps = {
    data: TableRow[]
    openModal: (modalName: string, data?: any) => void
    openUserConfigure: (group: SingleData) => void
    deleteUserGroup: (group: SingleData) => void
    pageSize: number
    pageNum: number
}

export class UserGroupTableList extends React.PureComponent<TypeProps, {}>{
    constructor(props: any) {
        super(props);
    }

    tableColumns: any[] = [
        {
            thContent: '序号',
            key: 'gId',
            width: 70,
            tdContent: (row: SingleData, index: number): number => {
                const {pageNum, pageSize} = this.props;
                return pageSize * (pageNum - 1) + index + 1;
            }
        },
        {
            thContent: '用户组名称',
            key: 'groupName'
        },
        {
            thContent: '编码',
            key: 'groupCode'
        },
        {
            thContent: '成员个数（ 启 | 停 ）',
            key: 'users',
            align: 'center',
            operations: (row: SingleData): any[] => [
                {
                    label: `( ${row.openUsers || 0} | ${row.closeUsers || 0} )`,
                    onClick: (): void => {
                        console.log('open new window');
                    }
                }
            ]
        },
        {
            thContent: '备注',
            key: 'remark'
        },
        {
            thContent: '操作',
            key: 'operations',
            align: 'center',
            operations: (row: SingleData, rowIdx: number): any => [
                {
                    label: '编辑',
                    onClick: (): void => {
                        this.props.openModal(MODAL_EDIT, {userGroup: row})
                    }
                },
                {
                    label: '配置用户',
                    onClick: (): void => {
                        this.props.openUserConfigure(row);
                    }
                },
                {
                    label: '删除',
                    onClick: (): void => {
                        this.props.deleteUserGroup(row);
                    }
                }
            ]
        },
    ];

    initData = (): TableRow[] => {
        return this.props.data.map(item => {
            return Object.assign({
                groupName: '',
                groupCode: '',
                remark: ''
            }, item);
        })
    };

    render(): ReactNode {
        return (
            <Table
                rowId={'gId'}
                data={this.initData()}
                columns={this.tableColumns}
            />
        );
    }
}

