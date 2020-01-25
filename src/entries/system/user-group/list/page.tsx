import React, {ChangeEvent, ReactNode} from 'react'
import {inject, observer} from 'mobx-react';
import {SystemState} from '../../AppState';
import {action, observable} from 'mobx';
import {Button, Input, PaginationProps, TableRow, toast} from '@befe/brick'
import {UserGroupTableList} from './userGroupTable'
import {getUserGroup, postDeleteUserGroup, postEditUserGroup} from '../../../../services/system/user-group-api';
import {getCurrentUser, postSuggest} from '../../../../services/common-api';
import {UserGroupListModals} from "./userGroupListModals";
import {initTextInput} from "../../../../components/initComponent";
import {initTextArea} from "../../../../components/initComponent/init-text-area";
import {TypeMyFormProps} from "../../../../components/form";
import {createSearchPanel} from "../../../../components/SearchPanel/creat-search-panel";
import './style.mod.scss'
import {initPagination} from "../../../../components/initComponent/init-pagination";
import {StringKeyMap} from "../../../../utils";
import {AddUserModal} from "./addUserGroupModal";
import {initLabel} from "../../../../components/initComponent/init-label";
import {UserConfigure} from "./userConfigure";

export const MODAL_ADD_NEW_GROUP = 'addNewGroup';
export const MODAL_EDIT = 'edit';

export interface SingleData {
    gId?: number
    groupCode?: string	//用户组编号
    groupName?: string	//用户组名称
    remark?: string	//备注
    inUse?: string	//是否删除
    createBy?: string	//创建者
    creationTime?: string	//创建时间
    lastUpdateBy?: string	//最新更新者
    lastUpdateTime?: string	//最新更新时间
    openUsers?: number	//启用成员数量
    closeUsers?: number  //停用成员数量
    businessGroup: string
    options: Array<string>
}

type TypeSearchData = {
    groupName: string
    groupCode: string
    member: string
}
type TypePageProps = { app: SystemState | undefined; }

const EMPTY_SEARCH_DATA: TypeSearchData = {
    groupName: '',
    groupCode: '',
    member: '',
};

const DEFAULT_PAGINATION_PROPS = {
    total: 0,
    pageSize: 10,
    pageNum: 1,
};



@inject('app')
@observer
export class UserGroupList extends React.PureComponent<TypePageProps> {
    @observable
    searchData: TypeSearchData = EMPTY_SEARCH_DATA;
    @observable
    modalsOpts = {
        isModalVisible: false,
        viewModal: ''
    };
    @observable
    isAddUserGroupShow = false;
    @observable
    editModalData = {
        groupName: '',
        groupCode: '',
        remark: '',
        businessGroup: ''
    };

    searchPanel = createSearchPanel();

    @action
    openAddUserGroup = (): void => {
        this.isAddUserGroupShow = true;
    };
    @action
    close = (): void => {
        this.modalsOpts.isModalVisible = false;
    };
    @action
    closeAddUserGroup = (): void => {
        this.isAddUserGroupShow = false;
    };
    modalEditConfirm = (): void => {
        console.log('edit ok');
        const data = {
            groupCode: this.editModalData.groupCode,
            groupName: this.editModalData.groupName,
            remark: this.editModalData.remark,
            bussinessGroup: this.editModalData.businessGroup
        };
        postEditUserGroup(data).then(res => {
           console.log(res);
           if (res.code !== 200) {
               toast.error(res.message);
           }
        });

        this.close();
    };
    editModalFormsConfig: TypeMyFormProps[] = [
        {
            fieldSet: {
                groupName: {
                    label: '名称',
                    component: initTextInput(this.editModalData, {key: 'groupName'}),
                    colSpan: 12
                },
                groupCode: {
                    label: '编码',
                    component: initLabel(this.editModalData, {key: 'groupCode'}),
                    colSpan: 12
                },
                remark: {
                    label: '备注',
                    component: initTextArea(this.editModalData, {key: 'remark'}),
                    colSpan: 24
                }
            },
            fieldsOrder: [
                [
                    'groupName',
                    'groupCode'
                ],[
                    'remark'
                ]
            ]
        }
    ];
    modalsRenderer = UserGroupListModals(
        {
            [MODAL_EDIT]: {
                modalTitle: '编辑',
                forms: this.editModalFormsConfig,
                onConfirm: this.modalEditConfirm
            }
        },
        this.modalsOpts
    );
    @action
    open = (modalName: string, data?: any): void => {
        this.modalsOpts.isModalVisible = true;
        this.modalsOpts.viewModal = modalName;

        if (modalName === MODAL_EDIT) {
            const {userGroup} = data;
            Object.assign(this.editModalData, userGroup);
        }
    };

    /** Table **/
    @observable
    tableData: TableRow[] = []
    get getSearchValue(): object{
        const value: StringKeyMap<any> = Object.assign({}, this.searchData);
        Object.keys(value).map(key => {
            value[key] = value[key] === '' ? null : value[key];
        });
        return value;
    }
    get getPaginationValue(): object {
        return {
            pageSize: this.paginationProps.pageSize,
            pageNum: this.paginationProps.pageNum
        };
    }
    @action
    setTableData = (tableData: TableRow[]): void => {
        this.tableData = tableData;
    };
    @action
    searchUserGroup = (): void => {
        /**
         * @todo: userUuap suggest,
         * userUuap不可以传空
         */
        postSuggest({
            keyWord: this.searchData.member,
            pageSize: 20,
            dataType: 'USER',
        }).then((suggestRes: any) => {
            // console.log(suggestRes);
            const suggestUuap = suggestRes
                ? (suggestRes[0] ? suggestRes[0].uuap : null)
                : (this.searchData.member === '' ? null : this.searchData.member);
            const data = {
                ...this.getSearchValue,
                ...this.getPaginationValue
            };
            Object.assign(data, {userUuap: suggestUuap});
            getUserGroup(data).then((res: any) => {
                // console.log(res);
                this.setTableData(res.data.list as TableRow[]);
                Object.assign(this.paginationProps, {total: +res.data.total});
            });
        });

    };
    @action
    resetSearchData = (): void => {
        Object.assign(this.searchData, EMPTY_SEARCH_DATA);
    };
    deleteUserGroup = (userGroup: SingleData): void => {
        const data = {
            "confirmed":"N",
            "groupCode": userGroup.groupCode,
            "businessGroup": userGroup.businessGroup,
        };
        postDeleteUserGroup(data).then(res => {
            if (res.code === 200) {
                toast.success(res.message);
            }
            else {
                toast.warning(res.message);
            }
        });
    };

    /**  Pagination  **/
    @observable
    paginationProps: PaginationProps = Object.assign({
        disabled: false
    }, DEFAULT_PAGINATION_PROPS);
    pagination = initPagination(this.paginationProps, this.searchUserGroup);
    @action
    setPaginationProps = (paginationProps: PaginationProps): void => {
        Object.assign(this.paginationProps, paginationProps);
    };

    /** UserConfigure **/
    @observable
    isShowUserConfigure = false;
    @observable
    windowUserConfigureData = {
        groupCode: '',
        businessGroup: '',
    };

    @action
    openUserConfigure = (group: SingleData): void => {
        Object.assign(this.windowUserConfigureData, {
            groupCode: group.groupCode,
            businessGroup: group.businessGroup,
        });
        this.isShowUserConfigure = true;
    };
    @action
    closeUserConfigure = (): void => {
        this.isShowUserConfigure = false;
    };

    constructor(props: TypePageProps) {
        super(props);

        this.searchUserGroup();

        this.searchPanel.init({
            fieldConfig: {
                colSpan: 8,
                config: {
                    groupName: {
                        label: '用户组名称',
                        component: initTextInput(this.searchData, {key: 'groupName'}),
                    },
                    groupCode: {
                        label: '编码',
                        component: initTextInput(this.searchData, {key: 'groupCode'}),
                    },
                    member: {
                        label: '成员',
                        component: initTextInput(this.searchData, {key: 'member'})
                    }
                },
                order: [[
                    'groupName', 'groupCode', 'member'
                ]]
            },
            onSearch: this.searchUserGroup,
            onReset: this.resetSearchData
        });
    }

    public render(): ReactNode {
        return (
            <div styleName={'page-user-group-list'}>
                <div styleName={'search-panel'}>
                    {this.searchPanel.render()}
                </div>
                <div styleName='action-group'>
                    <Button
                        size={'md'}
                        onClick={this.openAddUserGroup}
                    >新增</Button>
                    <Button
                        size={'md'}
                        onClick={(): void => {
                        }}
                    >单据导出</Button>
                </div>
                <UserGroupTableList
                    data={this.tableData.slice()}
                    openModal={this.open}
                    openUserConfigure={this.openUserConfigure}
                    deleteUserGroup={this.deleteUserGroup}
                    pageNum={this.paginationProps.pageNum!}
                    pageSize={this.paginationProps.pageSize!}
                />
                {this.pagination.render()}
                {this.modalsRenderer.render()}
                <AddUserModal isShow={this.isAddUserGroupShow} onClose={this.closeAddUserGroup} />
                <UserConfigure
                    isShow={this.isShowUserConfigure}
                    onClose={this.closeUserConfigure}
                    groupData={this.windowUserConfigureData}
                />
            </div>
        )
    }
}

export default UserGroupList
