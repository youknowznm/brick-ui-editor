import * as React from 'react';
import './style.mod.scss';
import { inject, observer } from "mobx-react";
import {createSearchPanel} from "../../../components/SearchPanel/creat-search-panel";
import { Button, PaginationProps, Switch, Table, TableRow, toast } from "@befe/brick";
import { action, observable } from "mobx";
import { initTextInput, initPagination} from "../../../components/initComponent";
import {getCompTableList, compSwitchChange} from 'src/services/system/operation-api'
import { OperationsModel } from "../../system/task-activity/TaskDataModel";
function getDefaultSearchValue() {
    return {
        comGroupName: '',
        comGroupCode: '',
    }
}

@observer
export class ArchiveListPage extends React.Component {
    @observable searchValues: {comGroupName: string, comGroupCode: string} = getDefaultSearchValue();

    @observable paginationMsg:PaginationProps = {
        total: 0,
        pageNum: 1,
        pageSize: 10
    };
    @observable groupTableData = [];

    searchPanel = createSearchPanel();
    pagination = initPagination(this.paginationMsg, this.getGroupTableList)


    @action
    handleReset = () => {
        this.searchValues = getDefaultSearchValue();
    };
    handleSearch = () => {
        this.getGroupTableList()
    };

    @action
    getGroupTableList() {
        let data = {
            ...this.searchValues,
            pageNum: this.paginationMsg.pageNum,
            pageSize: this.paginationMsg.pageSize
        };
        getCompTableList(data).then((resData: any) => {
            this.groupTableData = resData.list;
            this.paginationMsg = resData.pageMsg
        })
    }

    constructor(pros: any) {
        super(pros);
        this.searchPanel.init({
            fieldConfig: {
                colSpan: 8,
                config: {
                    comGroupName: {
                        label: '公司组名称',
                        component: initTextInput(this.searchValues, {key: 'comGroupName'})
                    },
                    comGroupCode: {
                        label: '公司组编码',
                        component: initTextInput(this.searchValues, {key: 'comGroupCode'})
                    }
                },
                order: [
                    ['comGroupName', 'comGroupCode']
                ]
            },
            onSearch: this.handleSearch,
            onReset: this.handleReset
        })
    }
    getColumns() {
        return [
            {
                thContent: '序号',
                key: 'No',
                tdContent: (row: any, rowIndex: number) => rowIndex + 1
            },
            {
                thContent: '名称',
                key: 'comGroupName',
            },
            {
                thContent: '编码',
                key: 'comGroupCode'
            },
            {
                thContent: '公司组说明',
                key: 'description',
            },
            {
                thContent: '公司组成员',
                key: 'comGroupLines',
                tdContent: (row:any) => {
                    // comGroupLinesVOS
                    return ''
                }
            },
            {
                thContent: '成员个数',
                key: 'comGroupLinesTotal',
                tdContent: (row: any) => row.comGroupLinesVOS && row.comGroupLinesVOS.length
            },
            {
                thContent: '生效时间',
                key: 'effectiveStartDate'
            },
            {
                thContent: '创建人',
                key: 'createdName',
                tdContent: (row:any) => `${row.createdName}(${row.createdBy})`
            },
            {
                thContent: '创建时间',
                key: 'creationDate'
            },
            {
                thContent: '更新人',
                key: 'lastUpdatedName',
                tdContent: (row:any) => `${row.lastUpdatedName}(${row.lastUpdatedBy})`
            },
            {
                thContent: '更新时间',
                key: 'lastUpdateDate'
            },
            {
                thContent: '状态',
                key: 'userStatus',
                tdContent: (row: TableRow) => {
                    let defaultChecked = row.unableFlag === 'Y';
                    return (
                        <Switch
                            size={'md'}
                            defaultChecked={defaultChecked}
                            checkedLabel={'开启'}
                            uncheckedLabel={'停用'}
                            onChange={(checked:boolean) => {
                                let data = {
                                    unableFlag: checked ? 'Y' : 'N',
                                    comGroupId: row.comGroupId
                                };
                                compSwitchChange(data).then((res:any) => {
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
                operations: (row: any) => {
                    let optionList:{}[] = [];
                    if(row.options && row.options.length) {
                        row.options.forEach((col: OperationsModel)=> {
                            if(col === 'edit') {
                                optionList.push({
                                    label: '编辑',
                                    onClick: () => {

                                    }
                                })
                            }
                        })
                    }
                    return optionList;
                }

            }
        ]
    }

    render() {
        return (
            <div styleName={'operation-list'}>
                {this.searchPanel.render()}
                <div styleName={'operation-table'}>
                    <Button type='important' onClick={() => {}}>
                        新增
                    </Button>
                    <Table
                        columns={this.getColumns()}
                        data={this.groupTableData}
                        rowId={'id'}
                    />
                    {this.pagination.render()}
                </div>
            </div>
        )
    }
}

export default ArchiveListPage
