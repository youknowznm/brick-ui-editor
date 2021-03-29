/**
 * @file menu
 * @author wujun07
 * @owner wujun07:2019-10-11
 */
import * as React from 'react'
// import * as PropTypes from 'prop-types'
import {default as c} from 'classnames'
import {isUndefined} from 'lodash-es'
import {safeInvoke, omit} from '@befe/brick-utils'

import {Checkbox, GenericCheckboxProps} from '@befe/brick-comp-checkbox'

import {MenuContext} from './menu-context'
import {MenuItemContent} from './menu-item-content'
import {MenuItemId} from './common'

// 对应 theme $menu-item-padding-horizontal
const THEME_MENU_ITEM_PADDING_HORIZONTAL = 16
type LiAttributes = Omit<React.LiHTMLAttributes<HTMLLIElement>, 'id'>
type PropsFromCheckbox = Pick<GenericCheckboxProps, 'indeterminate'>

export interface MenuItemProps extends LiAttributes, PropsFromCheckbox {
    /**
     * 用户可自定义 class
     */
    className?: string

    /**
     * 唯一标识
     */
    id?: MenuItemId

    /**
     * 是否禁用
     */
    disabled?: boolean
    
    /**
     * 点击回调
     */
    onClick?: (e: React.MouseEvent) => void

    /**
     * 类型（暂定）
     */
    type?: 'normal' | 'checkbox'

    /**
     * 是否选中控制值
     * 如不控制，则以是否在 context.selectedId 进行判断是否选中
     */
    selected?: boolean
}

/**
 * MenuItem
 * @description brick component MenuItem
 * @for-mobx
 */
export class MenuItem extends React.Component<MenuItemProps> {
    static displayName = 'MenuItem'
    // static propTypes = {}
    static defaultProps = {
        className: '',
        disabled: false,
        type: 'normal',
    }

    static contextType = MenuContext
    context!: React.ContextType<typeof MenuContext>

    get className() {
        const {className, disabled} = this.props
        const type = this.type
        return c(
            'brick-menu-item',
            {
                'brick-menu-item-selected': this.isSelected,
                [`brick-menu-item-type-${type}`]: type,
                'brick-menu-item-disabled': disabled,
            },
            className
        )
    }

    get type() {
        return this.context.multipleItemType
    }

    get multiple() {
        return this.context.multiple
    }

    get liProps() {
        const liProps = {
            ...omit(this.props, ['className', 'onClick', 'style', 'id', 'indeterminate']),
            onClick: this.handleClick,
        }

        return liProps
    }

    get isSelected() {
        const {selected} = this.props
        if (!isUndefined(selected)) {
            return selected
        }

        const {selectedIds = []} = this.context
        const {id} = this.props
        if (isUndefined(id)) {
            return false
        }
        return selectedIds.includes(id)
    }

    get checkboxSize() {
        return this.context.size
    }

    handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
        const {id, disabled} = this.props
        if (disabled) {
            return
        }

        safeInvoke(this.props.onClick, e)

        if (!isUndefined(id)) {
            safeInvoke(this.context.onClickItem, id, e)
        }
    }

    renderPrefix() {
        if (this.multiple && this.type === 'checkbox') {
            return <Checkbox
                checked={this.isSelected}
                size={this.checkboxSize}
                indeterminate={this.props.indeterminate}
                disabled={this.props.disabled}
            />
        }

        return null
    }

    render() {
        return (
            <li className={this.className} {...this.liProps}>
                <MenuItemContent>
                    {this.renderPrefix()}
                    {this.props.children}
                </MenuItemContent>
            </li>
        )
    }
}
