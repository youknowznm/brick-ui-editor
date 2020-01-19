/**
 * @file: EmployeeOnlineConfirm View 组件
 * @author: lzheng
 * @date: 2018-08-03
 * @description: EmployeeOnlineConfirm 的 React UI 组件
 */

import {
    computed,
    Component,
    r,
    h,
    suh,
    c,
    action
} from '@befe/utils/dev-pattern-vm/index-mobile';

// 如果有需要, 打开 global-wrapper 和特定的模块 wrapper

import {
    urlUtils,
    Input,
    iconRenders,
    mobileApprovalUtils
} from 'frontend/wrapper/mobile';

import pageStyle from './style.use.less';

`DOM

ul.information-section (.section-closed)

    // 信息块头部
    li.list-head
        .list-title
            .list-title-note
        .list-content
            .content-inner
            .icon-XXX img (XXX= mapping svg files from image/icon)
            
    // 正常内容布局 (通用)
    li (.two-rows)
        .list-title
        .list-content
            .content-inner
            .icon-XXX img (XXX= mapping svg files from image/icon)
    
    // 正常内容布局 (通用) @todo:enhance 推荐修改时采用这种新的布局方式
    li.item-content
        .primary-content
            .content-row $batch-row
                // 主体内容 (加粗高亮)
                span.primary-title
                
                // 一般是次级提示信息
                span.sub-info
                
        .secondary-content
            .content-vertical-center $batch-action
                .mobile-icon.icon-XXX
    
    $batch-row:
        // 指示的 绿点 / 红点
        .batch-indicator
    
    $batch-action:
        // 如果是选中状态的话, 则有这个类
        &.batch-picked
            .icon-checkbox-checked
            .icon-checkbox-unchecked
    
    // 行内编辑
    li
        .list-title
        .list-content
            .content-inner.inline-edit
                input
                .icon-delete-icon.mobile-icon
                .icon-arrow-grey-right.mobile-icon    
    
    extra:
    .long-content
    .long-input
    .mobile-icon (.icon-XXX)
`;

@suh(pageStyle)
export default class extends Component {

    // 是否注入全局的 app 对象
    static shouldInjectApp = true;

    renderEmployeeInfo() {
        const {local} = this;
        const {
            employeeName,
            employeeNumber,
            sex,
            orgName,
            groupName,
            supervisorName,
            positionCode,
            hireDate,
            supervisorNumber,
            applyNumber,
            plsname,
            pssname,
            pllname,
            pslname,
            phname
        } = local.empContractVO;

        return h.ul(c('information-section', {
            'section-closed': !local.openBasic
        }),
            {},
            h.li('list-head visible-on-closed', {},
                h.div('list-title', {}, _i('basic.employee.info')),
                h.div('list-content', {
                    onClick: e => {
                        local.setProps({
                            openBasic: !local.openBasic
                        });
                    }
                },
                    iconRenders.arrowBlueDown(),
                    iconRenders.arrowBlueUp()
                )
            ),
            h.li('visible-on-closed', {},
                h.div('list-title', {}, '员工姓名'),
                h.div('list-content', {},
                    h.div('content-inner', {}, employeeName)
                )
            ),
            h.li({},
                h.div('list-title', {}, '员工编号'),
                h.div('list-content', {},
                    h.div('content-inner', {}, employeeNumber)
                )
            ),
            h.li({},
                h.div('list-title', {}, '性别'),
                h.div('list-content', {},
                    h.div('content-inner', {}, sex)
                )
            ),
            h.li({},
                h.div('list-title', {}, '入职时间'),
                h.div('list-content', {},
                    h.div('content-inner', {}, hireDate)
                )
            ),
            h.li({},
                h.div('list-title', {}, '部门'),
                h.div('list-content', {},
                    h.div('content-inner', {}, orgName)
                )
            ),
            h.li({},
                h.div('list-title', {}, '小组'),
                h.div('list-content', {},
                    h.div('content-inner', {}, groupName)
                )
            ),
            h.li({},
                h.div('list-title', {}, '主管姓名'),
                h.div('list-content', {},
                    h.div('content-inner', {}, supervisorName)
                )
            ),
            h.li({},
                h.div('list-title', {}, '主管编号'),
                h.div('list-content', {},
                    h.div('content-inner', {}, supervisorNumber)
                )
            ),
            h.li('two-rows', {},
                h.div('list-title', {}, '职位'),
                h.div('list-content long-content', {},
                    h.div('content-inner long-content', {},
                        `${positionCode}.${plsname}.${pssname}.-.${pllname}.${pslname}.`,
                    ),
                    h.div('content-inner', {}, phname)
                )
            ),
            h.li({},
                h.div('list-title', {}, '续签申请编号'),
                h.div('list-content', {},
                    h.div('content-inner', {}, applyNumber)
                )
            )
        );
    }

    /**
     * @def section => ReactElem
     *  section: {}
     *      title: string
     *
     *      // undefined => true
     *      isOpen: boolean | undefined
     *      onToggleSection: function | undefined
     *
     *      // .list-head 的 props
     *      headProps: {} | undefined
     *      headSecondaryContent: ReactElem | undefined
     *
     *      // section 内容是否为空 (true = 空)
     *      skipSectionContent: boolean | undefined
     *
     *      // 如果非空, 则使用这个进行渲染
     *      sectionContent: undefined | ReactElem
     *
     *      items: [item]
     *          item: {}
     *              // @todo:impl
     *              type: undefined | 'two-rows'
     *              title: string
     *              content: string | ReactElem
     *              contextExtraClass: string
     */
    renderInformationSection(section) {
        let sectionContent;

        if (typeof section.isOpen === 'undefined') {
            section.isOpen = true;
        }

        if (!section.skipSectionContent) {
            if (section.sectionContent) {
                sectionContent = section.sectionContent;
            }
            else {
                sectionContent = section.items.map(
                    (item, key) => this.renderInformationItem(item, key)
                );
            }
        }

        return h.ul(
            c('information-section', {
                'section-closed': !section.isOpen
            }),
            {},

            h.li('list-head visible-on-closed', section.headProps || {},
                h.div('list-title', {}, section.title),
                h.div('list-content',
                    {
                        onClick: e => section.onToggleSection && section.onToggleSection()
                    },

                    section.headSecondaryContent ? section.headSecondaryContent : null,
                    !section.headSecondaryContent ? iconRenders.arrowBlueDown() : null,
                    !section.headSecondaryContent ? iconRenders.arrowBlueUp() : null,
                )
            ),

            sectionContent,
        );
    }

    /**
     * @def: item, key => ReactElem
     *  item: #@renderInformationSection.item
     */
    renderInformationItem(item, key) {
        return h.li(
            {
                key
            },

            h.div('list-title', {}, item.title),
            h.div('list-content', {},
                typeof item.content === 'string'
                    ? this.renderInformationItemContent(
                        item.content,
                        item.contextExtraClass
                    )
                    : item.content
            ),
        );
    }

    /**
     * @def: content, className => ReactElem
     *  content: string | ReactElem | number?
     *
     *  // for content inner dom node
     *  className: string
     */
    renderInformationItemContent(content, className = '') {
        return h.div(
            c('content-inner', className),
            {},
            content
        );
    }

    renderInformationItemLongTextEdit(target, propName) {
        const {local} = this;

        return h.div({},
            h.div('content-inner long-text', {
                onClick: e => local.openInformationEdit(target, propName)
            },
                target[propName]
            ),

            iconRenders.arrowGreyRight()
        );
    }

    renderInformationItemInlineEdit(target, propName, {
            extraClass = '',
            inputType = 'text'
        } = {}) {
        const {local} = this;

        return h.div(
            c('content-inner inline-edit',
                extraClass,
                {
                    'edit-focus': local.currentInlineEditProp === propName
                }
            ),
            {},
            h.span(
                'inline-input',
                {},

                h.input(
                    extraClass,
                    {
                        value: target[propName],
                        type: inputType,
                        onChange: action(e => (target[propName] = e.target.value)),
                        onFocus: action(e => (local.currentInlineEditProp = propName)),
                        onBlur: action(e => (local.currentInlineEditProp = ''))
                    }),

                iconRenders.arrowGreyRight(),
                iconRenders.deleteIcon({
                    props: {
                        onMouseDown: action(e => (target[propName] = ''))
                    }
                }),
            )
        );
    }

    renderBatchSelection(batch, key) {
        const {local} = this;

        return h.li('item-content', {
            key
        },

            h.div('primary-content', {},
                h.div('content-row', {},
                    h.span(
                        c('batch-indicator',
                            {
                                'batch-unavailable': batch.chooseFlag !== 'Y'
                            }),
                        {}
                    ),
                    h.span('primary-title', {},
                        batch.batchName,
                    ),
                    batch.chooseFlag === 'Y' ? null : h.span('sub-info', {}, '(已报满)'),
                ),
                h.div('content-row secondary-row', {},
                    `签署时间: ${local.parseBatchSignTimeText(batch)}`
                ),
                h.div('content-row secondary-row', {},
                    `签署地点: ${batch.officeAddress}`
                ),
            ),
            h.div('secondary-content', {
                onClick: e => local.pickBatch(batch.batchId)
            },
                h.div(
                    c('content-vertical-center',
                        {
                            'batch-picked': batch.batchId === local.batchIdPicked
                        }
                    ),
                    {},
                    iconRenders.checkboxUnchecked(),
                    iconRenders.checkboxChecked(),
                )
            )
        );
    }

    renderBatchSelectionList() {
        const {local} = this;

        return this.renderInformationSection({
            title: '续签批次选择',

            isOpen: local.openBatchSelection,
            onToggleSection: () => local.setProps({
                openBatchSelection: !local.openBatchSelection
            }),

            sectionContent: local.signBatchVOS.map(
                (batch, key) => this.renderBatchSelection(batch, key)
            )
        });
    }

    renderHistoryContractItem(contract) {
        return h.li('history-contract',
            {
                key: contract.key
            },
            h.div(
                'primary-row', {},
                h.div('contract-title value-item', {}, contract.title),
                h.div('contract-number value-item', {}, contract.number),
            ),

            h.div(
                'secondary-row', {},
                h.div('contract-period value-item', {},
                    contract.startDate,
                    ' 至 ',
                    contract.endDate
                ),
                h.div('contract-type value-item', {},
                    contract.typeName
                )
            )
        );
    }

    renderCurrentContract() {
        const {props, local} = this;
        const {
            currContractNumber,
            currContractTypeName,
            currCompanyName,
            currContractCategoryName,
            currContractStartDate,
            currContractEndDate
        } = local.empContractVO;

        return this.renderInformationSection({
            title: '到期合同信息',

            isOpen: local.openCurrentContract,
            onToggleSection: () => local.setProps(
                {
                    openCurrentContract: !local.openCurrentContract
                }
            ),

            items: [
                {
                    title: '合同编码',
                    content: currContractNumber
                },
                {
                    title: '合同类型',
                    content: currContractTypeName
                },
                {
                    title: '合同主体',
                    content: currCompanyName,
                    contextExtraClass: 'long-content'
                },
                {
                    title: '合同类别',
                    content: currContractCategoryName
                },
                {
                    title: '开始时间',
                    content: currContractStartDate
                },
                {
                    title: '结束时间',
                    content: currContractEndDate
                }
            ]
        });
    }

    renderNextContract() {
        const {props, local} = this;
        const {
            nextContractNumber,
            nextCompanyName,
            nextContractTypeName,
            nextContractStartDate,
            nextContractEndDate,
            contractCategoryName
        } = local.empContractVO;

        return this.renderInformationSection({
            title: '续签合同信息',

            isOpen: local.openNextContract,
            onToggleSection: () => local.setProps(
                {
                    openNextContract: !local.openNextContract
                }
            ),

            items: [
                {
                    title: '合同编码',
                    content: nextContractNumber
                },
                {
                    title: '合同类型',
                    content: nextContractTypeName
                },
                {
                    title: '合同主体',
                    content: nextCompanyName,
                    contextExtraClass: 'long-content'
                },
                {
                    title: '合同类别',
                    content: contractCategoryName
                },
                {
                    title: '开始时间',
                    content: nextContractStartDate
                },
                {
                    title: '结束时间',
                    content: nextContractEndDate
                }
            ]
        });
    }

    renderContractHistory() {
        const {props, local} = this;

        return this.renderInformationSection({
            title: '合同历史记录',

            isOpen: local.openContractHistory,
            onToggleSection: () => local.setProps(
                {
                    openContractHistory: !local.openContractHistory
                }
            ),

            sectionContent: local.contractList.map((contract, key) => {
                return this.renderHistoryContractItem({
                    key,
                    title: contract.companyName,
                    number: contract.contractNumber,
                    typeName: contract.contractTypeName,
                    startDate: contract.startDate,
                    endDate: contract.endDate
                });
            })
        });
    }

    renderUserInfoConfirm() {
        const {props, local} = this;
        const elecOontractModifyVO = local.resultData && local.resultData.elecOontractModifyVO
            ? local.resultData.elecOontractModifyVO : {};

        return this.renderInformationSection({
            title: '乙方信息确认',

            isOpen: local.openUserInfoConfirm,
            onToggleSection: () => local.setProps({
                openUserInfoConfirm: !local.openUserInfoConfirm
            }),

            items: [
                {
                    title: '员工姓名',
                    content: local.empContractVO.employeeName
                },
                {
                    title: '性别',
                    content: local.empContractVO.sex
                },
                {
                    title: '身份证号',
                    content: local.empContractVO.idCard
                },

                // textarea
                {
                    title: '实际通讯地址',
                    content: this.renderInformationItemLongTextEdit(
                        local.elecContractModifyVO,
                        'currentAddress'
                    )
                },
                {
                    title: '家庭通讯地址',
                    content: this.renderInformationItemLongTextEdit(
                        local.elecContractModifyVO,
                        'familyAddress'
                    )
                },

                // inline text
                {
                    title: '联系电话',
                    content: this.renderInformationItemInlineEdit(
                        local.elecContractModifyVO,
                        'phone',
                        {
                            extraClass: 'long-input',
                            inputType: 'tel'
                        }
                    )
                },
                {
                    title: '电子邮箱',
                    content: this.renderInformationItemInlineEdit(
                        local.elecContractModifyVO,
                        'email',
                        {
                            extraClass: 'long-input',
                            inputType: 'email'
                        }
                    )
                },
                {
                    title: '紧急联系人',
                    content: this.renderInformationItemInlineEdit(
                        local.elecContractModifyVO,
                        'ecpName',
                        {
                            extraClass: 'long-input'
                        }
                    )
                },
                {
                    title: '紧急联系人电话',
                    content: this.renderInformationItemInlineEdit(
                        local.elecContractModifyVO,
                        'ecpPhone',
                        {
                            extraClass: 'long-input',
                            inputType: 'tel'
                        }
                    )
                }
            ]

        });
    }

    renderPreviewElectCon() {
        const {props, local} = this;

        return this.renderInformationSection({
            title: '预览电子合同',

            headProps: {
                onClick: e => local.openPreviewPage()
            },
            headSecondaryContent: iconRenders.arrowBlueRight(),

            skipSectionContent: true
        });
    }

    render() {
        const {local} = this;

        return h.div('mobile-main-approve-wrapper', {},

            this.renderEmployeeInfo(),
            this.renderCurrentContract(),
            this.renderNextContract(),
            local.shouldShowUserInfoForm ? this.renderUserInfoConfirm() : null,
            local.shouldShowBatchSelection ? this.renderBatchSelectionList() : null,
            local.shouldShowPreview ? this.renderPreviewElectCon() : null,
            local.shouldShowHistory ? this.renderContractHistory() : null,
        );
    }
}
