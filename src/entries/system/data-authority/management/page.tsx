import React, {ChangeEvent, ReactNode} from 'react'
import {inject, observer} from 'mobx-react';
import {SystemState} from '../../AppState';
import {createSearchPanel} from "../../../../components/SearchPanel/creat-search-panel";
import {initSelect, initTextInput} from "../../../../components/initComponent";
import {action, observable, runInAction} from "mobx";
import {Button, PaginationProps, toast} from '@befe/brick';
import {SvgFileAdd, SvgFileDataExport} from '@befe/brick-icon';
import {
    getDataAuthorityList,
    DataAuthVO,
    TypeDataAuthDeleteQuery,
    postDataAuthOperation,
    TypeDataAuthorityListQuery,
    TypeDataAuthorityOperationQuery,
    deleteDataAuth,
    getAuthUserConfigurePage, TypeAuthUserConfigurePageData
} from "../../../../services/system/data-authority-management-api";
import {DataAuthorityTable} from "./authorityManagementTable";
import {initPagination} from "../../../../components/initComponent/init-pagination";
import {InitFormModals} from "../../../../components/initComponent/init-form-modals";
import {TypeMyFormProps} from "../../../../components/form";
import {initTextArea} from "../../../../components/initComponent/init-text-area";
import {UserConfigure} from './userConfigure';
import './style.mod.scss'


type TypePageProps = { app: SystemState | undefined; }

const EMPTY_SEARCH_DATA = {
    authName: '',
    userName: '',
    userId: 0,
};

const DEFAULT_PAGINATION_PROPS = {
    total: 0,
    pageSize: 10,
    pageNum: 1,
};

export type TypeAuthData = {
    authName: string
    remarks: string
};
const EMPTY_AUTH_DATA = {
    authName: '',
    remarks: '',
};

export const MODAL_ADD_NEW = 'addAuthority';
export const MODAL_EDIT = 'editAuthority';

@inject('app')
@observer
export class DataAuthorityManagement extends React.PureComponent<TypePageProps> {
    /**  Basic  **/
    updateTableData = (): void => {
        const paginationQuery = this.paginationProps;
        const data: TypeDataAuthorityListQuery = {
            authName: this.searchQuery.authName,
            userUuap: this.searchQuery.userName,
            userId: this.searchQuery.userId,
            pageNum: paginationQuery.pageNum || 1,
            pageSize: paginationQuery.pageSize || 10
        };
        this.paginationProps.disabled = true;
        getDataAuthorityList({
            ...data
        }).then((res) => {
            this.setAuthorityListData(res.list || []);
            // @todo: pagination同步接口里的哪些数据
            // Object.keys(this.paginationProps).map((key: string): void => {
            //     this.paginationProps[key] = res.data[key];
            // });
            const total: string = res.total || '0';
            this.paginationProps.total = +total;
            this.paginationProps.disabled = false;
        });
    };

    /**  SearchPanel  **/
    searchPanel = createSearchPanel();
    searchQuery = Object.assign({}, EMPTY_SEARCH_DATA);
    @observable
    searchPanelInput = Object.assign({}, EMPTY_SEARCH_DATA);
    @action
    onSearchClick = (): void => {
        this.setPaginationProps(DEFAULT_PAGINATION_PROPS);
        Object.assign(this.searchQuery, this.searchPanelInput);
        //@todo: 赋值userId
        this.updateTableData();
    };
    @action
    onResetSearchPanel = (): void => {
        Object.assign(this.searchPanelInput, EMPTY_SEARCH_DATA);
    };

    /**  Pagination  **/
    @observable
    paginationProps: PaginationProps = Object.assign({
        disabled: false
    }, DEFAULT_PAGINATION_PROPS);
    pagination = initPagination(this.paginationProps, this.updateTableData);
    @action
    setPaginationProps = (paginationProps: PaginationProps): void => {
        Object.assign(this.paginationProps, paginationProps);
    };

    /**  SimpleModals: 新增、编辑  **/
    modalsRenderer: { render: () => React.ReactElement; };
    @observable
    modalsOpts = {
        isModalVisible: false,
        viewModal: ''
    };
    @observable
    addNewAuthorityModalData = Object.assign({}, EMPTY_AUTH_DATA);
    @observable
    editAuthorityModalData = Object.assign({infoId: ''}, EMPTY_AUTH_DATA);
    addAuthorityModalConfig: TypeMyFormProps[] = [
        {
            sectionTitle: '基本信息',
            fieldSet: {
                authName: {
                    label: '名称',
                    component: initTextInput(this.addNewAuthorityModalData, {key: 'authName'}),
                    colSpan: 12,
                    required: true,
                },
                remarks: {
                    label: '备注',
                    component: initTextArea(this.addNewAuthorityModalData, {key: 'remarks'}),
                    colSpan: 24
                }
            },
            fieldsOrder: [
                [
                    'authName'
                ], [
                    'remarks'
                ]
            ]
        }
    ];
    editAuthorityModalConfig: TypeMyFormProps[] = [
        {
            fieldSet: {
                authName: {
                    label: '名称',
                    component: initTextInput(this.editAuthorityModalData, {key: 'authName'}),
                    colSpan: 12,
                    required: true,
                },
                remarks: {
                    label: '备注',
                    component: initTextArea(this.editAuthorityModalData, {key: 'remarks'}),
                    colSpan: 24
                }
            },
            fieldsOrder: [
                [
                    'authName',
                ],[
                    'remarks'
                ]
            ]
        }
    ];
    @action
    closeSimpleModals = (): void => {
        this.modalsOpts.isModalVisible = false;
        Object.assign(this.addNewAuthorityModalData, EMPTY_AUTH_DATA);
        Object.assign(this.editAuthorityModalData, EMPTY_AUTH_DATA);
    };
    @action
    openSimpleModals = (
        modalName: string,
        authData: TypeAuthData = EMPTY_AUTH_DATA
    ): void => {
        this.modalsOpts.isModalVisible = true;
        this.modalsOpts.viewModal = modalName;
        Object.assign(this.editAuthorityModalData, authData);
    };
    onSimpleModelConfirm = (data: TypeDataAuthorityOperationQuery): void => {
        postDataAuthOperation(data).then( res => {
            if (res.code !== 200) {
                toast.warning(res.message, {
                    durationInMS: 5000,
                    manualClose: true
                });
            }
            else {
                this.closeSimpleModals();
            }
            this.updateTableData();
        });
    };
    onAddAuthConfirm = (): void => {
        if (this.addNewAuthorityModalData.authName === '') {
            toast.warning('名称不可为空', {
                manualClose: true,
                durationInMS: 0
            });
            return
        }
        this.onSimpleModelConfirm(this.addNewAuthorityModalData);
    };
    onEditAuthConfirm = (): void => {
        if (this.editAuthorityModalData.authName === '') {
            toast.warning('名称不可为空');
            return
        }
        this.onSimpleModelConfirm(this.editAuthorityModalData);
    };

    /**  UserConfigure窗口  **/
    @observable
    windowUserConfigureProps = {
        infoId: '',
        isShow: false,
        data: {}
    };
    @action
    onUserConfigureOpen = (infoId: string): void => {
        Object.assign(this.windowUserConfigureProps, {infoId, isShow: true});
    };
    @action
    onUserConfigureClose = (): void => {
        Object.assign(this.windowUserConfigureProps, {isShow: false});
    };
    @action
    setDataAuthDetail = (dataAuthDetail: TypeAuthUserConfigurePageData): void => {
        Object.assign(this.windowUserConfigureProps, {data: dataAuthDetail});
    };

    /**  Table  **/
    @observable
    authorityListData: Array<DataAuthVO> = [];
    @action
    setAuthorityListData = (authorityListData: Array<DataAuthVO>): void => {
        this.authorityListData = authorityListData;
    };
    deleteDataAuth = (infoId: string): void => {
        //@todo: 使用confirm
        const data: TypeDataAuthDeleteQuery = {
            infoId,
            confirmed: 'N'
        };
        deleteDataAuth(data).then(res => {
            console.log(res);
            this.updateTableData();
        })
    };
    modalsMethods = {
        openSimpleModal: this.openSimpleModals,
        deleteDataAuth: this.deleteDataAuth,
        openUserConfigure: this.onUserConfigureOpen,
    };

    /**  constructor  **/
    constructor(props: TypePageProps) {
        super(props);

        this.updateTableData();

        this.searchPanel.init({
            fieldConfig: {
                colSpan: 8,
                config: {
                    authName: {
                        label: '名称',
                        component: initTextInput(this.searchPanelInput, {key: 'authName'}),
                    },
                    userName: {
                        label: '用户',
                        component: initTextInput(this.searchPanelInput, {key: 'userName'}),
                    }
                },
                order: [[
                    'authName', 'userName'
                ]]
            },
            onSearch: this.onSearchClick,
            onReset: this.onResetSearchPanel
        });
        
        this.modalsRenderer = InitFormModals(
            {
                [MODAL_EDIT]: {
                    modalTitle: '编辑',
                    forms: this.editAuthorityModalConfig,
                    onConfirm: this.onEditAuthConfirm
                },
                [MODAL_ADD_NEW]: {
                    modalTitle: '新增',
                    forms: this.addAuthorityModalConfig,
                    onConfirm: this.onAddAuthConfirm
                }
            },
            this.modalsOpts
        );
    }

    public render(): ReactNode {
        return (
            <div styleName={'page-data-authority-management'}>
                {this.searchPanel.render()}
                <div styleName={'button-group'}>
                    <div styleName={'button-group-left'}>
                        <Button
                            type={'important'}
                            icon={SvgFileAdd}
                            onClick={(): void => {this.openSimpleModals(MODAL_ADD_NEW)}}
                        >
                            新增
                        </Button>
                    </div>
                    <div styleName={'button-group-right'}>
                        <Button icon={SvgFileDataExport}>导出</Button>
                    </div>
                </div>
                <DataAuthorityTable
                    data={this.authorityListData}
                    methods={this.modalsMethods}
                    pageNum={this.paginationProps.pageNum || 1}
                    pageSize={this.paginationProps.pageSize || 10}
                />
                {this.pagination.render()}
                {this.modalsRenderer.render()}
                <UserConfigure
                    {...this.windowUserConfigureProps}
                    onClose={this.onUserConfigureClose}
                />
            </div>
        )
    }
}

export default DataAuthorityManagement
