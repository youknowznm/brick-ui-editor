/* eslint-disable */

import {
    Component,
    observer,
    inject,
    observable,
    computed,
    reaction,
    h,
    c,
    action,
    toJS,
    suh
} from '@befe/utils/dev-pattern-vm/index-pc-normal';
import PropTypes from 'prop-types';
import {PropTypes as MobxPropTypes} from 'mobx-react';

import Button from '@befe/erp-comps/v2/components/Button';
import Table from '@befe/erp-comps/v2/components/Table';
import Select from '@befe/erp-comps/v2/components/Select';
import Input from '@befe/erp-comps/v2/components/Input';
import Suggest from '@befe/erp-comps/v2/components/Suggest';
import Upload from '@befe/erp-comps/v2/components/Upload';
import FileList from '@befe/erp-comps/v2/components/FileList';
import TextArea from '@befe/erp-comps/v2/components/TextArea';
import Message from '@befe/erp-comps/v2/components/Message';
import SectionForm from '@befe/erp-comps/v2/components/SectionForm';
import Modal from '@befe/erp-comps/v2/components/Modal';
import {confirm} from '@befe/erp-comps/v2/components/ModalConfirm';

import {pcNormalAgentTheme as theme} from 'frontend/service/agent-theme/pc-normal-agent-theme';

import BillHeaderState from '../states/BillHeaderState';

import compStyle from '../style/bill-header.use.less';

const SECTION_NAME = 'bill-header';

@inject('app')
@observer
@suh(compStyle)
export default class BillHeader extends Component {

    static propTypes = {
    };

    local = {
        billHeaderState: new BillHeaderState(),
    };


    constructor(props) {
        super(props);
        const {local} = this;
        local.billHeaderState.addEditingFlagReaction(editingFlag => {
            props.app.root.activateSection(editingFlag ? SECTION_NAME : '');
        });
    }

    componentDidMount() {
        // this.local.billHeaderState.setProps({
        //     editingFlag: true,
        //     editingFlexValuesFlag: true,
        // })
        this.setPropBillHeaderToLocal();
    }

    setPropBillHeaderToLocal = () => {
        this.local.billHeaderState.setLocalBillHeader(this.props.billHeader);
    }

    componentDidUpdate() {}

    componentWillReceiveProps() {
        // if (newProps.billHeader.expenseBillNum !== this.props.billHeader.expenseBillNum) {
        //     this.setPropBillHeaderToLocal();
        // }
    }

    getFlexValueString = () => {
        const {localBillHeader} = this.local.billHeaderState;
        if (localBillHeader === null) {
            return '';
        }

        // const {descFlexColumns} = this.props;
        // descFlexColumns.forEach()
        let res = [];
        let flexCodeKey = '';
        let flexLabelKey = '';
        let flexCodeValue = '';
        let flexLabelValue = '';
        for (let i = 0; i < 10; i++) {
            flexCodeKey = `attribute${i + 1}`;
            flexLabelKey = `attribute${i + 1}Name`;
            flexCodeValue = '' + localBillHeader[flexCodeKey]; // '1001'
            flexLabelValue = '' + localBillHeader[flexLabelKey]; // '湖北项目35'
            res.push(flexLabelValue || flexCodeValue);
        }
        res = res.filter(item => item !== '');
        return res.join(', ');
    }

    // 展示用的表单项
    @computed
    get fieldSetForDisplay() {
        const {
            local,
            getFlexValueString,
            props
        } = this;
        const {billHeaderState} = local;
        const {
            localBillHeader,
            attachmentList
        } = billHeaderState;
        return {
            // 报销人
            payee: {
                type: 'text',
                value: localBillHeader._payee,
                label: '报销人'
            },
            // 提交人
            submitter: {
                type: 'text',
                value: localBillHeader._submitter,
                label: '提交人'
            },
            // 公司
            compCodeName: {
                type: 'text',
                value: localBillHeader.compCodeName,
                label: '公司'
            },
            // 提交人手机
            submitterMobile: {
                type: 'text',
                value: localBillHeader._mobileNumber,
                label: '提交人手机'
            },
            // 部门
            department: {
                type: 'text',
                value: localBillHeader._department,
                label: '部门'
            },
            // 提交人邮箱
            submitterEmail: {
                type: 'text',
                value: localBillHeader._submitterEmail,
                label: '提交人邮箱'
            },
            // 办公地点
            payeeLocation: {
                type: 'text',
                value: localBillHeader._payeeLocation,
                label: '办公地点'
            },
            // 提交日期
            submitDate: {
                type: 'text',
                value: localBillHeader.submitDate,
                label: '提交日期'
            },
            // 期间
            periodName: {
                type: 'text',
                value: localBillHeader.periodName,
                label: '期间'
            },
            // 附加信息
            flexValues: {
                render() {
                    return h.span('erp-static-text', {}, getFlexValueString());
                },
                label: '附加信息'
            },
            // 支付组
            payGroup: {
                render() {
                    return h.span('erp-static-text', {},
                        getItemLabelByValue(props.payGroupOptions, localBillHeader.payGroup)
                    );
                },
                label: '支付组'
            },
            // 完整标识
            completeCode: {
                render() {
                    return h.span('erp-static-text', {},
                        getItemLabelByValue(props.completeCodeOptions, localBillHeader.completeCode)
                    );
                },
                label: '完整标识'
            },
            // 报销说明
            description: {
                colSpan: 24,
                controlStyle: {
                    width: null
                },
                render() {
                    return h.span('erp-static-text', {}, localBillHeader.description);
                },
                label: '报销说明'
            }
        };
    }

    renderDisplayForm() {
        const {local} = this;
        const {billHeaderState} = local;
        return h.div('bill-header-form-wrap for-display', {},
            h(SectionForm, 'bill-header-form', {
                fieldSet: this.fieldSetForDisplay,
                fieldsOrder: [
                    ['payee', 'submitter'],
                    ['compCodeName', 'submitterMobile'],
                    ['department', 'submitterEmail'],
                    ['payeeLocation', 'submitDate'],
                    ['periodName', 'flexValues'],
                    ['payGroup'],
                    ['completeCode'],
                    ['description']
                ],
                labelStyle: {
                    width: '135px'
                },
                controlStyle: {
                    width: '300px'
                }
            }),
            h(Button, 'btn-top-right-edit', {
                icon: 'edit',
                size: 'small',
                type: 'bare',
                onClick: () => {
                    billHeaderState.setProps({
                        editingFlag: true
                    });
                }
            }, '编辑'),
        );
    }

    // 展示用的表单项
    @computed
    get fieldSetForEdit() {
        const {
            local,
            getFlexValueString,
            computedLoadingFlag,
            props
        } = this;
        const {billHeaderState} = local;
        const {
            localBillHeader,
            attachmentList
        } = billHeaderState;
        return {
            // 报销人
            payee: {
                type: 'text',
                value: localBillHeader._payee,
                label: '报销人'
            },
            // 提交人
            submitter: {
                type: 'text',
                value: localBillHeader._submitter,
                label: '提交人'
            },
            // 公司
            compCodeName: {
                type: 'text',
                value: localBillHeader.compCodeName,
                label: '公司'
            },
            // 提交人手机
            submitterMobile: {
                type: 'text',
                value: localBillHeader._mobileNumber,
                label: '提交人手机'
            },
            // 部门
            department: {
                type: 'text',
                value: localBillHeader._department,
                label: '部门'
            },
            // 提交人邮箱
            submitterEmail: {
                type: 'text',
                value: localBillHeader._submitterEmail,
                label: '提交人邮箱'
            },
            // 办公地点
            payeeLocation: {
                type: 'text',
                value: localBillHeader._payeeLocation,
                label: '办公地点'
            },
            // 提交日期
            submitDate: {
                type: 'text',
                value: localBillHeader.submitDate,
                label: '提交日期'
            },
            // 期间
            periodName: {
                type: 'text',
                value: localBillHeader.periodName,
                label: '期间'
            },
            // 附加信息
            flexValues: {
                label: '附加信息',
                render() {
                    return h.div('flexValues-wrap', {},
                        h.span('erp-static-text', {}, getFlexValueString()),
                        h(Button, 'edit', {
                            icon: 'op-common-edit-alt',
                            size: 'small',
                            disabled: computedLoadingFlag,
                            type: 'link',
                            onClick: () => {
                                billHeaderState.setProps({
                                    editingFlexValuesFlag: true,
                                    // 暂存编辑弹性域之前的状态
                                    localFlexValueSnapshot: toJS(localBillHeader)
                                });
                            }
                        }),
                    );
                }
            },
            // 支付组
            payGroup: {
                controlStyle: {
                    width: 180
                },
                render() {
                    return h(Select, {
                        value: localBillHeader.payGroup,
                        disabled: computedLoadingFlag,
                        options: props.payGroupOptions,
                        onChange(value) {
                            billHeaderState.setLocalBillHeader({
                                payGroup: value
                            });
                        }
                    });
                },
                label: '支付组'
            },
            // 完整标识
            completeCode: {
                controlStyle: {
                    width: 180
                },
                render() {
                    return h(Select, {
                        value: localBillHeader.completeCode,
                        disabled: computedLoadingFlag,
                        options: props.completeCodeOptions,
                        onChange(value) {
                            billHeaderState.setLocalBillHeader({
                                completeCode: value
                            });
                        }
                    });
                },
                label: '完整标识'
            },
            // 报销说明
            description: {
                colSpan: 24,
                controlStyle: {
                    width: null
                },
                render() {
                    return h(Input, {
                        value: localBillHeader.description,
                        disabled: computedLoadingFlag,
                        onChange(evt) {
                            billHeaderState.setLocalBillHeader({
                                description: evt.target.value
                            });
                        },
                        onBlur(evt) {
                            billHeaderState.setLocalBillHeader({
                                description: evt.target.value.trim()
                            });
                        }
                    });
                },
                label: '报销说明'
            }
        };
    }

    renderEditForm() {
        const {
            local,
            props,
            computedLoadingFlag
        } = this;
        const {billHeaderState} = local;
        return h.div('bill-header-form-wrap for-edit', {},
            h(SectionForm, 'bill-header-form', {
                fieldSet: this.fieldSetForEdit,
                fieldsOrder: [
                    ['payee', 'submitter'],
                    ['compCodeName', 'submitterMobile'],
                    ['department', 'submitterEmail'],
                    ['payeeLocation', 'submitDate'],
                    ['periodName', 'flexValues'],
                    ['payGroup'],
                    ['completeCode'],
                    ['description']
                ],
                labelStyle: {
                    width: '135px'
                },
                controlStyle: {
                    width: '300px'
                }
            }),
            h.div('actions', {},
                h(Button, 'save', {
                    type: 'primary',
                    size: 'small',
                    disabled: computedLoadingFlag,
                    onClick() {
                        props.saveBillHeader(billHeaderState.localBillHeader, () => {
                            billHeaderState.setProps({
                                editingFlag: false
                            });
                        });
                    }
                }, '保存'),
                h(Button, 'cancel', {
                    type: 'normal',
                    size: 'small',
                    disabled: computedLoadingFlag,
                    onClick() {
                        local.billHeaderState.setProps({
                            editingFlag: false,
                            localBillHeader: Object.assign({}, props.billHeader)
                        });
                    }
                }, '取消')
            )
        );
    }

    // 弹性域编辑弹窗
    renderFlexValuesEditModal = () => {
        const {props, local} = this;
        const {billHeaderState} = local;
        const {
            editingFlexValuesFlag,
            localFlexValueSnapshot,
            editingLineIndex
        } = billHeaderState;

        return h(
            Modal,
            'edit-flex-values-modal',
            {
                visible: editingFlexValuesFlag,
                hasCloseX: false,
                size: 'xs',
                onOk() {
                    billHeaderState.setProps({
                        editingFlexValuesFlag: false
                    });
                },
                okProps: {
                    size: 'small',
                    type: 'primary',
                    // disabled: billHeaderState.selectedIndex === -1 || loadingFlag
                },
                onCancel() {
                    billHeaderState.setProps({
                        editingFlexValuesFlag: false,
                        localBillHeader: localFlexValueSnapshot
                    });
                },
                cancelProps: {
                    size: 'small',
                    type: 'normal'
                }
            },
            h(Modal.Header, {
                title: '附加信息'
            }),
            h(Modal.Body, {},
                props.descFlexColumns.map((item, index) => this.renderSingleFlexItem(item, index))
            ),
        );
    }

    // 渲染单个弹性域
    renderSingleFlexItem = (flexItem, key) => {
        const {
            local,
            props,
            getSpecialFlexItemClassName
        } = this;
        let {billHeaderState} = local;
        let {
            localBillHeader
        } = billHeaderState;

        const loadingFlag = false;
        const hasValidated = true;

        let isRequired = flexItem.requiredFlag === 'Y';

        let flexCodeKey = flexItem.attributeColumn; // attribute1
        let flexLabelKey = `${flexCodeKey}Name`; // attribute1Name
        let flexCodeValue = localBillHeader[flexCodeKey]; // '1001'
        let flexLabelValue = localBillHeader[flexLabelKey] || ''; // '湖北项目35'

        let columnContent = h.div();

        switch (flexItem.dataType) {
            // 去掉了 TIME 类型
            case 'SUGGEST':
                columnContent = h(Suggest, '', {
                    useRawValue: true,
                    value: {
                        value: flexCodeValue,
                        label: flexLabelValue
                    },
                    status: errorWhen(hasValidated && isRequired && flexCodeValue === ''),
                    throttleInMS: 200,
                    allowFreeInput: false,
                    allowClear: false,
                    fetcher: inputValue => getFlexSuggestApi(theme, {
                        flexValue: inputValue,
                        flexValueSetName: flexItem.dataParameter
                    }),
                    disabled: loadingFlag,
                    labelRenderer(obj) {
                        if (obj === undefined) {
                            return '';
                        }

                        const {label, value} = obj;
                        return label !== '' && value !== ''
                            ? `${label || ''}(${obj.value || ''})`
                            : '';
                    },
                    onChange(obj) {
                        if (obj !== undefined) {
                            billHeaderState.setLocalBillHeader({
                                [flexCodeKey]: obj.value,
                                [flexLabelKey]: obj.label
                            });
                        }
                        else {
                            billHeaderState.setLocalBillHeader({
                                [flexCodeKey]: '',
                                [flexLabelKey]: ''
                            });
                        }
                    }
                });
                break;
            case 'CHAR':
                columnContent = h(Input, '', {
                    value: flexCodeValue,
                    disabled: loadingFlag,
                    maxLength: flexItem.maxLength || 60,
                    status: errorWhen(hasValidated && isRequired && flexCodeValue === ''),
                    onChange(evt) {
                        billHeaderState.setLocalBillHeader({
                            [flexCodeKey]: evt.target.value
                        });
                    },
                    onBlur(evt) {
                        billHeaderState.setLocalBillHeader({
                            [flexCodeKey]: evt.target.value.trim()
                        });
                    }
                });
                break;
            case 'YYYY-MM':
                let disabledChecker = null;
                // // 档案费
                // if (localBillHeader.expenseItemCode === 'FILINGFEE') {
                //     disabledChecker = targetMoment => {
                //         let thisYear = new Date().getUTCFullYear();
                //         let thisMonth = new Date().getMonth() + 1;
                //         if (thisMonth === 1) {
                //             // 当前是1月, 可选去年全年和前年全年
                //             return targetMoment > moment(`${thisYear - 1}-12-31`)
                //                 || targetMoment < moment(`${thisYear - 2}-01-01`);
                //         }

                //         // 否则可选上个月和去年全年
                //         if (thisMonth.length === 1) {
                //             thisMonth = '0' + thisMonth;
                //         }

                //         return targetMoment > moment(`${thisYear}-${thisMonth}-01`)
                //             || targetMoment < moment(`${thisYear - 1}-01-01`);

                //     };
                // }
                columnContent = h(DatePicker, {
                    value: flexCodeValue,
                    mode: 'month',
                    disabled: loadingFlag,
                    disabledChecker,
                    status: errorWhen(hasValidated && isRequired && flexCodeValue === ''),
                    onChange(value) {
                        billHeaderState.setLocalBillHeader({
                            [flexCodeKey]: value
                        });
                    }
                });
                break;
            case 'DATE':
                columnContent = h(DatePicker, {
                    value: flexCodeValue,
                    disabled: loadingFlag,
                    disabledChecker: targetMoment => {
                        return targetMoment > moment();
                    },
                    status: errorWhen(hasValidated && isRequired && flexCodeValue === ''),
                    onChange(value) {
                        billHeaderState.setLocalBillHeader({
                            [flexCodeKey]: value
                        });
                    }
                });
                break;
            case 'NUMBER':
                columnContent = h(Input, '', {
                    value: flexCodeValue,
                    disabled: loadingFlag,
                    maxLength: flexItem.maxLength || 10,
                    status: errorWhen(hasValidated && isRequired && flexCodeValue === ''),
                    onChange(evt) {
                        billHeaderState.setLocalBillHeader({
                            [flexCodeKey]: evt.target.value.replace(/\D/g, '')
                        });
                    },
                    onBlur(evt) {
                        billHeaderState.setLocalBillHeader({
                            [flexCodeKey]: evt.target.value === '' ? '' : parseInt(evt.target.value, 10)
                        });
                    }
                });
                break;
            case 'SUGGEST-CITY':
                columnContent = h(Suggest, '', {
                    useRawValue: true,
                    value: {
                        value: flexCodeValue,
                        label: flexLabelValue
                    },
                    status: errorWhen(hasValidated && isRequired && flexCodeValue === ''),
                    throttleInMS: 200,
                    allowFreeInput: false,
                    allowClear: false,
                    fetcher: inputValue => getCitySuggestListApi(theme, {
                        inputVal: inputValue
                    }),
                    disabled: loadingFlag,
                    labelRenderer(obj) {
                        if (obj === undefined) {
                            return '';
                        }

                        return obj.label || '';
                    },
                    onChange(obj) {
                        if (obj !== undefined) {
                            const cityNameArr = obj.label.split(/\s+/);
                            billHeaderState.setLocalBillHeader({
                                [flexCodeKey]: obj.value,
                                [flexLabelKey]: cityNameArr.length > 0 ? cityNameArr[0] : ''
                            });
                        }
                        else {
                            billHeaderState.setLocalBillHeader({
                                [flexCodeKey]: '',
                                [flexLabelKey]: ''
                            });
                        }
                    }
                });
                break;
            default:
        }

        return h.div(
            `column-block ${isRequired ? 'fake-required' : ''}`,
            {
                key
            },
            h.p('column-label', {
                title: flexItem.columnPrompt
            }, flexItem.columnPrompt),
            // className: `${isRequired ? 'fake-required' : ''} ${getSpecialFlexItemClassName(flexItem)}`,
            // controlStyle: {
            //     width: getWidth(flexItem)
            // },
            h.div('column-content', {},
                columnContent
            )
        );
    }

    render() {
        const {local, props} = this;
        const {billHeaderState} = local;
        let activeStatus = '';
        switch (props.app.root.activeSectionName) {
            case SECTION_NAME:
                activeStatus = 'active';
                break;
            case '':
                activeStatus = '';
                break;
            default:
                activeStatus = 'inactive';
        }
        if (billHeaderState.localBillHeader === null) {
            return null;
        }

        return h.div(`section ${SECTION_NAME} ${activeStatus}`, {},
            h.p('section-title-row', {}, '基本信息'),
            h(IAHelperNotification, {
                notificationList: [
                    {
                        content: '支付组不可以从 $默认支付组编码$ 改为 $修改后的支付组编码$； 例如：支付组不可以从 IPANYMENT 改为 BD_DIRECT_SAAS；支付组不可以从 $默认支付组编码$ 改为 $修改后的支付组编码$； 例如：支付组不可以从 IPANYMENT 改为 BD_DIRECT_SAAS；支付组不可以从 $默认支付组编码$ 改为 $修改后的支付组编码$； 例如：支付组不可以从 IPANYMENT 改为 BD_DIRECT_SAAS；',
                        type: 'error'
                    },
                    {
                        content: '支付组不可以从 $默认支付组编码$ 改为 $修改后的支付组编码$； 例如：支付组不可以从 IPANYMENT 改为 BD_DIRECT_SAAS；',
                        type: 'warning'
                    },
                    {
                        content: '支付组不可以从 $默认支付组编码$ 改为 $修改后的支付组编码$； 例如：支付组不可以从 IPANYMENT 改为 BD_DIRECT_SAAS；',
                        type: 'error'
                    },
                    {
                        content: '支付组不可以从 $默认支付组编码$ 改为 $修改后的支付组编码$； 例如：支付组不可以从 IPANYMENT 改为 BD_DIRECT_SAAS；',
                        type: 'warning'
                    },
                    {
                        content: '支付组不可以从 $默认支付组编码$ 改为 $修改后的支付组编码$； 例如：支付组不可以从 IPANYMENT 改为 BD_DIRECT_SAAS；支付组不可以从 $默认支付组编码$ 改为 $修改后的支付组编码$； 例如：支付组不可以从 IPANYMENT 改为 BD_DIRECT_SAAS；支付组不可以从 $默认支付组编码$ 改为 $修改后的支付组编码$； 例如：支付组不可以从 IPANYMENT 改为 BD_DIRECT_SAAS；',
                        type: 'error'
                    },
                    {
                        content: '支付组不可以从 $默认支付组编码$ 改为 $修改后的支付组编码$； 例如：支付组不可以从 IPANYMENT 改为 BD_DIRECT_SAAS；',
                        type: 'warning'
                    },
                    {
                        content: '支付组不可以从 $默认支付组编码$ 改为 $修改后的支付组编码$； 例如：支付组不可以从 IPANYMENT 改为 BD_DIRECT_SAAS；',
                        type: 'error'
                    },
                    {
                        content: '支付组不可以从 $默认支付组编码$ 改为 $修改后的支付组编码$； 例如：支付组不可以从 IPANYMENT 改为 BD_DIRECT_SAAS；',
                        type: 'warning'
                    },
                    {
                        content: '支付组不可以从 $默认支付组编码$ 改为 $修改后的支付组编码$； 例如：支付组不可以从 IPANYMENT 改为 BD_DIRECT_SAAS；支付组不可以从 $默认支付组编码$ 改为 $修改后的支付组编码$； 例如：支付组不可以从 IPANYMENT 改为 BD_DIRECT_SAAS；支付组不可以从 $默认支付组编码$ 改为 $修改后的支付组编码$； 例如：支付组不可以从 IPANYMENT 改为 BD_DIRECT_SAAS；',
                        type: 'error'
                    },
                    {
                        content: '支付组不可以从 $默认支付组编码$ 改为 $修改后的支付组编码$； 例如：支付组不可以从 IPANYMENT 改为 BD_DIRECT_SAAS；',
                        type: 'warning'
                    },
                    {
                        content: '支付组不可以从 $默认支付组编码$ 改为 $修改后的支付组编码$； 例如：支付组不可以从 IPANYMENT 改为 BD_DIRECT_SAAS；',
                        type: 'error'
                    },
                    {
                        content: '支付组不可以从 $默认支付组编码$ 改为 $修改后的支付组编码$； 例如：支付组不可以从 IPANYMENT 改为 BD_DIRECT_SAAS；',
                        type: 'warning'
                    },
                    {
                        content: '支付组不可以从 $默认支付组编码$ 改为 $修改后的支付组编码$； 例如：支付组不可以从 IPANYMENT 改为 BD_DIRECT_SAAS；支付组不可以从 $默认支付组编码$ 改为 $修改后的支付组编码$； 例如：支付组不可以从 IPANYMENT 改为 BD_DIRECT_SAAS；支付组不可以从 $默认支付组编码$ 改为 $修改后的支付组编码$； 例如：支付组不可以从 IPANYMENT 改为 BD_DIRECT_SAAS；',
                        type: 'error'
                    },
                    {
                        content: '支付组不可以从 $默认支付组编码$ 改为 $修改后的支付组编码$； 例如：支付组不可以从 IPANYMENT 改为 BD_DIRECT_SAAS；',
                        type: 'warning'
                    },
                    {
                        content: '支付组不可以从 $默认支付组编码$ 改为 $修改后的支付组编码$； 例如：支付组不可以从 IPANYMENT 改为 BD_DIRECT_SAAS；',
                        type: 'error'
                    },
                    {
                        content: '支付组不可以从 $默认支付组编码$ 改为 $修改后的支付组编码$； 例如：支付组不可以从 IPANYMENT 改为 BD_DIRECT_SAAS；',
                        type: 'warning'
                    }
                ]
            }),
            billHeaderState.editingFlag ? this.renderEditForm() : this.renderDisplayForm(),
            this.renderFlexValuesEditModal(),
            h.div('section-cover'),
        );
    }
}
