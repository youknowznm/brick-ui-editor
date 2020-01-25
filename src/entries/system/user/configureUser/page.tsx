import * as React from 'react';
import {inject, observer} from 'mobx-react';
import './style.mod.scss';
import { Button, CloseX, Input, Pagination, Switch, Tabs } from "@befe/brick";
import {SvgPlus} from '@befe/brick-icon';
import { action, computed, observable } from 'mobx';
import {getUserConfigure, getUserTableData} from 'src/services/system/user-api'
import {MyForm} from 'src/components/form/index';
import {initGroupTable, initRoleTable} from './init-table'
import { SystemState } from '../../AppState';
import {AddRolesModal} from './addRolesModal'
import { basicDataModel, paginationModel } from '../UserDataModel';
type configProps = {
    userUuap: string,
    businessGroup: string
}
@inject('app')
@observer
export class PageConfigureUser extends React.Component<{config: configProps}> {
    @observable switchValue: boolean = false;
    @observable paginationMsg:paginationModel = {
        total: undefined,
        pageNum: 1,
        pageSize: 10
    };
    @observable basicValues: basicDataModel = {
        userName: '',
        userUuap: '',
        userDepartment: '',
        inCompany: '',
        entryDate: '',
        leaveDate: '',
        createdName: '',
        lastUpdateDate: '',
        creationDate: '',
        lastUpdatedName: '',
        inUse: ''
    };
    @observable currentTabId: string | number = 'group';
    // searchPanel 字段
    @observable searchData = {
        userUuap: '',
        businessGroup: ''
    };
    @observable personalGroupData = [];
    // 已有角色list
    @observable hasRoleList = [
        {
            name: '会计'
        },
        {
            name: '初审扫描员'
        }
    ];
    @computed get formBasicProps() {
        return {
            fieldSet: {
                name: {
                    label: '姓名',
                    component: <label>{`${this.basicValues.userName}(${this.basicValues.userUuap} | ${this.basicValues.userDepartment || '-'})`}</label>
                },
                inServiceTime: {
                    label: '在职时间',
                    component: <label>{this.basicValues.entryDate}</label>
                },
                isInService: {
                    label: '是否在职',
                    component: <label>{this.basicValues.inCompany}</label>
                },
                status: {
                    label: '权限状态',
                    component: <label>{this.basicValues.inUse === 'Y' ? '已启用' : '未启用'}</label>
                }
            },
            fieldsOrder: [
                ['name', 'inServiceTime', 'isInService'],
                ['status']
            ]
        };
    }

    @computed get formOptionsProps() {
        return {
            fieldSet: {
                createdName: {
                    label: '创建者',
                    colSpan: 12,
                    component: <label>{this.basicValues.createdName}</label>
                },
                creationDate: {
                    label: '创建时间',
                    colSpan: 12,
                    component: <label>{this.basicValues.creationDate}</label>
                },
                lastUpdatedBy: {
                    label: '最新更新者',
                    colSpan: 12,
                    component: <label>{this.basicValues.lastUpdatedName}</label>
                },
                lastUpdateDate: {
                    label: '最新更新时间',
                    colSpan: 12,
                    component: <label>{this.basicValues.lastUpdateDate}</label>
                }
            },
            fieldsOrder: [
                ['createdName', 'creationDate'],
                ['lastUpdatedBy', 'lastUpdateDate']
            ]
        }
    }
    @action updateBasicMsg(data: basicDataModel) {
        this.basicValues = {...data}
    }

    @action switchClick = (checked:boolean) => {
        console.log('switch', this.switchValue);
        this.switchValue = checked
    };
    @action
    handelTabsChange = (id: string | number) => {
        this.currentTabId = id;
        let data = {};
        const {pageNum, pageSize} = this.paginationMsg
        switch (this.currentTabId) {
            case 'group':
                data = {
                    ...this.searchData,
                    showClose: this.switchValue ? 'Y' : '',
                    pageNum,
                    pageSize
                };
                break;
            case 'dataAuth':
                data = {
                    ...this.searchData,
                    showStop: this.switchValue,
                    pageNum,
                    pageSize
                };
                break;
            case 'role':
                data = {};
                break;
        }
        getUserTableData(id, data).then((resData: any) => {
            if (resData.id === 'group') {
                this.personalGroupData = resData.list
            }
        })
    };
    constructor(props: any) {
        super(props);
        this.searchData = {
            ...props.config
        };
        getUserConfigure({
            userUuap: props.config.userUuap,
            businessGroup: props.config.businessGroup
        }).then((resData: any) => {
            this.updateBasicMsg(resData);
        });
        this.handelTabsChange(this.currentTabId)
    }
    renderGridTitle(titleText: string, component?: any) {
        return (
            <div styleName={'title-wrapper'}>
                <div styleName={'title-inner'}>
                    <span>{titleText}</span>
                    {component && <div styleName={'title-options'}>{component}</div>}
                </div>
            </div>
        )
    }
    renderButton() {
        return (
            <div styleName={'show-switch'}>
                <p>{'显示停用'}</p>
                <Switch
                    size={'md'}
                    defaultChecked={false}
                    checked={this.switchValue}
                    checkedLabel={'开'}
                    uncheckedLabel={'关'}
                    onChange={(checked: boolean) => this.switchClick(checked)}
                />
            </div>
        );
    }

    // tab列表添操作
    renderAddSuggest() {
        return (
            <div styleName={'tab-operation'}>
                <Input placeholder={'请输入'}/>
                <Button
                    type={'important'}
                    icon={SvgPlus}>{'添加'}</Button>
            </div>
        )
    }

    renderRoleContent() {
        return (
            <div>
                <div styleName={'role-list'}>
                    <span styleName={'own-role'}>{'已有角色'}</span>
                    {this.hasRoleList.map((col, idx) => {
                        return (
                            <span key={idx} styleName={'role-tag'}>
                                {col.name}
                            </span>
                        )
                    })}
                    <Button
                        type={'important'}
                        icon={SvgPlus}>{'添加'}</Button>
                </div>
                {initRoleTable().render(this.personalGroupData)}
            </div>
        )
    }

    renderGroupContent() {
        return (
            <div>
                {this.renderAddSuggest()}
                {initGroupTable().render(this.personalGroupData)}
            </div>
        )
    }
    renderDataAuth() {
        return (
            <div>
                {this.renderAddSuggest()}
            </div>
        )
    }
    render() {
        const panes = [
            {
                id: "role",
                label: "角色",
                content: this.renderRoleContent()
            },
            {
                id: "group",
                label: "用户组",
                content: this.renderGroupContent()
            },
            {
                id: 'dataAuth',
                label: '数据权限角色',
                content: this.renderDataAuth()
            }
        ];
        return (
            <div styleName={'page-configure-user'}>
                <p styleName={'page-title'}>{'用户配置'}</p>
                {this.renderGridTitle('基本信息')}
                <MyForm {...this.formBasicProps }/>
                {this.renderGridTitle('操作信息')}
                <MyForm {...this.formOptionsProps}/>
                {this.renderGridTitle('配置规则', this.renderButton())}
                <Tabs
                    panes={panes}
                    defaultActiveId={this.currentTabId}
                    onChange={this.handelTabsChange}
                />
                <div>
                    <Pagination
                        {...this.paginationMsg}
                        onChangePageNum={action((num: number | undefined) => {
                            this.paginationMsg.pageNum = num;
                        })}
                        onChangePageSize={action((pageSize: number | undefined) => {
                            this.paginationMsg.pageSize = pageSize;
                        })}
                    />
                </div>
            </div>
        )
    }
}

export default PageConfigureUser
