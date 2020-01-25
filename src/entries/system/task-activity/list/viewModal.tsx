import * as React from 'react';
import { computed, observable } from "mobx";
import {observer} from 'mobx-react';
import { Dialog } from "@befe/brick";
import {TaskListViewDialogModel} from '../TaskDataModel'
import { MyForm } from "../../../../components/form";
@observer
export class ViewModal extends React.Component<TaskListViewDialogModel> {
    @computed get basicForm() {
        const {
            name,
            code,
            billStatus,
            dataStatus,
            taskResults,
            remarks,
            startDate,
            endDate,
            sortNumber
        } = this.props.viewFormValue;
        return {
            sectionTitle: '基本详情',
            fieldSet: {
                name: {
                    label: '名称',
                    component: <label>{name}</label>,
                },
                code: {
                    label: '编码',
                    component: <label>{code}</label>,
                },
                lineStatus: {
                    label: '关联状态',
                    component: <label>{billStatus}</label>,
                },
                resultIds: {
                    label: '关联结果',
                    component: <label>{}</label>,
                },
                dataStatus: {
                    label: '状态',
                    component: <label>{dataStatus}</label>
                },
                startDate: {
                    label: '启用日期',
                    component: <label>{startDate}</label>
                },
                endDate: {
                    label: '启用日期',
                    component: <label>{endDate}</label>
                },
                sortNumber: {
                    label: '排序',
                    component: <label>{sortNumber}</label>
                },
                desc: {
                    label: '备注',
                    component: <label>{remarks}</label>,
                    colSpan: 24
                }
            },
            fieldsOrder: [
                ['code', 'name'],
                ['lineStatus', 'resultIds'],
                ['dataStatus', 'startDate'],
                ['desc']
            ],
            colSpan: 12
        }
    }
    @computed get extendForm() {
        const {
            imageSystemCode,
            staffCanSearch,
            canTransferShare,
            arrtibute1,
            arrtibute1Remarks,
            arrtibute2,
            arrtibute2Remarks,
            arrtibute3,
            arrtibute3Remarks,
            arrtibute4,
            arrtibute4Remarks,
            arrtibute5,
            arrtibute5Remarks
        } = this.props.viewFormValue;
        function getCodeToWord(key: string) {
            if (key.toUpperCase() === 'Y') {
                return '是';
            }
            else if(key.toUpperCase() === 'N') {
               return '否';
            }
            else {
                return key;
            }
        }
        return {
            sectionTitle: '扩展信息',
            colSpan: 12,
            fieldSet: {
                imageSystemCode: {
                    label: '影像状态代码',
                    component: <label>{imageSystemCode}</label>
                },
                staffCanSearch: {
                    label: '员工查询可见',
                    colSpan: 24,
                    component: <label>{getCodeToWord(staffCanSearch)}</label>

                },
                canTransferShare: {
                    label: '可转移分配',
                    colSpan: 24,
                    component: <label>{getCodeToWord(canTransferShare)}</label>

                },
                arrtibute1: {
                    label: '扩展字段1',
                    component: <label>{arrtibute1}</label>
                },
                arrtibute1Remarks: {
                    label: '字段1说明',
                    component: <label>{arrtibute1Remarks}</label>
                },
                arrtibute2: {
                    label: '扩展字段2',
                    component: <label>{arrtibute2}</label>
                },
                arrtibute2Remarks: {
                    label: '字段2说明',
                    component: <label>{arrtibute2Remarks}</label>
                },
                arrtibute3: {
                    label: '扩展字段3',
                    component: <label>{arrtibute3}</label>
                },
                arrtibute3Remarks: {
                    label: '字段3说明',
                    component: <label>{arrtibute3Remarks}</label>
                },
                arrtibute4: {
                    label: '扩展字段4',
                    component: <label>{arrtibute4}</label>
                },
                arrtibute4Remarks: {
                    label: '字段4说明',
                    component: <label>{arrtibute4Remarks}</label>
                },
                arrtibute5: {
                    label: '扩展字段5',
                    component: <label>{arrtibute5}</label>
                },
                arrtibute5Remarks: {
                    label: '字段5说明',
                    component: <label>{arrtibute5Remarks}</label>
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
    @computed get operationForm() {
        const {
            createdName,
            creationDate,
            lastUpdatedName,
            lastUpdateDate
        } = this.props.viewFormValue;
        return {
            sectionTitle: '操作信息',
            fieldSet: {
                createdName: {
                    label: '创建者',
                    component: <label>{createdName}</label>
                },
                creationDate: {
                    label: '创建时间',
                    component: <label>{creationDate}</label>
                },
                lastUpdatedName: {
                    label: '最新更新者',
                    component: <label>{lastUpdatedName}</label>
                },
                lastUpdateDate: {
                    label: '最新更新时间',
                    component: <label>{lastUpdateDate}</label>
                }
            },
            fieldsOrder: [
                ['createdName', 'creationDate'],
                ['lastUpdatedName', 'lastUpdateDate']
            ],
            colSpan: 12
        }
    }
    render() {
        let {visible, handelCancel, handleConfirm} = this.props;
        return (
            <Dialog
                size={'lg'}
                headline={'详情'}
                actionsAlign='center'
                visible={visible}
                onCancel={handelCancel}
                onConfirm={handleConfirm}
            >
                <MyForm {...this.basicForm}/>
                <MyForm {...this.extendForm}/>
                <MyForm {...this.operationForm}/>
            </Dialog>
        )
    }
}
