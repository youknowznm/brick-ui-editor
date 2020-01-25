import * as React from 'react';
import './style.mod.scss'
import {Button, CloseX, Modal, Switch} from "@befe/brick";
import {
    DataAuthUsersVO,
    getAuthUserConfigurePage, postDataAuthUsersView,
    TypeAuthUserConfigurePageData, TypeDataAuthUsersViewQuery
} from "../../../../../services/system/data-authority-management-api";
import {MyForm, TypeMyFormProps} from "../../../../../components/form";
import {observer} from "mobx-react";
import {action, computed, observable} from "mobx";
import {MySection} from "../../../../../components/section";
import {UserConfigureTable} from './UserConfigureTable';
import {initSelect} from "../../../../../components/initComponent";
import {AddUserModal} from "./addUserModal";

type TypeUserConfigureProps = {
    isShow: boolean
    onClose: () => void
    infoId: string
    data: TypeAuthUserConfigurePageData
}

@observer
export class UserConfigure extends React.PureComponent<TypeUserConfigureProps> {
    render(): React.ReactElement | null {
        return this.props.isShow ? (<Window {...this.props} />) : null
    }
}

@observer
class Window extends React.PureComponent<TypeUserConfigureProps> {

    switchChecked = false;
    @observable
    isAddUserShow = false;
    @observable
    dataAuthDetail: TypeAuthUserConfigurePageData = {
        authName: '',
        remarks: '',
        createdName: '',
        creationDate: '',
        lastUpdatedName: '',
        lastUpdateDate: '',
    };
    @observable
    tableData: DataAuthUsersVO[] = [];

    @action
    openAddUser = (): void => {
        this.isAddUserShow = true;
    };
    @action
    closeAddUser = (): void => {
        this.isAddUserShow = false;
    };
    @action
    setDataAuthDetail = (dataAuthDetail: TypeAuthUserConfigurePageData): void => {
        Object.assign(this.dataAuthDetail, dataAuthDetail);
    };
    @action
    setTableData = (data: DataAuthUsersVO[]): void => {
        this.tableData = data;
    };
    getPageDetail = (): void => {
        getAuthUserConfigurePage({
            infoId: this.props.infoId
        }).then(res => {
            this.setDataAuthDetail(res);
            this.updateTable();
        })
    };
    updateTable = (): void => {
        const data: TypeDataAuthUsersViewQuery = {
            infoId: this.props.infoId,
            showStop: this.switchChecked,
            pageNum: 1,
            pageSize: 10
        };
        postDataAuthUsersView(data).then(res => {
            console.log(res.list);
            this.setTableData(res.list as DataAuthUsersVO[]);
        })
    };

    @computed
    get baseFormProps(): TypeMyFormProps {
        const data = this.dataAuthDetail;
        return {
            sectionTitle: '基本信息',
            fieldSet: {
                'authName': {
                    label: '名称',
                    component: <label>{data.authName}</label>,
                    colSpan: 6
                },
                'remarks': {
                    label: '备注',
                    component: <label>{data.remarks}</label>,
                    colSpan: 24
                },
            },
            fieldsOrder: [
                [
                    'authName',
                ],
                ['remarks']
            ]
        }
    }

    @computed
    get operationFormProps(): TypeMyFormProps {
        console.log('operationFormProps:', this.dataAuthDetail.authName);
        const data = this.dataAuthDetail;
        return {
            sectionTitle: '操作信息',
            fieldSet: {
                'createdName': {
                    label: '创建者',
                    component: <label>{data.createdName}</label>,
                    colSpan: 6
                },
                'creationDate': {
                    label: '创建时间',
                    component: <label>{data.creationDate}</label>,
                    colSpan: 6
                },
                'lastUpdatedName': {
                    label: '最新更新者',
                    component: <label>{data.lastUpdatedName}</label>,
                    colSpan: 6
                },
                'lastUpdateDate': {
                    label: '最新更新时间',
                    component: <label>{data.lastUpdateDate}</label>,
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

    onSwitchChange = (checked: boolean): void => {
        this.switchChecked = checked;
        this.updateTable();
    };

    constructor(props: TypeUserConfigureProps) {
        super(props);

        this.getPageDetail();
    }
    render() {
        return (
            <Modal
                visible={this.props.isShow}
            >
                <div styleName={'page-window-user-configure'}>
                    <CloseX onClick={this.props.onClose} styleName={'window-close-x'} />
                    <MyForm {...this.baseFormProps} />
                    <MyForm {...this.operationFormProps} />
                    <MySection title={'用户列表'}>
                        <div styleName={'record-switch'}>
                            <span>显示停用记录</span>
                            <Switch
                                size={'md'}
                                checkedLabel={'开'}
                                uncheckedLabel={'关'}
                                defaultChecked={false}
                                onChange={this.onSwitchChange}
                            />
                        </div>
                        <Button onClick={this.openAddUser} >新增</Button>
                        <UserConfigureTable
                            data={this.tableData}
                            methods={{}}
                            pageNum={1}
                            pageSize={10}
                        />
                    </MySection>
                    <AddUserModal isShow={this.isAddUserShow} onClose={this.closeAddUser} />
                </div>
            </Modal>
        )
    }
}