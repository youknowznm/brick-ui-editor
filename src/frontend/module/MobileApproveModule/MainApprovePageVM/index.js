/**
 * @file: MainApprovePageVM 状态对象
 * @author: lzheng
 * @date: 2018-08-03
 * @description: MainApprovePageVM 的状态入口页面
 */

import {
    observable,
    action,
    urlsync,
    BaseModel,
    bindView as bind,
    bindActions,
    extendMethods,
    ReactionManager,
    setProps
} from '@befe/utils/dev-pattern-vm/index-mobile';

import View from './View';

import _ from 'lodash';

// 如果有需要, 打开 global-wrapper 和特定的模块 wrapper

import {
    urlUtils,
    agent,
    mobileApprovalUtils
} from 'frontend/wrapper/mobile';

const actions = {
    // 用于放置 handleXXX 等需要绑定 this + action 的方法
};

const methods = {
    // 用于放置一些简单的扩展方法
};

@bind(View)
class MainApprovePageVM extends BaseModel {
    @observable empContractVO = {
        employeeName: '',
        sex: '',
        idCard: ''
    };

    @observable currentInlineEditProp = '';
    @observable elecContractModifyVO = {
        currentAddress: '',
        familyAddress: '',
        phone: '',
        email: '',
        ecpName: '',
        ecpPhone: ''
    };

    /**
     * undefined 时即没有对应的内容, 说明是不需要显示的
     *
     * @def: [batch] | undefined
     *  batch: {}
     *      batchId: number
     *      batchName: string
     *
     *      // Y = 可报
     *      chooseFlag: 'Y' | 'N'
     *
     *      // timestamp? @todo:q 区间? 天的单位?
     *      startDate: number
     *      endDate: number
     *
     *      officeAddress: string
     *
     *      // 名额? 貌似没用上
     *      numberLimit: number
     */
    @observable signBatchVOS;

    @observable contractList = [];
    @observable resultData = {
        isShowElecContract: undefined
    };

    @observable dataPropsUrl;

    @observable currentAddress;
    @observable familyAddress;
    @observable phone;
    @observable email;
    @observable ecpName;
    @observable ecpPhone;

    @observable openBasic = true;
    @observable openCurrentContract = true;
    @observable openNextContract = true;
    @observable openContractHistory = true;
    @observable openUserInfoConfirm = true;
    @observable openBatchSelection = true;

    @observable showPreview = false;

    @observable batchIdPicked = null;

    /**
     * 从 window.PAGE_KEY 给定, 后端注入
     *
     * @def: 'employee-online-confirm' >    // 员工确认
     *  | 'employee-select-batch' >         // 员工批次选择
     *  | 'extend-contract'                 // 主管审批
     */
    PAGE_KEY = '';

    get shouldShowUserInfoForm() {
        return this.PAGE_KEY === 'employee-online-confirm'
            && this.resultData.isShowElecContract === 'Y';
    }

    get shouldShowBatchSelection() {
        return this.PAGE_KEY === 'employee-select-batch';
    }

    get shouldShowPreview() {
        return this.shouldShowUserInfoForm;
    }

    get shouldShowHistory() {
        return this.resultData.isShowHistory === 'Y';
    }

    @action
    applyInitData() {
        this.PAGE_KEY = window.PAGE_KEY;
        const initData = mobileApprovalUtils.parseInitData();

        // @todo:remove
        // console.log(initData);

        this.empContractVO = initData.empContractVO;
        this.contractList = initData.contractList;
        delete initData.contractList;
        delete initData.empContractVO;

        if (initData.isShowElecContract === 'Y' && initData.elecOontractModifyVO) {
            this.elecContractModifyVO = initData.elecOontractModifyVO;
            delete initData.elecOontractModifyVO;
        }

        if (initData.signBatchVOS) {
            this.signBatchVOS = initData.signBatchVOS;
            delete initData.signBatchVOS;
        }

        this.resultData = initData;
    }

    /**
     * @def: target, config, opts => errors
     *  // 被检查字段的对象
     *  target: object
     *
     *  config: { propKey: propConfig }
     *      // 对应的被检查的字段
     *      propKey: string
     *
     *      propConfig: {rules, propName}
     *          // 对应的字段名称 (人类可读)
     *          propName: string
     *
     *          // 检查对应的自动
     *          rules: [rule] | rule
     *              rule: 'email' | 'required'
     *
     *  opts: { exitOnFirstError }
     *      // default: true, 当第一个验证失败时, 即退出后续校验
     *      exitOnFirstError: boolean
     *
     *  // length === 0 时代表校验无错误
     *  errors: [error]
     *      error: {}
     *          key: #@.config.propKey
     *          config: #@.config.propConfig
     *          invalidRule: #@.rule
     *          message: string
     */
    validateProps(target, config, opts = {}) {
        const errors = [];

        if (typeof opts.exitOnFirstError === 'undefined') {
            opts.exitOnFirstError = true;
        }

        Object.keys(config)

            // 对应每个字段校验
            .some(propKey => {
                const propConfig = config[propKey];
                let rules = propConfig.rules;

                if (typeof rules === 'string') {
                    rules = [rules];
                }

                // 对应每个校验规则
                rules.some(
                    rule => {
                        let message;

                        if (rule === 'required') {
                            if (!_.trim(target[propKey])) {
                                message = `${propConfig.propName} 不能为空`;
                            }
                        }
                        else if (rule === 'email') {
                            if (!/[^@]+@[^@]+/.exec(target[propKey])) {
                                message = `${propConfig.propName} 请输入正确的 Email 格式`;
                            }
                        }

                        if (message) {
                            errors.push({
                                key: propKey,
                                propConfig: propConfig,
                                invalidRule: rule,
                                message
                            });

                            if (opts.exitOnFirstError) {
                                // 提前退出校验
                                return true;
                            }
                        }

                        return false;
                    }
                );

                if (!!errors.length && opts.exitOnFirstError) {
                    return true;
                }

                return false;

            });

        return errors;
    }

    setupApprovalOperations() {
        // @todo:task 需要做所有页面的 pageKey 注入
        mobileApprovalUtils.setOperation(
            'complete',
            () => {
                let isValid = true;
                let message = '';
                let data = {
                    pageKey: this.PAGE_KEY
                };

                if (this.PAGE_KEY === 'employee-select-batch') {
                    if (!this.batchIdPicked) {
                        isValid = false;
                        message = '请选择一个批次';
                    }
                    else {
                        data.batchId = this.batchIdPicked;
                    }
                }
                else if (this.PAGE_KEY === 'employee-online-confirm') {
                    if (this.shouldShowUserInfoForm) {
                        const errors = this.validateProps(
                            this.elecContractModifyVO,
                            {
                                currentAddress: {rules: 'required', propName: '实际通讯住址'},
                                familyAddress: {rules: 'required', propName: '家庭通讯住址'},
                                phone: {rules: 'required', propName: '联系电话'},
                                email: {rules: ['required', 'email'], propName: '电子邮箱'},
                                ecpName: {rules: 'required', propName: '紧急联系人'},
                                ecpPhone: {rules: 'required', propName: '紧急联系人电话'}
                            }
                        );

                        if (errors.length) {
                            isValid = false;
                            message = errors[0].message;
                        }
                        else {
                            Object.assign(data, this.elecContractModifyVO);
                        }
                    }
                }

                return {
                    isValid,
                    message,
                    data
                };
            }
        );
    }

    openInformationEdit(target, propName) {
        const bpmUrl = mobileApprovalUtils.getBPMProxyUrl();

        mobileApprovalUtils.newPage({
            key: 'information-edit-page',

            url: mobileApprovalUtils.getProxyAbsoluteUrl(`/pages/mobile-information-edit.html?text=${target[propName]}`
                // 移动审批代理, 有 2个小时缓存
                + `&version=${window.BUILD_TIME}`
                + `&bpmProxyUrl=${encodeURIComponent(bpmUrl)}`),
            listener: (key, msg) => {
                if (typeof msg === 'string') {
                    msg = JSON.parse(msg);
                }

                setProps(target, {
                    [propName]: msg.text
                });
            }
        });
    }

    openPreviewPage() {
        const contractData = this.empContractVO;
        const modifiedInfo = this.elecContractModifyVO;

        const param = {
            employeeName: contractData.employeeName,
            employeeNumber: contractData.employeeNumber,
            sex: contractData.sex,
            nextContractType: contractData.nextContractType,
            nextCompanySubjectId: contractData.nextCompanySubjectId,
            contractCategory: contractData.contractCategory,
            nextContractStartDate: contractData.nextContractStartDate,
            nextContractEndDate: contractData.nextContractEndDate,
            idCard: contractData.idCard,
            familyAddress: modifiedInfo.familyAddress,
            currentAddress: modifiedInfo.currentAddress,
            phone: modifiedInfo.phone,
            ecpName: modifiedInfo.ecpName,
            ecpPhone: modifiedInfo.ecpPhone,
            email: modifiedInfo.email
        };

        const bpmUrl = mobileApprovalUtils.getBPMProxyUrl();

        const paramStr = Object.keys(param)
            .map(key => key + '=' + encodeURIComponent(param[key]))
            .join('&');

        mobileApprovalUtils.newPage({
            url: mobileApprovalUtils.getProxyAbsoluteUrl(
                `/pages/mobile-contract-preview.html?paramStr=${encodeURIComponent(paramStr)}`
                // 移动审批代理, 有 2个小时缓存
                + `&version=${window.BUILD_TIME}`
                + `&bpmProxyUrl=${encodeURIComponent(bpmUrl)}`
            )
        });
    }

    @action
    pickBatch(batchId) {
        this.batchIdPicked = batchId;
    }

    // @todo:remove
    @action
    setValue(props) {
        this.setProps(props);
    }

    shouldShowBeijingIndicator = false;

    BEIJING_TIMEZONE_OFFSET_MIN =-8 * 60;
    LOCAL_TIMEZONE_OFFSET_MS =new Date().getTimezoneOffset() * 60 * 1000;
    BEIJING_TIMEZONE_OFFSET_MS =this.BEIJING_TIMEZONE_OFFSET_MIN * 60 * 1000;

    parseBatchSignTimeText(batch) {
        const offset = this.LOCAL_TIMEZONE_OFFSET_MS - this.BEIJING_TIMEZONE_OFFSET_MS;
        const start = new Date(batch.startDate + offset);
        const end = new Date(batch.endDate + offset);

        const pad = num => _.padStart(num, 2, '0');

        return start.getFullYear()
            + '-'
            + pad(start.getMonth() + 1)
            + '-'
            + pad(start.getDate())
            + ' '
            + pad(start.getHours())
            + ':'
            + pad(start.getMinutes())
            + ' - '
            + pad(end.getHours())
            + ':'
            + pad(end.getMinutes())
            + (this.shouldShowBeijingIndicator ? ' (北京时间)' : '');
    }

    constructor(initData, syncConfig) {
        super(initData, syncConfig);

        bindActions(this, actions);
        extendMethods(MainApprovePageVM, methods);

        if (new Date().getTimezoneOffset() !== this.BEIJING_TIMEZONE_OFFSET_MIN) {
            this.shouldShowBeijingIndicator = true;
        }
    }

    // Reaction 控制
    reactions = new ReactionManager();

    @action
    init(props) {
        // 在此注册一些状态联动
        // this.reaction.reaction( /* ... */ );

        this.applyInitData();
        this.setupApprovalOperations();
    }

    @action
    handleChangeTodoShow(value) {
        this.currentAddress = value;
    }

    update(nextProps) {}

    exit(props) {
        this.reactions.dispose();
    }
}

export default MainApprovePageVM;
