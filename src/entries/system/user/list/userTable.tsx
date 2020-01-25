import * as React from 'react'
import { Switch, Table, TableRow, toast} from "@befe/brick";
import {userSwitchChange} from 'src/services/system/user-api';
function getGroupString(group: []) {
    let resultString = '';
    group.forEach((col: any, idx: number) => {
        resultString += col + ((idx + 1 === group.length) ? '' : ', ')
    });
    return resultString;
}

export function initUserTable(
    tableData: TableRow[],
    clickConfig: (userUuap: string, businessGroup: string) => void
) {
    const tableColumns = [
        {
            thContent: '序号',
            key: 'No',
            tdContent: (row: any, rowIndex: number) => rowIndex + 1
        },
        {
            thContent: '用户',
            key: 'userName'
        },
        {
            thContent: '在岗时间',
            key: 'onGuardTime',
            tdContent: (row: any) => {
                return `${row.entryDate} ~ ${row.leaveDate ? row.leaveDate : '至今'}`
            }
        },
        {
            thContent: '部门',
            key: 'userDepartment'
        },
        {
            thContent: '在职',
            key: 'inCompany'
        },
        {
            thContent: '角色',
            key: 'role',
            tdContent: (row:any) => {
                let roleString = '';
                if(row.groups && row.groups.length) {
                    row.groups.forEach((col: any, idx: number) => {
                        roleString += col + ((idx + 1 === row.groups.length) ? '' : ', ')
                    })
                }
                return roleString;
            }
        },
        {
            thContent: '所属用户组',
            key: 'group',
            tdContent: (row:any) => {
                if(row.groups && row.groups.length) {
                    return getGroupString(row.groups);
                }
            }
        },
        {
            thContent: '数据权限',
            key: 'permission',
            tdContent: (row:any) => {
                let powersString = '';
                if(row.dataPowers && row.dataPowers.length) {
                    row.dataPowers.forEach((col: any, idx: number) => {
                        powersString += col + ((idx + 1 === row.dataPowers.length) ? '' : ', ')
                    })
                }
                return powersString;
            }
        },
        {
            thContent: '看板角色',
            key: 'boardRole',
            tdContent: (row:any) => {
                if(row.boardRoles && row.boardRoles.length) {
                    return getGroupString(row.boardRoles);
                }
            }
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
            thContent: '权限状态',
            key: 'status',
            tdContent: (row: TableRow) => {
                let defaultChecked = row.inUse === 'Y';
                return (
                    <Switch
                        size={'md'}
                        defaultChecked={defaultChecked}
                        checkedLabel={'开启'}
                        uncheckedLabel={'停用'}
                        onChange={(checked:boolean) => {
                            let data = {
                                inUse: checked ? 'Y' : 'N',
                                userUuap: row.userUuap,
                                businessGroup: row.businessGroup
                            };
                            userSwitchChange(data).then((res:any) => {
                                if (res.code) {
                                    if(res.code === 200) {
                                        toast.success(res.data);
                                    }
                                    else {
                                        toast.error(res.message);
                                    }
                                }
                            })
                        }}
                    />
                )
            }
        },
        {
            thContent: '操作',
            key: 'operations',
            width: 100,
            operations: (row: any) => [
                {
                    label: '配置',
                    onClick: () => clickConfig(row.userUuap, row.businessGroup)
                }
            ]
        }
    ];
    return {
        render() {
           return(<Table rowId={'id'} columns={tableColumns} data={tableData}/>)
        }
    }
}
