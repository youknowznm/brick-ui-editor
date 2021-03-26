/**
 * @file menu-item-li
 * @author wujun07
 * @owner wujun07:2019-10-16
 */
import * as React from 'react'
// import * as PropTypes from 'prop-types'
import {default as c} from 'classnames'
import {omit} from '@befe/brick-utils'

export interface MenuItemContentProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * 用户可自定义 class
     */
    className?: string
}

/**
 * MenuItemContent
 * @description brick component MenuItemContent
 * @for-mobx
 */
export class MenuItemContent extends React.Component<MenuItemContentProps> {
    static displayName = 'MenuItemContent'
    // static propTypes = {}
    static defaultProps = {
        className: '',
    }

    get className() {
        const {className} = this.props
        return c(
            'brick-menu-item-content',
            className
        )
    }

    get divProps() {
        return omit(this.props, [
            'className',
        ])
    }

    render() {
        return (
            <div className={this.className} {...this.divProps}>
                <div className="brick-menu-item-content-inner">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
