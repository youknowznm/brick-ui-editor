import * as React from 'react';
import {Dialog, Select} from '@befe/brick';
import { MyForm } from "../../../../components/form";
import {initTextInput} from 'src/components/initComponent/init-text-input'
import { observer } from "mobx-react";
import { action, computed, observable } from "mobx";
import './style.mod.scss';

import {TaskListDialogModel, TaskListSelectOptions, TaskModalFormValueModel} from '../TaskDataModel'
import { initTextArea } from "../../../../components/initComponent/init-text-area";

@observer
export class EditModal extends React.Component<TaskListDialogModel> {
    @action getDefaultValue() {
        return {
            name: '',
            code: '',
            lineStatus: '',
            resultIds: [],
            bId: '',
            dataStatus: '',
            startDate: '',
            endDate: '',
            sortNumber: '',
            remarks: '',
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
        }
    }
    @observable formValues:TaskModalFormValueModel = this.getDefaultValue();
    selectOptions:TaskListSelectOptions = {
        dataStatus: [],
        relatedBillStatus: []
    };

    renderExtends(key: string, hint: string) {
        return (
            <div styleName={'extend-item'}>
                {initTextInput(this.formValues, {key, placeholder: '请输入'}).render()}
                <span>{`注：${hint}`}</span>
            </div>
        )
    }
    // select渲染
    renderSelect(key: string, searchKey: string) {
        const self = this;
        return {
            render() {
                return (<Select
                    value={self.formValues[searchKey]}
                    options={self.selectOptions[key]}
                    onChange={action(value => {self.formValues[searchKey] = value})}
                >
                </Select>);
            }
        }
    }
    @computed get basicForm() {
        this.selectOptions = {...this.props.selectOptions};
        return {
            sectionTitle: '基本信息',
            fieldSet: {
                name: {
                    label: '名称',
                    component: initTextInput(this.formValues, {key: 'name'}),
                    colSpan: 12,
                    required: true
                },
                code: {
                    label: '编码',
                    component: initTextInput(this.formValues, {key: 'code'}),
                    colSpan: 12,
                    required: true
                },
                lineStatus: {
                    label: '关联状态',
                    component: this.renderSelect('relatedBillStatus', 'bId'),
                    colSpan: 12,
                    required: true
                },
                resultIds: {
                    label: '关联结果',
                    component: 'suggest多选',
                    colSpan: 12
                },
                dataStatus: {
                    label: '状态',
                    component: this.renderSelect('dataStatus', 'dataStatus'),
                    colSpan: 12
                },
                startDate: {
                    label: '启用日期',
                    component: '',
                    colSpan: 12
                },
                endDate: {
                    label: '启用日期',
                    component: '',
                    colSpan: 12
                },
                sortNumber: {
                    label: '排序',
                    component: initTextInput(this.formValues, {key: 'sortNumber'}),
                    colSpanL: 12
                },
                desc: {
                    label: '备注',
                    component: initTextArea(this.formValues, {key: 'remarks'}),
                    colSpan: 24
                }
            },
            fieldsOrder: [
                ['code', 'name'],
                ['lineStatus', 'resultIds'],
                ['dataStatus', 'startDate'],
                ['desc']
            ]
        }
    }
    @computed get extendForm() {
        return {
            sectionTitle: '扩展信息',
            fieldSet: {
                imageSystemCode: {
                    label: '影像状态代码',
                    colSpan: 24,
                    component: this.renderExtends('scan', '与影像平台进行状态握手的编码')
                },
                staffCanSearch: {
                    label: '员工查询可见',
                    colSpan: 24,
                    component: this.renderExtends('staffCanSearch', '与新付款平台进行状态握手的编码，活动变为配置为Y的活动时需要返回')

                },
                canTransferShare: {
                    label: '可转移分配',
                    colSpan: 24,
                    component: this.renderExtends('canTransferShare', '当单据处于配置为Y的活动时，才可进行任务转移')

                },
                arrtibute1: {
                    label: '扩展字段1',
                    colSpan: 12,
                    component: initTextInput(this.formValues, {key: 'arrtibute1'})
                },
                arrtibute1Remarks: {
                    label: '字段1说明',
                    colSpan: 12,
                    component: initTextInput(this.formValues, {key: 'arrtibute1Remarks'})
                },
                arrtibute2: {
                    label: '扩展字段2',
                    colSpan: 12,
                    component: initTextInput(this.formValues, {key: 'arrtibute2'})
                },
                arrtibute2Remarks: {
                    label: '字段2说明',
                    colSpan: 12,
                    component: initTextInput(this.formValues, {key: 'arrtibute2Remarks'})
                },
                arrtibute3: {
                    label: '扩展字段3',
                    colSpan: 12,
                    component: initTextInput(this.formValues, {key: 'arrtibute3'})
                },
                arrtibute3Remarks: {
                    label: '字段3说明',
                    colSpan: 12,
                    component: initTextInput(this.formValues, {key: 'arrtibute3Remarks'})
                },
                arrtibute4: {
                    label: '扩展字段4',
                    colSpan: 12,
                    component: initTextInput(this.formValues, {key: 'arrtibute4'})
                },
                arrtibute4Remarks: {
                    label: '字段4说明',
                    colSpan: 12,
                    component: initTextInput(this.formValues, {key: 'arrtibute4Remarks'})
                },
                arrtibute5: {
                    label: '扩展字段5',
                    colSpan: 12,
                    component: initTextInput(this.formValues, {key: 'arrtibute5'})
                },
                arrtibute5Remarks: {
                    label: '字段5说明',
                    colSpan: 12,
                    component: initTextInput(this.formValues, {key: 'arrtibute5Remarks'})
                },

            },
            fieldsOrder: [
                ['imageSystemCode'],
                ['staffCanSearch'],
                ['canTransferShare'],
                ['arrtibute1', 'arrtibute1Remarks'],
                ['arrtibute2', 'arrtibute2Remarks'],
                ['arrtibute3', 'arrtibute3Remarks'],
                ['arrtibute4', 'arrtibute4Remarks'],
                ['arrtibute5', 'arrtibute5Remarks']
            ]
        }
    }
    constructor(props: any) {
        super(props);
        this.getDefaultValue();
    }
    render() {
        let {visible, handelCancel, handleConfirm} = this.props;
        return (
            <Dialog
                size={'lg'}
                headline={'新增'}
                actionsAlign='center'
                visible={visible}
                onCancel={() => {
                    handelCancel();
                }}
                onConfirm={() => handleConfirm(this.formValues)}
            >
                <MyForm {...this.basicForm}/>
                <MyForm {...this.extendForm}/>
            </Dialog>
        )
    }
}
