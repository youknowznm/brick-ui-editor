import * as React from 'react'
import {inject, observer} from 'mobx-react';
import { observable, action, computed } from 'mobx';
import { Button, Dialog, Select, toast } from "@befe/brick";
import {initTaskTable} from './taskTabel';
import {createSearchPanel} from 'src/components/SearchPanel/creat-search-panel';
import {getTaskViewDetail, taskListSave} from '../../../../services/system/task-management-api'
import {EditModal} from './editDialog';
import {ViewModal} from "./viewModal";
import './style.mod.scss';
import {
    TaskActivitySearchModel,
    TaskListSelectOptions,
    TaskListViewDialogModel,
    taskTableDataModel
} from '../TaskDataModel'
import {getTaskSelectOptions, getTaskTableList} from '../../../../services/system/task-management-api';

function getDefaultSearchValue(): TaskActivitySearchModel{
    return {
        enableFlags: '',
        resultIds: '',
        bIds: undefined,
        code: '',
        name: '',
        pageNum: 1,
        pageSize: 10
    }
}


@observer
export class PageUserList extends React.Component {
    searchPanel = createSearchPanel();
    @observable searchValues: TaskActivitySearchModel = getDefaultSearchValue();
    @observable tableData:taskTableDataModel = {
            list: [],
            total: undefined,
            pageNum: this.searchValues.pageNum,
            pageSize: this.searchValues.pageSize
    };

    @observable initSelectOptions:TaskListSelectOptions = {
        dataStatus: [],
        relatedBillStatus: []
    }
    @observable modalVisible = false;
    @observable viewModalVisible = false;
    @observable viewTaskFormData:TaskListViewDialogModel['viewFormValue'] = {
        name: '',
        code: '',
        dataStatus: '',
        startDate: '',
        endDate: '',
        sortNumber: '',
        remarks: '',
        taskResults: [],
        imageSystemCode: '',
        staffCanSearch: '',
        canTransferShare: '',
        arrtibute1: '',
        arrtibute1Remarks: '',
        arrtibute2: '',
        arrtibute2Remarks: '',
        arrtibute3: '',
        arrtibute3Remarks: '',
        arrtibute4: '',
        arrtibute4Remarks: '',
        arrtibute5: '',
        arrtibute5Remarks: ''
    };
    @action
    handleReset = () => {
        this.searchValues = getDefaultSearchValue();
    };
    handleSearch = () => {
        this.getTableDataService();
    }

    getSearchValue = () => this.searchValues;
    reactDom = {
        render() {
            return(<div>{'suggest'}</div>)
        }
    }

    getTableDataService() {
        return getTaskTableList({
            ...this.searchValues
        }).then(action((resData: any) => {
            this.tableData = {...resData}

        }))
    }
    @action
    getSelectOptions() {
        getTaskSelectOptions().then(resData => {
            this.initSelectOptions = {
                ...this.initSelectOptions,
                ...resData
            }
        })
    }


    // 查看页获取弹窗数据
    @action
    handleView = (id: string) => {
        getTaskViewDetail(id).then(resData => {
            this.viewTaskFormData = resData
        });
        this.viewModalVisible = true;
    };
    @action
    onChangePageNum = (num: number) => {
        this.tableData.pageNum = num;
    };
    @action
    onChangePageSize = (size: number) => {
        this.tableData.pageSize = size
    };
    // 关闭查看弹窗
    @action
    closeViewModal() {
        this.viewModalVisible = false;
    }

    // 新增编辑保存
    @action
    handelEditConfirm = (data: object) => {
        taskListSave(data).then((res:any) => {
            if (res.code && res.code === 200) {
                toast.success('保存成功');
                this.modalVisible = false;
                this.getTableDataService();
            }
            else {
                toast.error(res.message)
            }
        })
    }

    // select渲染
    renderSelect(optionsKey: string, searchKey: string) {
        const self = this;
        return {
            render() {
                return (<Select
                    placeholder={'请选择'}
                    value={self.searchValues[searchKey]}
                    options={self.initSelectOptions[optionsKey]}
                    onChange={action(value => {self.searchValues[searchKey] = value})}
                >
                </Select>);
            }
        }
    }
    constructor(props: any, state: any) {
        super(props, state);
        this.searchPanel.init({
            fieldConfig: {
                colSpan: 8,
                config: {
                    name: {
                        label: '名称',
                        // suggest
                        component: this.reactDom
                    },
                    code: {
                        label: '编码',
                        // suggest
                        component: this.reactDom
                    },
                    enableFlags: {
                        label: '状态',
                        // select多选
                        component: this.renderSelect('dataStatus', 'enableFlags'),
                    },
                    bIds: {
                        label: '关联状态', // 多选
                        component: this.renderSelect('relatedBillStatus', 'bIds'),
                    },
                    resultIds: {
                        label: '关联结果', // suggest多选
                        component: this.reactDom
                    }
                },
                order: [
                    ['name', 'code', 'enableFlags'],
                    ['bIds', 'resultIds']
                ]
            },
            onSearch: this.handleSearch,
            onReset: this.handleReset
        });
        this.getTableDataService();
        this.getSelectOptions();
    }

    render() {
        return (
            <div styleName={'page-user-list'}>

                <div>
                    {this.searchPanel.render()}
                </div>
                <div>
                    <div styleName={'list-action'}>
                        <div styleName={'action-left'}>
                            <Button type='important' onClick={action(e => {this.modalVisible = true})}>
                                新增
                            </Button>
                        </div>
                        <div styleName={'action-right'}>
                            <Button>导出</Button>
                        </div>
                    </div>
                    {initTaskTable(
                        this.tableData,
                        this.handleView,
                        this.onChangePageNum,
                        this.onChangePageSize,

                    ).render()}
                </div>
                <Dialog
                    size={'lg'}
                    headline={'新增任务活动管理'}
                    actionsAlign='center'
                />
                {
                    this.modalVisible ?
                        <EditModal
                            visible={this.modalVisible}
                            selectOptions={this.initSelectOptions}
                            handelCancel={action(() => this.modalVisible = false)}
                            handleConfirm={this.handelEditConfirm}
                        />
                        : null
                }

                <ViewModal
                    visible={this.viewModalVisible}
                    viewFormValue={this.viewTaskFormData}
                    handelCancel={() => this.closeViewModal()}
                    handleConfirm={() => this.closeViewModal()}
                />
            </div>
        )
    }
}

export default PageUserList
