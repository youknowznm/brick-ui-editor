import {action, observable} from 'mobx';

export function /*plop get{{searchPageVarKey}}DataConfig plop*//*skip*/getPersonalCostDataConfig/*skip*/(page, {
    ledgerOptionsPromise
} = {}) {
    let itemInEdit = {};

    const itemPropSet = observable({
        ledgerId: {
            label: 'Ledger',

            editFieldProps: {
                type: 'select',
                controlProps: {
                    options: [],
                    onChange: () => {
                        console.log('@debug, ledger changed', itemInEdit);
                    }
                }
            },

            createFieldProps: {
                type: 'input',
                controlProps: {
                    onChange: action(e => {
                        console.log('@debug, ledger changed', itemInEdit);
                        itemInEdit.ledgerName = e.target.value;
                    })
                }
            }
        },
        ledgerName: {
            label: 'Ledger',

            tableColumnProps: {
                width: 2000
            }
        }
    });

    const tableActionColumnProps = observable({
        width: 200
    });

    const editModalFieldsOrder = observable([
        ['ledgerId']
    ]);

    const tableColumnsOrder = observable([
        'ledgerName'
    ]);

    const onItemInEditChanged = currentItem => {
        itemInEdit = currentItem;
    };

    // 通用公用的固定 promise 可以考虑合并赋值
    // Promise.all([
    //     ledgerOptionsPromise
    // ]).then(
    //     action(
    //         ([ledgerOptions]) => {
    //             itemPropSet.ledgerId.editFieldProps.controlProps.options = ledgerOptions;
    //         }
    //     )
    // )

    // 一些其他的处理

    return {
        itemPropSet,
        editModalFieldsOrder,
        tableColumnsOrder,
        onItemInEditChanged,
        tableActionColumnProps,
    };
}
