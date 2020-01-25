import * as React from 'react'
import { Table, Link, Pagination, Switch, toast } from "@befe/brick";
import { action, observable, toJS } from "mobx";
import {OperationsModel, taskTableDataModel} from '../TaskDataModel'
import {taskListSwitch, taskListDelete} from 'src/services/system/task-management-api';

export function initTaskTable(
    tableData: taskTableDataModel,
    handelView: (id:string) => void,
    handelChangePageNum: (num:number) => void,
    handelChangePageSize: (size: number) => void
) {
    const {
        list = [],
        total,
        pageNum,
        pageSize
    } = tableData;
    const tableColumns = [
        {
            thContent: '序号',
            key: 'No',
            tdContent: (row: any, rowIndex: number) => rowIndex + 1
        },
        {
            thContent: '编码',
            key: 'code',
            tdContent: (row:any, rowIdx: number) => <Link type={'intensive'} onClick={() => handelView(row.taskId)}>{row.code}</Link>
        },
        {
            thContent: '名称',
            key: 'name'
        },
        {
            thContent: '关联状态',
            key: 'relatedBillStatus',
        },
        {
            thContent: '关联结果',
            key: 'relatedTask',
            tdContent: (row:any) => {
                let billString = '';
                if (row.relatedTaskResult && row.relatedTaskResult.length) {
                    row.relatedTaskResult.forEach(
                        (col:{dataStatus?: string, dataStatusName?: string, name?: string}, idx: number) => {
                    billString += `${col.name}${col.dataStatusName? '(' + col.dataStatusName + ')' : ''}${(idx + 1) === row.relatedTaskResult ? ', ' : '' }`
                    })
                }
                return billString;
            }
        },
        {
            thContent: '启用日期',
            key: 'startDate'
        },
        {
            thContent: '停用日期',
            key: 'endDate'
        },
        {
            thContent: '备注',
            key: 'remarks'
        },
        {
            thContent: '状态', // switch
            key: 'dataStatusName',
            tdContent: (row: any) => {
                let checkedLabel = '启用';
                let uncheckedLabel = row.dataStatus === 'NOT_ENABLED' ? '未启用' : '停用';
                let defaultChecked = row.dataStatus === 'ENABLED';
                return (
                    <Switch
                        size={'md'}
                        defaultChecked={defaultChecked}
                        checkedLabel={checkedLabel}
                        uncheckedLabel={uncheckedLabel}
                        onChange={(checked: boolean) => {
                            if (row.dataStatus === 'NOT_ENABLED' && !checked) {
                                return;
                            }
                            else {
                                let requestStatus = '';
                                switch (row.dataStatus) {
                                    case 'ENABLED':
                                        requestStatus = 'STOPPED';
                                        break;
                                    case 'NOT_ENABLED':
                                        requestStatus = 'ENABLED';
                                        break;
                                    case 'STOPPED':
                                        requestStatus = 'ENABLED'
                                }
                                taskListSwitch(row.taskId, requestStatus).then((res:any) => {
                                    if (res.code) {
                                        if(res.code === 200) {
                                            toast.success(res.message);
                                        }
                                        else {
                                            toast.error(res.message);
                                        }
                                    }
                                })
                            }
                        }}
                        beforeChange={(checked: boolean) => {
                            if (row.dataStatus === 'NOT_ENABLED' && !checked) {
                                return false;
                            }
                        }}
                    />
                );
            },
        },
        {
            thContent: '操作',
            key: 'operations',
            width: 100,
            operations: (row: any, rowIdx: number) => {
                let optionList:{}[] = [];
                if(row.options && row.options.length) {
                    row.options.forEach((col: OperationsModel)=> {
                        switch (col) {
                            case 'view_result':
                                optionList.push({
                                    label: '查看结果',
                                    onClick: () => {}
                                });
                                break;
                            case 'edit':
                                optionList.push({
                                    label: '编辑',
                                    onClick: () => {

                                    }
                                });
                                break;
                            case 'delete':
                                optionList.push({
                                    label: '删除',
                                    onClick: () => {
                                        return (
                                            taskListDelete(row.taskId).then((res: any) => {
                                                if (res.code) {
                                                    if(res.code === 200) {
                                                        toast.success(res.message);
                                                    }
                                                    else {
                                                        toast.error(res.message);
                                                    }
                                                }
                                            })
                                        )
                                    }
                                })
                            break;
                        }
                    })
                }
                return optionList;
            }
        }
    ];

    return {
        render() {
            return(
                   <div>
                       <Table rowId={'id'} columns={tableColumns} data={list}/>
                       <Pagination
                           total={total}
                           pageNum={pageNum}
                           pageSize={pageSize}
                           onChangePageNum={(num: number) => {
                               handelChangePageNum(num);
                           }}
                           onChangePageSize={(pageSize:number) => {
                               handelChangePageSize(pageSize);
                           }}
                       />
                   </div>
               )
        }
    }
}

