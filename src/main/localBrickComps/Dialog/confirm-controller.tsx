import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {DialogConfirm, DialogConfirmProps} from './dialog-confirm'
import {omit, pick, safeInvoke, StringIndexedObject} from '@befe/brick-utils'
import {ALERT_TYPES} from '@befe/brick-core'
import {DialogAction} from './dialog'
import {ToastItem} from '../../toast/src'

interface ConfirmOption extends DialogConfirmProps {

}

interface ConfirmObject {
    destroy: () => void
}

interface ConfirmMethod {
    (message: React.ReactNode, option?: ConfirmOption): ConfirmObject

    (headline: React.ReactNode, message?: React.ReactNode, option?: ConfirmOption): ConfirmObject

    (p1: React.ReactNode, p2?: React.ReactNode | ConfirmOption, p3?: ConfirmOption): ConfirmObject
}

/**
 * @docgen-skip
 */
interface ConfirmController {
    (option: ConfirmOption): ConfirmObject

    info: ConfirmMethod
    success: ConfirmMethod
    warning: ConfirmMethod
    error: ConfirmMethod
}

function baseConfirm(option: ConfirmOption) {
    const container = document.createElement('div')
    container.className = 'brick-dialog-confirm-container'
    document.body.appendChild(container)

    const refDialogConfirm = React.createRef<DialogConfirm>()
    const destroy = () => {
        ReactDOM.unmountComponentAtNode(container)
        document.body.removeChild(container)
    }
    const createActionHandler = (handler?: DialogAction): DialogAction => (e: React.MouseEvent) => {
        const ret = safeInvoke(handler, e)

        if (ret instanceof Promise) {
            return ret.finally(() => {
                // destroy 会 unmount 其中 button
                // setTimeout 让 button 完成 async loading 再 destroy
                setTimeout(destroy)
            })
        } else {
            destroy()
        }

        return ret
    }
    const props = {
        ...omit(option, ['onConfirm', 'onCancel']),
        ref: refDialogConfirm,
        onConfirm: createActionHandler(option.onConfirm),
        onCancel: createActionHandler(option.onCancel)
    }

    ReactDOM.render(<DialogConfirm {...props} />, container)

    return {
        destroy
    }
}

const confirmSet: StringIndexedObject<ConfirmMethod> = {}
ALERT_TYPES.forEach(type => {
    confirmSet[type] = (p1: React.ReactNode, p2?: React.ReactNode | ConfirmOption, p3?: ConfirmOption) => {
        let headline: React.ReactNode
        let message: React.ReactNode
        let opt: ConfirmOption

        const option: ConfirmOption = {
            type
        }

        if (p2 && typeof p2 === 'string' || typeof p2 === 'number' || React.isValidElement(p2)) {
            headline = p1
            message = p2
            opt = p3 as ConfirmOption
        } else {
            message = p1
            opt = p2 as ConfirmOption
        }

        Object.assign(option, {
            headline,
            message,
        }, opt)

        return baseConfirm(option)
    }

})
Object.assign(baseConfirm, confirmSet)
const confirm = baseConfirm as ConfirmController

export {confirm}
