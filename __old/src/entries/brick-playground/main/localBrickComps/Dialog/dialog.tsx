/**
 * @file dialog
 * @author wujun07
 * @owner wujun07:2019-11-26
 */
import * as React from 'react'
// import * as PropTypes from 'prop-types'
import {default as c} from 'classnames'

import {Button, ButtonProps} from '@befe/brick-comp-button'
import {Modal, ModalProps} from '@befe/brick-comp-modal'
import {codeWarningOnce, isDev, omit, safeInvoke} from '@befe/brick-utils'

import {DialogHead} from './dialog-head'
import {DialogBody} from './dialog-body'
import {DialogFoot} from './dialog-foot'

import {ConfigContext, createComponentLocale, getDefaultValueUsingContextTheme} from '@befe/brick-comp-config-provider'
import {isUndefined} from 'lodash-es'
import {CloseX} from '@befe/brick-comp-close-x'


type PropsFromModal = Omit<ModalProps, 'onClickMask'>

export type DialogAction = ButtonProps['onClick']
export interface DialogProps extends PropsFromModal {
    /**
     * 用户可自定义 class
     */
    className?: string

    /**
     * 尺寸
     */
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'

    /**
     * 标题
     */
    headline?: React.ReactNode

    /**
     * 点击确认回调
     */
    onConfirm?: DialogAction

    /**
     * 点击取消/关闭回调
     */
    onCancel?: DialogAction

    /**
     * 自定义确认按钮文本
     */
    confirmLabel?: string

    /**
     * 自定义取消按钮文本
     */
    cancelLabel?: string

    /**
     * 自定义操作区
     */
    actions?: React.ReactNode

    /**
     * 点击蒙层是否进行取消/关闭
     */
    maskCancel?: boolean

    /**
     * 操作按钮的位置
     */
    actionsAlign?: 'left' | 'center' | 'right'

    /**
     * @zhangenming 从外部控制 dialog-body 的高度
     */
    bodyHeight?: number
}

const componentLocale = createComponentLocale('dialog', {
    'en_us': {
        confirm: 'Confirm',
        cancel: 'Cancel'
    },
    'zh_cn': {
        confirm: '确定',
        cancel: '取消'
    }
})

/**
 * Dialog
 * @description brick component Dialog
 * @for-mobx
 */
export class Dialog extends React.Component<DialogProps> {
    static displayName = 'Dialog'
    // static propTypes = {}
    static defaultProps = {
        className: '',
        maskCancel: false,
        size: 'md'
    }

    static contextType = ConfigContext
    context!: React.ContextType<typeof ConfigContext>

    get className() {
        const {className, size, headline} = this.props
        const actionsAlign = this.actionAlign
        return c(
            'brick-dialog',
            {
                [`brick-dialog-size-${size}`]: size,
                ['brick-dialog-without-headline']: !headline,
                [`brick-dialog-actions-align-${actionsAlign}`]: actionsAlign
            },
            className
        )
    }

    get actionAlign() {
        return getDefaultValueUsingContextTheme(this, 'actionsAlign', 'dialogActionsAlign')
    }

    get modalProps() {
        const props = this.props
        return {
            className: this.className,
            onClickMask: props.maskCancel ? this.handleClickCancel : undefined,
            ...omit(props, [
                'className',
                'size',
                'headline',
                'actions',
                'onConfirm',
                'onCancel',
                'maskCancel',
            ])
        }
    }

    get childrenArray() {
        const {children} = this.props
        if (!children) {
            return []
        }

        return React.Children.toArray(this.props.children)
    }

    get confirmLabel() {
        const {confirmLabel} = this.props
        return isUndefined(confirmLabel) ? this.getLocaleText('confirm') : confirmLabel
    }

    get cancelLabel() {
        const {cancelLabel} = this.props
        return isUndefined(cancelLabel) ? this.getLocaleText('cancel') : cancelLabel
    }

    getLocaleText(key: string, ...args: []): string {
        return safeInvoke(this.context.getLocaleText, componentLocale, key, ...args) || ''
    }

    handleClickConfirm = (e: React.MouseEvent) => {
        return safeInvoke(this.props.onConfirm, e)
    }

    handleClickCancel = (e: React.MouseEvent) => {
        return safeInvoke(this.props.onCancel, e)
    }

    renderCloseX() {
        return (
            <CloseX onClick={this.handleClickCancel} />
        )
    }

    renderHead() {
        const {headline} = this.props
        return <DialogHead>{headline}</DialogHead>
    }

    renderBody() {
        const isPlainBody = !this.childrenArray.some(child => {
            if (React.isValidElement(child)) {
                const type = child.type
                return type === DialogFoot || type === DialogFoot || type === DialogBody
            }

            return false
        })

        if (isDev()) {
            codeWarningOnce(
                isPlainBody,
                '[Dialog]: 如果使用自定义 DialogHead / DialogFoot 则内容亦需要用 DialogBody 进行定义'
            )
        }

        // @zhangenming
        return isPlainBody ? <DialogBody bodyHeight={this.props.bodyHeight}>{this.props.children}</DialogBody> : null
    }

    renderActions() {
        const {actions} = this.props

        return isUndefined(actions) ? (
            <React.Fragment>
                <Button size={'sm'} type={'important'} onClick={this.handleClickConfirm}>{this.confirmLabel}</Button>
                <Button size={'sm'} onClick={this.handleClickCancel}>{this.cancelLabel}</Button>
            </React.Fragment>
        ) : actions
    }

    renderFoot() {
        const actions = this.renderActions()
        return actions
            ? <DialogFoot>{actions}</DialogFoot>
            : null
    }

    render() {
        const childrenArray = this.childrenArray.filter(child => React.isValidElement(child)) as React.ReactElement[]

        const head = childrenArray.find(child => child.type === DialogHead)
        const body = childrenArray.find(child => child.type === DialogBody)
        const foot = childrenArray.find(child => child.type === DialogFoot)

        // @zhangenming
        const SIZE_MAP = {
            xs: 320,
            sm: 400,
            md: 600,
            lg: 800,
            xl: 960
        }

        return (
            // <Modal {...this.modalProps}>
                <div
                    style={{
                        width: SIZE_MAP[this.props.size]
                    }}
                    className={'brick-dialog-wrap'}
                >
                    {this.renderCloseX()}
                    {head || this.renderHead()}
                    {body || this.renderBody()}
                    {foot || this.renderFoot()}
                </div>
            // </Modal>
        )
    }
}
