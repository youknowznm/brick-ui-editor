/**
 * @file menu-popper
 * @author wujun07
 * @owner wujun07:2019-10-11
 */
import * as React from 'react'
// import * as PropTypes from 'prop-types'
import {default as c} from 'classnames'
import {isUndefined} from 'lodash-es'

import {omit, pick} from '@befe/brick-utils'
import {PopperTrigger, Popper, PopperTriggerProps, PopperProps} from '@befe/brick-comp-popper'
import {ConfigContext, getDefaultValueUsingContextTheme} from '@befe/brick-core'
import {PropsFromPopper} from './common'
import {Icon} from '@befe/brick-comp-icon'
import {SvgLoading} from '@befe/brick-icon'

import {PortalContainerConsumer} from '../../utils/PortalContainerContext'

export interface MenuPopperProps extends PopperTriggerProps, PropsFromPopper {
    /**
     * 用户可自定义 class
     */
    className?: string

    /**
     * 尺寸
     */
    size?: 'xs' | 'sm' | 'md' | 'lg'

    /**
     * 是否禁用
     */
    disabled?: boolean

    /**
     * popper 位置
     * 详见 [popper](/components/popper)
     * @default 'right-start'
     */
    placement?: PopperProps['placement']

    /**
     * popper 的 target 元素
     */
    targetContent?: React.ReactNode

    /**
     * 是否处于 loading 状态
     */
    loading?: boolean

    /**
     * 无内容提示
     */
    emptyHint?: React.ReactNode
}

/**
 * PopperMenu
 * @description brick component Menu
 * @for-mobx
 */
// @todo 抽出为单独组件，以便精细化依赖
export class MenuPopper extends React.Component<MenuPopperProps> {
    static displayName = 'MenuPopper'
    // static propTypes = {}
    static defaultProps = {
        className: '',
        disabled: false,
        type: 'click',
        placement: 'bottom-start',
        matchMinWidthToTarget: true
    }
    static contextType = ConfigContext

    context!: React.ContextType<typeof ConfigContext>

    refTrigger = React.createRef<PopperTrigger>()

    get className() {
        const {className, placement} = this.props
        const size = this.size
        return c(
            'brick-menu-popper',
            {
                [`brick-menu-popper-size-${size}`]: size,
                // 无用，placement 相关样式应该从 popper instance 来，因为其实际出现位置是不确定的（自动 flip）
                // [`brick-menu-popper-placement-${placement}`]: placement,
            },
            className
        )
    }

    get triggerProps() {
        return {
            ...omit(this.props, [
                'className',
                'placement',
                'targetContent',
            ]),
            ref: this.refTrigger
        }
    }

    get popperProps() {
        return {
            className: this.className,
            ...pick(this.props, ['placement', 'matchMinWidthToTarget']),
        }
    }

    get size() {
        return getDefaultValueUsingContextTheme(this, 'size', 'defaultSize')
    }

    handleClickNonMenu = (e: React.MouseEvent) => {
        const nodeTrigger = this.refTrigger.current
        if (nodeTrigger) {
            nodeTrigger.setVisible(false, e)
        }
    }

    renderPopperContent() {
        if (this.props.loading) {
            // @todo: 样式细则待确认
            return (
                <div className={'brick-menu-popper-loading'} onClick={this.handleClickNonMenu}>
                    <Icon svg={SvgLoading} spin={true} />
                </div>
            )
        }
        const {children, emptyHint} = this.props

        if (!children && emptyHint) {
            return  <div className={'brick-menu-popper-empty-hint'} onClick={this.handleClickNonMenu}>{emptyHint}</div>
        }

        return children
    }

    render() {
        return <PortalContainerConsumer>
            {
                ctx => (
                    <PopperTrigger {...this.triggerProps}>
                        {this.props.targetContent}
                        <Popper
                            {...this.popperProps}
                            portalContainer={() => document.querySelector(ctx)}
                        >
                            {this.renderPopperContent()}
                        </Popper>
                    </PopperTrigger>
                )
            }
        </PortalContainerConsumer>
    }
}
