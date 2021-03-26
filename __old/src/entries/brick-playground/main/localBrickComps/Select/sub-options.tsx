/**
 * @file sub-options
 * @author wujun07
 * @owner wujun07:2019-11-08
 */
import * as React from 'react'
// import * as PropTypes from 'prop-types'
import {default as c} from 'classnames'

import {Submenu, MenuSubmenuProps} from '@befe/brick-comp-menu'

export interface SubOptionsProps extends MenuSubmenuProps {
    /**
     * 用户可自定义 class
     */
    className?: string

    /**
     * 子菜单类型
     */
    type?: 'group' | 'popper'
}

/**
 * SubOptions
 * @description brick component SubOptions
 * @for-mobx
 */
export class SubOptions extends React.Component<SubOptionsProps> {
    static displayName = 'SubOptions'
    // static propTypes = {}
    static defaultProps = {
        className: '',
    }

    get className() {
        const {className} = this.props
        return c(
            'brick-sub-options',
            className
        )
    }

    render() {
        return (
            <div className={this.className}>
                {'SubOptions'}
            </div>
        )
    }
}
