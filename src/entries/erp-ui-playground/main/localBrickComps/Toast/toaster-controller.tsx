import * as React from 'react'
import {StringIndexedObject} from '@befe/brick-utils'

import {ToastTypes} from './toast'
import {createToaster, ToasterObject, ToasterProps, ToastItem} from './toaster'

type ToasterOption = Partial<ToastItem>

interface ToastMethod {
    (content: React.ReactNode, option?: ToasterOption): ToastObject
    (headline: React.ReactNode, content?: React.ReactNode, option?: ToasterOption): ToastObject
    (p1: React.ReactNode, p2?: React.ReactNode | ToasterOption, p3?: ToasterOption): ToastObject
}

/**
 * @docgen-skip
 */
interface ToasterController {
    (option: ToasterOption): ToastObject
    success: ToastMethod
    info: ToastMethod
    warning: ToastMethod
    error: ToastMethod
}

interface ToastObject {
    id: string
    remove: () => void
}

let toaster: ToasterObject
function getToaster(props?: ToasterProps) {
    return toaster = toaster || createToaster(props)
}

let seed = 0;
const now = +new Date;
function getUniqueId() {
    return `TOAST_OBJ_${now}_${seed++}`;
}

function removeToast(id: string) {
    if (id) {
        const toaster = getToaster()
        toaster.remove(id)
    }
}

function baseToast(option: ToasterOption) {
    const {headline, content, id = getUniqueId()} = option
    if (content || headline) {
        const toaster = getToaster()
        toaster.toast({
            id,
            ...option,
        })
    }

    return {
        id,
        remove: () => removeToast(id)
    }
}


const toastSet: StringIndexedObject<ToastMethod> = {}
ToastTypes.forEach(type => {
    toastSet[type] = (p1: React.ReactNode, p2?: React.ReactNode | ToasterOption, p3?: ToasterOption) => {
        let headline: React.ReactNode
        let content: React.ReactNode
        let opt: ToastItem

        const option: ToasterOption = {
            type
        }

        if (p2 && typeof p2 === 'string' || typeof p2 === 'number' || React.isValidElement(p2)) {
            headline = p1
            content = p2
            opt = p3 as ToastItem
        }
        else {
            content = p1
            opt = p2 as ToastItem
        }

        Object.assign(option, {
            headline,
            content,
        }, opt)
        return baseToast(option)
    }
})
Object.assign(baseToast, toastSet)

const toast = baseToast as ToasterController

export {toast, removeToast}
