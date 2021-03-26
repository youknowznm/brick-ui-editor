/**
 * @file select-option
 * @author wujun07
 * @owner wujun07:2019-11-07
 */
import * as React from 'react'
// import * as PropTypes from 'prop-types'
import {default as c} from 'classnames'

import {MenuItem, MenuItemProps} from '@befe/brick-comp-menu'
import {omit} from '@befe/brick-utils'
import {OptionValue} from "./common";

type PropsFromMenuItem = Omit<MenuItemProps, 'id'>

export interface SelectOptionProps extends PropsFromMenuItem {
    /**
     * 用户可自定义 class
     */
    className?: string

    /**
     * 选项的值
     * 亦是选项的唯一标识
     */
    value?: OptionValue
}

/**
 * SelectOption
 * @description brick component SelectOption
 * @for-mobx
 */
export class Option extends React.Component<SelectOptionProps> {
    static displayName = 'SelectOption'
    // static propTypes = {}
    static defaultProps = {
        className: '',
    }

    get className() {
        const {className} = this.props
        return c(
            'brick-select-option',
            className
        )
    }

    get menuItemProps() {
        return {
            ...omit(this.props, ['className', 'value']),
            className: this.className,
            id: this.props.value
        }
    }

    render() {
        return (
            <MenuItem {...this.menuItemProps}>
                {this.props.children}
            </MenuItem>
        )
    }
}
