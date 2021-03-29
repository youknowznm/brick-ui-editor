/**
 * @file popover-confirm
 * @author wujun07
 * @owner wujun07:2020-01-10
 */
import * as React from 'react'
// import * as PropTypes from 'prop-types'
import {default as c} from 'classnames'
import {PopoverProps, Popover} from './popover'
import {AlertType, SvgFC} from '@befe/brick-core'
import {omit, safeInvoke} from '@befe/brick-utils'
import {Button, ButtonProps} from '@befe/brick-comp-button'
import {Icon} from '@befe/brick-comp-icon'
import {
    ConfigContext,
    createComponentLocale,
    getLocaleText,
    getValueFromContextTheme
} from '@befe/brick-core'
import {isUndefined} from 'lodash-es'

const componentLocale = createComponentLocale('popover-confirm', {
    'en_us': {
        confirm: 'Confirm',
        cancel: 'Cancel'
    },
    'zh_cn': {
        confirm: '确定',
        cancel: '取消'
    }
})

type PropsFromPopover = Omit<PopoverProps, 'type' | 'onChange'>
type PopoverConfirmAction = ButtonProps['onClick']

export interface PopoverConfirmProps extends PropsFromPopover {
    /**
     * 用户可自定义 class
     */
    className?: string

    /**
     * type
     */
    type?: AlertType | null

    /**
     * 自定义 icon
     */
    icon?: SvgFC

    /**
     * 提示内容
     */
    message?: React.ReactNode

    /**
     * 点击确认回调
     */
    onConfirm?: (e: React.MouseEvent) => void

    /**
     * 点击取消回调
     */
    onCancel?: (e: React.MouseEvent) => void

    /**
     * 自定义确认按钮文本
     */
    confirmLabel?: string

    /**
     * 自定义取消按钮文本
     */
    cancelLabel?: string
}

/**
 * PopoverConfirm
 * @description brick component PopoverConfirm
 * @for-mobx
 */
export class PopoverConfirm extends React.Component<PopoverConfirmProps> {
    static displayName = 'PopoverConfirm'
    // static propTypes = {}
    static defaultProps = {
        className: '',
        type: 'warning',
        actionsAlign: 'center'
    }

    static contextType = ConfigContext

    context!: React.ContextType<typeof ConfigContext>

    refPopover = React.createRef<Popover>()

    get className() {
        const {className, type} = this.props
        return c(
            'brick-popover-confirm',
            {
                [`brick-popover-confirm-type-${type}`]: type
            },
            className
        )
    }

    get confirmLabel() {
        const {confirmLabel} = this.props
        return isUndefined(confirmLabel) ? this.getLocaleText('confirm') : confirmLabel
    }

    get cancelLabel() {
        const {cancelLabel} = this.props
        return isUndefined(cancelLabel) ? this.getLocaleText('cancel') : cancelLabel
    }

    get actions() {
        return (
            <React.Fragment>
                <Button size={'sm'} type={'important'} onClick={this.handleClickConfirm}>{this.confirmLabel}</Button>
                <Button size={'sm'} onClick={this.handleClickCancel}>{this.cancelLabel}</Button>
            </React.Fragment>
        )
    }

    get iconSvg() {
        const {type, icon} = this.props
        if (icon) {
            return icon
        }

        if (!type) {
            return null
        }

        const iconSetFromTheme = getValueFromContextTheme(this.context, 'alertIcon')
        return iconSetFromTheme && iconSetFromTheme[type]
    }

    get icon() {
        const iconSvg = this.iconSvg
        if (!iconSvg) {
            return null
        }

        return (
            <div className={'brick-popover-confirm-icon'}>
                <Icon svg={iconSvg} />
            </div>
        )
    }

    get content() {
        const {message, content} = this.props
        if (!isUndefined(content)) {
            return content
        }

        const megContent = ([] as React.ReactNode[])
            .concat(React.Children.toArray(message).filter(Boolean))
            .map((child, idx) => {
                return React.isValidElement(child) ? child : <p key={idx}>{child}</p>
            })

        return (
            <div className={'brick-popover-confirm-content'}>
                {this.icon}
                <div className={'brick-popover-confirm-content-inner'}>
                    {megContent}
                </div>
            </div>
        )
    }

    handleClickConfirm = (e: React.MouseEvent) => {
        this.closePopover()
        safeInvoke(this.props.onConfirm, e)
    }

    handleClickCancel = (e: React.MouseEvent) => {
        this.closePopover()
        safeInvoke(this.props.onCancel, e)
    }

    handleClickCloseX = (e: React.MouseEvent) => {
        safeInvoke(this.props.onCancel, e)
    }

    closePopover() {
        const nodePopover = this.refPopover.current
        if (nodePopover) {
            nodePopover.setVisible(false)
        }
    }

    getLocaleText(key: string, ...args: []) {
        return safeInvoke(getLocaleText, componentLocale, key, ...args) || ''
    }

    render() {
        const popoverProps: PopoverProps = {
            ...omit(this.props, ['className', 'type']),
            className: this.className,
            type: 'click',
            content: this.content,
            onClickCloseX: this.handleClickCloseX,
            actions: this.actions
        }

        return (
            <Popover ref={this.refPopover} {...popoverProps}>
                {this.props.children}
            </Popover>
        )
    }
}
