/**
 * @file select-option-group
 * @author wujun07
 * @owner wujun07:2019-11-07
 */
import * as React from 'react'
// import * as PropTypes from 'prop-types'
import {default as c} from 'classnames'
import {Submenu, MenuSubmenuProps} from '@befe/brick-comp-menu'
import {omit} from '@befe/brick-utils'

type PropsFromMenuSubmenu = Omit<MenuSubmenuProps, 'itemContent'>

export interface SelectOptionGroupProps extends PropsFromMenuSubmenu {
    /**
     * 用户可自定义 class
     */
    className?: string

    /**
     * 选项组类型
     */
    type?: 'group' | 'popper'

    /**
     * 显示值
     */
    label?: React.ReactNode
}

/**
 * SelectOptionGroup
 * @description brick component SelectOptionGroup
 * @for-mobx
 */
export class OptionGroup extends React.Component<SelectOptionGroupProps> {
    static displayName = 'SelectOptionGroup'
    // static propTypes = {}
    static defaultProps = {
        className: '',
        type: 'group'
    }

    get className() {
        const {className} = this.props
        return c(
            'brick-select-option-group',
            className
        )
    }

    get subMenuProps(): MenuSubmenuProps  {
        const {label} = this.props
        return {
            ...omit(this.props, ['className', 'label']),
            className: this.className,
            popperTriggerType: 'click',
            itemContent: label
        }
    }

    render() {
        return (
            <Submenu {...this.subMenuProps}>
                {this.props.children}
            </Submenu>
        )
    }
}
