import * as React from 'react';
import {Button, CloseX, Input, Modal, PaginationProps, TableRow} from "@befe/brick";
import {observer} from "mobx-react";
import {action, computed, observable} from "mobx";
import {getConfigureUserGroup, userGroupAddUser} from "../../../../../services/system/user-group-api";
import {TypeUserGroupList, TypeUserGroupRecordVO} from "./model";
import {ConfigureGroupTable} from "./userConfigureTable";
import {MySection} from "../../../../../components/section";
import {MyForm, TypeMyFormProps} from "../../../../../components/form";
import {initPagination} from "../../../../../components/initComponent/init-pagination";
import {initLabel} from "../../../../../components/initComponent/init-label";
import './style.mod.scss'

type TypeUserConfigureProps = {
    isShow: boolean
    onClose: () => void
    groupData: {
        groupCode: string
        businessGroup: string
        groupName?: string
        showClose?: string
    }
}

const DEFAULT_PAGINATION_PROPS = {
    total: 0,
    pageSize: 10,
    pageNum: 1,
};


@observer
export class UserConfigure extends React.PureComponent<TypeUserConfigureProps> {
    render(): React.ReactElement | null {
        return this.props.isShow ? (
            <Modal
                visible={this.props.isShow}
            >
                <div styleName={'page-window-user-configure'}>
                    <CloseX onClick={this.props.onClose} styleName={'window-close-x'} />
                    <WindowContent {...this.props} />
                </div>
            </Modal>
        ) : null
    }
}

@observer
class WindowContent extends React.PureComponent<TypeUserConfigureProps> {
    @observable pageData: TypeUserGroupList = {
        groupName: '',
        groupCode: '',
        remark: '',
        createdName: '',
        creationDate: '',
        lastUpdatedName: '',
        lastUpdateDate: '',
        userGroupRecordVOS: []
    };

    @computed
    public get tableData(): Array<TypeUserGroupRecordVO> | TableRow[] {
        return this.pageData.userGroupRecordVOS;
    }

    @computed
    get baseFormProps(): TypeMyFormProps {
        return {
            sectionTitle: '基本信息',
            fieldSet: {
                'groupName': {
                    label: '名称',
                    component: initLabel(this.pageData, {key: 'groupName'}),
                    colSpan: 6
                },
                'groupCode': {
                    label: '编码',
                    component: initLabel(this.pageData, {key: 'groupCode'}),
                    colSpan: 6
                },
                'remark': {
                    label: '备注',
                    component: initLabel(this.pageData, {key: 'remark'}),
                    colSpan: 24
                },
            },
            fieldsOrder: [
                [
                    'groupCode',
                    'groupName',
                ],
                ['remark']
            ]
        }
    }

    @computed
    get operationFormProps(): TypeMyFormProps {
        return {
            sectionTitle: '操作信息',
            fieldSet: {
                'createdName': {
                    label: '创建者',
                    component: initLabel(this.pageData, {key: 'createdName'}),
                    colSpan: 6
                },
                'creationDate': {
                    label: '创建时间',
                    component: initLabel(this.pageData, {key: 'creationDate'}),
                    colSpan: 6
                },
                'lastUpdatedName': {
                    label: '最新更新者',
                    component: initLabel(this.pageData, {key: 'lastUpdatedName'}),
                    colSpan: 6
                },
                'lastUpdateDate': {
                    label: '最新更新时间',
                    component: initLabel(this.pageData, {key: 'lastUpdateDate'}),
                    colSpan: 6
                },
            },
            fieldsOrder: [
                [
                    'createdName',
                    'creationDate',
                ],
                [
                    'lastUpdatedName',
                    'lastUpdateDate',
                ]
            ]
        }
    }

    /**
     * todo
     */
    private searchPageData(): void {
        const {groupCode, businessGroup} = this.props.groupData;
        getConfigureUserGroup({
            groupCode,
            businessGroup
        }).then(action(
            (res: TypeUserGroupList) => {
                console.log(res);
                Object.assign(this.pageData, res);
                Object.assign(this.paginationProps, {
                    total: res.total ? +res.total : 0
                })
            }
        ))
    }

    /**
     * todo
     */
    onAddUserClick = (): void => {
        userGroupAddUser({}).then(action(
            res => {
                console.log(res);
                this.searchPageData();
            }
        ))
    };

    changeUserStatus = (user: TypeUserGroupRecordVO): void => {
        console.log(user)
    };

    /** pagination **/
    @observable
    paginationProps: PaginationProps = Object.assign({
        disabled: false
    }, DEFAULT_PAGINATION_PROPS);
    pagination = initPagination(this.paginationProps, this.searchPageData);
    @action
    setPaginationProps = (paginationProps: PaginationProps): void => {
        Object.assign(this.paginationProps, paginationProps);
    };

    constructor(props: any) {
        super(props);

        this.searchPageData();
    }

    /**
     * todo: 添加用户-样式
     */
    render(): React.ReactNode {
        return (
            <div styleName={'page-configure-group'}>
                <MyForm {...this.baseFormProps} />
                <MyForm {...this.operationFormProps} />
                <MySection title={'用户信息'}>
                    <div style={{paddingBottom: 15}}>
                        <div style={{width: 150, float: "left", marginRight: 10}}>
                            <Input defaultValue={'suggest'}/>
                        </div>
                        <Button onClick={this.onAddUserClick}>添加</Button>
                    </div>
                    <ConfigureGroupTable
                        tableData={this.tableData.slice() as TableRow[]}
                        pageSize={this.paginationProps.pageSize!}
                        pageNum={this.paginationProps.pageNum!}
                        changeUserStatus={this.changeUserStatus}
                    />
                    {this.pagination.render()}
                </MySection>
            </div>
        )
    }
}