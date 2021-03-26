import * as React from 'react';
import {action} from 'mobx';
import {Dialog} from '@befe/brick/src';
import {MyForm, TypeMyFormProps} from "../form";


/**
 * 显示多个以form组成的modal
 *
 * @param infoConfig
 * key: modal名
 * value: modal内容
 *
 * @param opts
 * isModalVisible: 是否显示modal
 * viewModal: 显示哪个modal
 * @constructor
 */
export function InitFormModals(
    infoConfig: {
        [modalContentName: string]: {
            modalTitle: string
            forms: TypeMyFormProps[]
            onConfirm?: () => void
        }
    },
    opts: {
        isModalVisible: boolean
        viewModal: string
    }
): { render: () => React.ReactElement; } {
    const close = action(() => {
        opts.isModalVisible = false;
    });
    const getModalContent = () => {
        return opts.viewModal
            ? infoConfig[opts.viewModal]
            : {
                modalTitle: '',
                forms: []
            }
    };
    return {
        render(): React.ReactElement {
            return (
                <div>
                    <Dialog
                        headline={getModalContent().modalTitle}
                        visible={opts.isModalVisible}
                        onCancel={close}
                        onConfirm={getModalContent().onConfirm ? getModalContent().onConfirm : close}
                        size={'lg'}
                    >
                        {
                            getModalContent().forms.map((formConfig: any, index: number) => {
                                return (
                                    <MyForm key={index} {...formConfig} />
                                )
                            })
                        }
                    </Dialog>
                </div>
            );
        }
    };
}