import {action, observable} from 'mobx';


// 注意是否把以下内容注释掉
import {
    getCompanySuggestService,
    getExpenseItemSuggestService,
    getExpenseSubcategorySuggest
} from 'frontend/service/api/common-api';

import {
    pcNormalAgentTheme
} from 'frontend/service/agent-theme/pc-normal-agent-theme';

export function /*plop get{{searchPageVarKey}}SearchConfig plop*//*skip*/getPersonalCostSearchConfig/*skip*/(pageState, {
        ledgerOptionsPromise
    } = {}) {

    let searchValueItem = {};

    const searchConfig = observable({
        fieldSet: {
            ledgerId: {
                label: 'Ledger',
                type: 'select',
                controlProps: {
                    options: []
                }
            },

            expenseTypeCode: {
                type: 'suggest',
                label: '费用小类',
                value: '',
                controlProps: {
                    placeholder: '请输入...',
                    allowFreeInput: true,
                    shouldActiveFirstOption: false,
                    fetcher: queryString => getExpenseSubcategorySuggest(pcNormalAgentTheme, {
                        queryString
                    }),
                    onChange: (value, rawValue, inputValue) => {
                        console.log('suggest value', value, rawValue, inputValue);
                    }
                }
            },

            company: {
                type: 'suggest',
                label: '公司',
                value: '',
                controlProps: {
                    placeholder: '请输入...',
                    fetcher: queryString => {

                        console.log('@debug, searching company', searchValueItem);
                        return getCompanySuggestService(
                            pcNormalAgentTheme,
                            {
                                ledgerId: searchValueItem.ledgerId,
                                queryString
                            }
                        );
                    }
                }
            },
            expenseItemCode: {
                type: 'suggest',
                label: '费用项代码',
                value: '',
                controlProps: {
                    placeholder: '请输入...',
                    fetcher: inputValue => getExpenseItemSuggestService(
                        pcNormalAgentTheme,
                        {
                            lookUpKeyWords: inputValue,
                            lookupTypeCode: 'EXPENSE_ITEM'
                        }
                    )
                }
            },
            startFirstTime: {
                type: 'date-range',
                label: '起始日期',
                controlStyle: null
            },
            includeTaxFlag: {
                type: 'checkbox',
                label: '含税'
            },
            endFirstTime: {
                type: 'date-range',
                label: '终止日期',
                value: '',
                controlStyle: null
            }
        },

        collapsedFields: [
            ['ledgerId', 'expenseTypeCode', 'company'],
            ['expenseItemCode', 'startFirstTime', 'includeTaxFlag'],
            ['endFirstTime']
        ],

        collapseType: 'rows',
        colSpan: 8,

        labelStyle: {
            width: 120
        },

        controlStyle: {
            width: 160
        },

        // showMore: true,
        showInlineActions: true,

        onCreateValueItem: (fieldKey, field, valueItem) => {
            // console.log('@debug, ', fieldKey, field);
            switch (fieldKey) {
                case 'startFirstTime':
                case 'endFirstTime':
                    valueItem[fieldKey] = {start: '', end: ''};
                    return true;
            }
        },

        onConditionValuesChanged: conditionValue => {
            searchValueItem = conditionValue;
        }
    });

    ledgerOptionsPromise
        .then(
            action(options => {
                options.unshift({value: '', label: '请选择'});
                searchConfig.fieldSet.ledgerId.controlProps.options = options;
            })
    );

    return {
        searchConfig
    };
}
