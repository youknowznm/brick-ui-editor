/**
 * @file popover
 * @author wujun07
 * @owner wujun07:2020-01-09
 */
import * as React from 'react'
// import * as PropTypes from 'prop-types'
import {default as c} from 'classnames'

import {PopperProps, Popper, PopperTrigger, PopperTriggerProps} from '@befe/brick-comp-popper'
import {omit, pick, safeInvoke} from '@befe/brick-utils'
import {CloseX} from '@befe/brick-comp-close-x'
import {isUndefined} from 'lodash-es'
import {Button} from '@befe/brick-comp-button'
import {ConfigContext, getDefaultValueUsingContextTheme} from '@befe/brick-core'

import {PortalContainerConsumer} from '../../utils/PortalContainerContext'

type PropsFromPopper = Pick<PopperProps, 'placement' | 'withArrow'>

export interface PopoverProps extends PopperTriggerProps, PropsFromPopper {
    /**
     * 用户可自定义 class
     */
    className?: string

    /**
     * 是否有箭头
     */
    withArrow?: boolean

    /**
     * 标题
     */
    headline?: React.ReactNode

    /**
     * 内容
     */
    content?: React.ReactNode

    /**
     * 操作
     */
    actions?: React.ReactNode

    /**
     * 操作位置
     */
    actionsAlign?: 'left' | 'center' | 'right'

    /**
     * 是否有关闭小叉
     */
    withCloseX?: boolean

    /**
     * 点击关闭小叉回调
     */
    onClickCloseX?: (e: React.MouseEvent) => void
}

/**
 * Popover
 * @description brick component Popover
 * @for-mobx
 */
export class Popover extends React.Component<PopoverProps> {
    static displayName = 'Popover'
    // static propTypes = {}
    static defaultProps = {
        className: '',
        placement: 'top',
        withArrow: true
    }

    static contextType = ConfigContext

    context!: React.ContextType<typeof ConfigContext>

    refTrigger = React.createRef<PopperTrigger>()

    get className() {
        const {className} = this.props
        const actionsAlign = this.actionAlign
        return c(
            'brick-popover',
            {
                [`brick-popover-actions-align-${actionsAlign}`]: actionsAlign
            },
            className
        )
    }

    get actionAlign() {
        return getDefaultValueUsingContextTheme(this, 'actionsAlign', 'dialogActionsAlign')
    }

    get withCloseX() {
        const {withCloseX, type} = this.props
        if (type !== 'click') {
            return false
        }

        return isUndefined(withCloseX) ? !!this.props.headline : withCloseX
    }

    get triggerProps() {
        return {
            ...omit(this.props, [
                'className',
                'withArrow',
                'placement',
                'content',
                'headline',
                'actions',
                'actionsAlign',
                'withCloseX'
            ]),
            ref: this.refTrigger
        }
    }

    get popperProps(): PopperProps {
        return {
            className: this.className,
            ...pick(this.props, ['placement', 'withArrow'])
        }
    }

    /**
     * @public
     */
    setVisible(visible: boolean, e?: Event | React.SyntheticEvent) {
        const nodeTrigger = this.refTrigger.current
        if (nodeTrigger) {
            nodeTrigger.setVisible(false, e)
        }
    }

    handleClickClose = (e: React.MouseEvent) => {
        this.setVisible(false, e)
        safeInvoke(this.props.onClickCloseX, e)
    }

    renderCloseX() {
        return this.withCloseX
            ? <CloseX onClick={this.handleClickClose}/>
            : null
    }

    renderHeadline() {
        const {headline} = this.props
        return headline ? <div className={'brick-popover-headline'}>{headline}</div> : null
    }

    renderContent() {
        const {content} = this.props
        return content
            ? <div className={'brick-popover-content'}>{content}</div>
            : null
    }

    renderActions() {
        const {actions} = this.props
        if (!actions) {
            return null
        }

        const isAllPlain = React.Children.toArray(actions).every(child => {
            return React.isValidElement(child)
                && child.type === Button && child.props.type === 'plain'
        })

        const className = c(
            'brick-popover-actions',
            isAllPlain ? 'brick-popover-actions-is-all-plain' : ''
        )

        return <div className={className}>{actions}</div>
    }

    render() {
        return (
            <PortalContainerConsumer>
                {
                    ctx => {
                        return <PopperTrigger {...this.triggerProps}>
                            {this.props.children}
                            <Popper
                                {...this.popperProps}
                                portalContainer={() => document.querySelector(ctx)}
                            >
                                <div className={'brick-popover-wrap'}>
                                    {this.renderCloseX()}
                                    {this.renderHeadline()}
                                    {this.renderContent()}
                                    {this.renderActions()}
                                </div>
                            </Popper>
                        </PopperTrigger>
                    }
                }
            </PortalContainerConsumer>
        )
    }
}
