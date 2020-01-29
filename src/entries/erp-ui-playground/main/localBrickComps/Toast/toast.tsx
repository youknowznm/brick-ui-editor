/**
 * @file toast
 * @author wujun07
 * @owner wujun07:2019-11-29
 */
import * as React from 'react'
// import * as PropTypes from 'prop-types'
import {default as c} from 'classnames'
import {createDelayHandler, safeInvoke, tuple} from '@befe/brick-utils'

import {Icon} from '@befe/brick-comp-icon'

import {SvgSignInfo} from '@befe/brick-icon'
import {ALERT_TYPES, AlertType, SvgFC} from '@befe/brick-core'
import {ThemeConfig, ConfigContext, getValueFromContextTheme} from '@befe/brick-comp-config-provider'
import {CloseX} from '@befe/brick-comp-close-x'

export const ToastTypes = ALERT_TYPES

const TOAST_DURATION_IN_MS_MIN = 3000

export interface ToastProps {
    /**
     * 用户可自定义 class
     */
    className?: string

    /**
     * 提示类型
     */
    type?: AlertType

    /**
     * 自定义 icon
     */
    icon?: SvgFC

    /**
     * 提示标题
     */
    headline?: React.ReactNode

    /**
     * 提示内容
     */
    content?: React.ReactNode

    /**
     * 显示时长
     * - <= 0 表示不自动关闭
     * - <= default 的正值将自动修正为 default
     */
    durationInMS?: number

    /**
     * 关闭回调
     */
    onClose?: () => void

    /**
     * 是否可手工关闭
     */
    manualClose?: boolean

}

/**
 * Toast
 * @description brick component Toast
 * @for-mobx
 */
export class Toast extends React.Component<ToastProps> {
    static displayName = 'Toast'
    // static propTypes = {}
    static defaultProps = {
        className: '',
        durationInMS: TOAST_DURATION_IN_MS_MIN,
        manualClose: false
    }

    static contextType = ConfigContext
    context!: React.ContextType<typeof ConfigContext>

    get className() {
        const {className, type, manualClose} = this.props
        return c(
            'brick-toast',
            {
                [`brick-toast-type-${type}`]: type,
                ['brick-toast-with-close-x']: manualClose,
                ['brick-toast-compact']: !this.isCompact,
            },
            className
        )
    }

    get isCompact() {
        return !!this.props.headline
    }

    get duration() {
        const {durationInMS} = this.props

        if (typeof durationInMS !== 'number') {
            return TOAST_DURATION_IN_MS_MIN
        }
        else if (durationInMS <= 0) {
            return 0
        }

        return Math.max(TOAST_DURATION_IN_MS_MIN, durationInMS)
    }

    get iconSvg() {
        const {type, icon} = this.props
        if (icon) {
            return icon
        }

        const iconSetFromTheme = getValueFromContextTheme(
            this.context,
            'alertIcon'
        ) as ThemeConfig['alertIcon']
        return type && iconSetFromTheme && iconSetFromTheme[type] || SvgSignInfo
    }

    closeTimer = createDelayHandler(() => {
        this.close()
    }, this.duration)

    handleMouseEnter = (e: React.MouseEvent) => {
        this.closeTimer.clear()
    }

    handleMouseLeave = (e: React.MouseEvent) => {
        this.startDelayClose()
    }

    close = () => {
        this.closeTimer.clear()
        safeInvoke(this.props.onClose)
    }


    startDelayClose() {
        if (this.props.durationInMS) {
            this.closeTimer()
        }
    }

    renderCloseX() {
        if (!this.props.manualClose) {
            return null
        }

        return <CloseX onClick={this.close} />
    }

    componentDidMount(): void {
        this.startDelayClose()
    }

    renderIcon() {
        return (
            <div className={'brick-toast-icon'}>
                <Icon svg={this.iconSvg} />
            </div>
        )
    }

    renderHeadline() {
        const {headline} = this.props

        return headline ? (
            <div className={'brick-toast-headline'}>
                {headline}
            </div>
        ) : null
    }

    renderContent() {
        const {content} = this.props
        return content ? (
            <div className={'brick-toast-content'}>
                {content}
            </div>
        ) : null
    }

    render() {
        // @todo: 经确认，设计上 Toast 与 Alert 是一致的，Toast 应复用 Alert
        return (
            <div
                className={this.className}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
            >
                {this.renderIcon()}
                {this.renderHeadline()}
                {this.renderContent()}
                {this.renderCloseX()}
            </div>
        )
    }
}
