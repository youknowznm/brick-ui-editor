/**
 * @file dialog-confirm
 * @author wujun07
 * @owner wujun07:2020-01-07
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
// import * as PropTypes from 'prop-types'
import {default as c} from 'classnames'
import {SvgFC, AlertType} from '@befe/brick-core'
import {ButtonProps} from '@befe/brick-comp-button'
import {Dialog, DialogProps} from './dialog'
import {pick, safeInvoke} from '@befe/brick-utils'
import {DialogBody} from './dialog-body'
import {getValueFromContextTheme} from '@befe/brick-core'
import {Icon} from '@befe/brick-comp-icon'

type PropsFromButton = Pick<ButtonProps, 'loadingDelayInMS'>
type PropsFromDialog = Pick<DialogProps,
    | 'size'
    | 'headline'
    | 'confirmLabel'
    | 'cancelLabel'
    | 'onConfirm'
    | 'onCancel'
>

export interface DialogConfirmProps extends PropsFromButton, PropsFromDialog {
    /**
     * 用户可自定义 class
     */
    className?: string

    /**
     * 类型
     */
    type?: AlertType

    /**
     * 自定义 icon
     */
    icon?: SvgFC

    /**
     * 提示内容
     */
    message?: React.ReactNode
}

/**
 * DialogConfirm
 * @description brick component DialogConfirm
 * @for-mobx
 */
export class DialogConfirm extends React.Component<DialogConfirmProps> {
    static displayName = 'DialogConfirm'
    // static propTypes = {}
    static defaultProps = {
        className: '',
        type: 'warning'
    }

    get className() {
        const {className, type} = this.props
        return c(
            'brick-dialog-confirm',
            {
                [`brick-dialog-confirm-type-${type}`]: type
            },
            className
        )
    }

    get dialogProps() {
        return {
            ...pick(this.props, [
                'headline',
                'size',
                'confirmLabel',
                'cancelLabel',
                'onConfirm',
                'onCancel'
            ]),
            visible: true,
        }
    }

    get iconSvg() {
        const {type, icon} = this.props
        if (icon) {
            return icon
        }

        const iconSetFromTheme = getValueFromContextTheme(this.context, 'alertIcon')
        return type && iconSetFromTheme && iconSetFromTheme[type]
    }

    renderIcon() {
        const iconSvg = this.iconSvg

        if (!iconSvg) {
            return null
        }
        return (
            <div className={'brick-dialog-confirm-icon'}>
                <Icon svg={iconSvg} />
            </div>
        )
    }

    renderContent() {
        const {message} = this.props
        const content = ([] as React.ReactNode[])
            .concat(React.Children.toArray(message).filter(Boolean))
            .map((child, idx) => {
                return React.isValidElement(child) ? child : <p key={idx}>{child}</p>
            })

        return (
            <div className={'brick-dialog-confirm-content'}>
                {this.renderIcon()}
                <div className={'brick-dialog-confirm-content-inner'}>
                    {content}
                </div>
            </div>
        )
    }

    render() {
        return (
            <Dialog className={this.className} {...this.dialogProps}>
                <DialogBody>{this.renderContent()}</DialogBody>
            </Dialog>
        )
    }
}
