import * as React from 'react'
import {inject, observer} from 'mobx-react';
import { observable, action, computed } from 'mobx';
import { Input, Button, Select, Pagination, CloseX } from "@befe/brick";
import {initUserTable} from './userTable';
import {createSearchPanel} from 'src/components/SearchPanel/creat-search-panel';
import {SystemState} from '../../AppState';
import {initTextInput} from 'src/components/initComponent/index';
import './style.mod.scss'
import {getUserTableList, getSelectOptionsService} from '../../../../services/system/user-api';
import {PersonSearchModel, SelectOptionsModel, paginationModel} from '../UserDataModel';
import {PageConfigureUser} from '../configureUser';
import { AddRolesModal } from "../configureUser/addRolesModal";

function getDefaultSearchValue() {
    return {
        userUuap: '',
        groupCode: '',
        ruleId: '',
        userStatus: '',
        inCompany: '',
        businessGroup: '0'
    }
}
@inject('app') @observer
export class PageUserList extends React.Component<{app: SystemState;}> {
    searchPanel = createSearchPanel();
    @observable searchValues: PersonSearchModel = getDefaultSearchValue();
    @observable tableData = [];
    @observable paginationMsg:paginationModel = {
        total: undefined,
        pageNum: 1,
        pageSize: 10
    };
    @observable selectOptions:SelectOptionsModel = {
        jobStatus: [],
        roles: [],
        status: []
    };
    // 配置页弹窗是否展示
    @observable configIsOpen: boolean = false;
    
    configMsg = {
        userUuap: '',
        businessGroup: ''
    }
    handleSearch = () => {
        this.getTableDataService()
    }
    @action
    handleReset = () => {
        this.searchValues = getDefaultSearchValue();
    };
    getSearchValue = () => this.searchValues;
    @action
    getTableDataService() {
        return getUserTableList({
            ...this.searchValues,
            pageNum: this.paginationMsg.pageNum,
            pageSize: this.paginationMsg.pageSize
        }).then(action((resData: any) => {
            this.tableData = resData.list;
            this.paginationMsg = {
                total: resData.total,
                pageNum: resData.pageNum,
                pageSize: resData.pageSize
            }
        }))
    }
    @action
    getSelectOptions() {
        getSelectOptionsService().then(resData => {
            this.selectOptions = {
                ...this.selectOptions,
                ...resData
            }
        })
    }
    @action
    handleClickConfig = (userUuap: string, businessGroup: string) => {
        this.configMsg = {
            userUuap,
            businessGroup
        }
        this.configIsOpen = true;
    };

    // render search select
    renderSelect(key: string, searchKey: string) {
        const self = this;
        return {
            render() {
                return (<Select
                    placeholder={'请选择'}
                    value={self.searchValues[searchKey]}
                    options={self.selectOptions[key]}
                    onChange={action(value => {self.searchValues[searchKey] = value})}
                >
                </Select>);
            }
        }
    }
    reactDom = {
        render() {
            return(<div>{'suggest'}</div>)
        }
    }

    constructor(props: any, state: any) {
        super(props, state);
        this.searchPanel.init({
            fieldConfig: {
                colSpan: 8,
                config: {
                    person: {
                        label: '用户',
                        // suggest
                        component: initTextInput(this.getSearchValue, { key: 'userUuap' })
                    },
                    personalGroup: {
                        label: '用户组',
                        // suggest
                        component: this.reactDom
                    },
                    status: {
                        label: '状态',
                        component: this.renderSelect('status', 'userStatus')
                    },
                    roles: {
                        label: '角色',
                        component: this.renderSelect('roles', 'ruleId')
                    },
                    inCompany: {
                        label: '在职',
                        component: this.renderSelect('jobStatus', 'inCompany')
                    }
                },
                order: [
                    ['person', 'personalGroup', 'status'],
                    ['roles', 'inCompany']
                ]
            },
            onSearch: this.handleSearch,
            onReset: this.handleReset
        });
        this.getSelectOptions();
        this.getTableDataService();
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
                            <Input type='text' size='sm'/>

                            <Button type='important'>
                                添加
                            </Button>
                        </div>
                        <div styleName={'action-right'}>
                            <Button>单据导出</Button>
                        </div>
                    </div>
                    {initUserTable(this.tableData, this.handleClickConfig).render()}
                    <Pagination
                        {...this.paginationMsg}
                        onChangePageNum={action((num: number | undefined) => {
                            this.paginationMsg.pageNum = num;
                            this.getTableDataService();
                        })}
                        onChangePageSize={action((pageSize: number | undefined) => {
                            this.paginationMsg.pageSize = pageSize;
                            this.getTableDataService();
                        })}
                    />
                </div>
                {this.configIsOpen ?
                    <div>
                        <PageConfigureUser config={this.configMsg}/>
                        <CloseX onClick={action(e => {this.configIsOpen = false})}/>
                    </div>
                    : null}
                <AddRolesModal/>
            </div>
        )
    }
}

export default PageUserList
