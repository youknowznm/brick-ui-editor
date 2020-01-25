import * as React from 'react'
import {ButtonProps, Switch, Dialog, Select, SelectValue} from '@befe/brick'
import {action, observable} from "mobx";
import {observer} from "mobx-react";
import {MyForm, TypeMyFormProps} from "../../../../../components/form";
import {initTextArea} from "../../../../../components/initComponent/init-text-area";
import {
    postDataAuthUsersSave,
    TypeDataAuthUsersSaveQuery
} from "../../../../../services/system/data-authority-management-api";

type TypeProps = {
    isShow: boolean
    onClose: () => void
}

@observer
export class AddUserModal extends React.PureComponent<TypeProps>{
    @observable
    baseData = {
        authName: '',
        remarks: ''
    };
    authNameSelectOpts = [
        {
            value: 'a',
            label: 'a',
        },
        {
            value: 'b',
            label: 'b'
        }
    ];
    @action
    setAuthNameSelect = (value: SelectValue): void => {
        Object.assign(this.baseData, {authName: value});
    };
    renderSelect = (): {render: () => React.ReactElement;} => {
        const self = this;
        const setAuthNameSelect = this.setAuthNameSelect;
        return {
            render(): React.ReactElement {
                return (<Select
                    value={self.baseData.authName}
                    options={self.authNameSelectOpts}
                    onChange={setAuthNameSelect}
                    size={'md'}
                >
                </Select>);
            }
        }
    }
    baseForm: TypeMyFormProps = {
        sectionTitle: '基本信息',
        fieldSet: {
            'authName': {
                label: '名称',
                component: this.renderSelect(),
                colSpan: 12
            },
            'remarks': {
                label: '备注',
                component: initTextArea(this.baseData, {key: 'remarks'}),
                colSpan: 24
            },
        },
        fieldsOrder: [
            [
                'authName',
            ],
            ['remarks']
        ]
    };

    saveAddUser = (): void => {
        // const data: TypeDataAuthUsersSaveQuery = {
        //     infoId: 'dbed2015f71abf093d7c52c67b315577',
        //     confirmed: 'Y',
        //     users: [
        //         {
        //             "userUuap":"lixiang47",
        //             "userName":"李翔",
        //             "userEmail":"lixiang@baidu.com",
        //             "userId": 111,
        //             "dataStatus":"ENABLED"
        //         }
        //     ]
        // };
        // postDataAuthUsersSave(data).then(res => {
        //     console.log(res)
        // });
        this.props.onClose();
    };

    render() {
        return (
            <Dialog
                headline={'新增'}
                size={'md'}
                visible={this.props.isShow}
                onCancel={this.props.onClose}
                onConfirm={this.saveAddUser}
            >
                <MyForm {...this.baseForm} />

            </Dialog>
        );
    }
}

