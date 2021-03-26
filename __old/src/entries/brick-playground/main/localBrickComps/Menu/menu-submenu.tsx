/**
 * @file menu-submenu
 * @author wujun07
 * @owner wujun07:2019-10-12
 */
import * as React from 'react'
// import * as PropTypes from 'prop-types'
import {default as c} from 'classnames'

import {codeWarningOnce, isDev, safeInvoke} from '@befe/brick-utils'

import {MenuItem} from './menu-item'
import {MenuItemContent} from './menu-item-content'
import {MenuPopper, MenuPopperProps} from './menu-popper'
import {Menu} from './menu'
import {MenuContext} from './menu-context'
import {MenuItemId} from './common'
import {isUndefined} from 'lodash-es'

export interface MenuSubmenuProps {
    /**
     * 用户可自定义 class
     */
    className?: string

    /**
     * 子菜单类型
     */
    type?: 'group' | 'folder' | 'popper'

    /**
     * 唯一标识
     */
    id?: MenuItemId

    /**
     * 菜单项元素
     */
    itemContent?: React.ReactNode

    /**
     * popper menu 触发类型
     */
    popperTriggerType?: 'hover' | 'click'

    /**
     * popper menu 位置
     */
    popperPlacement?: MenuPopperProps['placement']

    /**
     * 点击回调
     */
    onClick?: (e: React.MouseEvent) => void
}

/**
 * MenuSubmenu
 * @description brick component MenuSubmenu
 * @for-mobx
 */
export class Submenu extends React.Component<MenuSubmenuProps> {
    static displayName = 'Submenu'
    // static propTypes = {}
    static defaultProps = {
        className: '',
        type: 'folder',
        disabled: false,
        popperTriggerType: 'hover',
    }

    static contextType = MenuContext

    context!: React.ContextType<typeof MenuContext>

    get className() {
        const {className, type} = this.props
        return c(
            `brick-menu-submenu`,
            `brick-menu-submenu-type-${type}`,
            {
                [`brick-menu-submenu-${this.isExpanded ? 'expanded' : 'collapsed'}`]: type === 'folder',
                ['brick-menu-submenu-has-descendant-selected']: this.hasDescendantSelected,
            },
            className
        )
    }

    get layout() {
        return this.context.layout
    }

    get isLayoutHorizontal() {
        return this.layout === 'horizontal'
    }

    get popperMenuPlacement(): MenuPopperProps['placement'] {
        const {popperPlacement} = this.props
        if (!isUndefined(popperPlacement)) {
            return popperPlacement
        }

        if (this.isLayoutHorizontal) {
            return 'bottom-start'
        }

        if (this.layout === 'vertical-right') {
            return 'left-start'
        }

        return 'right-start'
    }

    get isExpanded() {
        const {expandedIds = []} = this.context
        if (typeof this.props.id === 'undefined') {
            return false
        }
        return expandedIds.includes(this.props.id)
    }

    get hasDescendantSelected() {
        const {selectedIds} = this.context
        if (!selectedIds) {
            return false
        }
        const hasChildSelected = (children: React.ReactNode): boolean => {
            return React.Children.toArray(children).some(child => {
                if (!React.isValidElement(child)) {
                    return false
                } else if (child.type === MenuItem) {
                    const {selected} = child.props
                    return isUndefined(selected) ? selectedIds.includes(child.props.id) : selected
                } else if (child.type === Submenu) {
                    return hasChildSelected(child.props.children)
                }

                return false
            })
        }

        return hasChildSelected(this.props.children)
    }

    get mustBePopper() {
        return this.isLayoutHorizontal
    }

    get menuPopperSize() {
        const {size} = this.context
        switch (size) {
            case 'md':
            case 'sm':
                return 'sm'
        }
        return undefined
    }

    get submenuSize() {
        if (this.props.type === 'popper') {
            return this.menuPopperSize
        }

        return this.context.size
    }

    handlerClickItemContent = (e: React.MouseEvent) => {
        const {id} = this.props
        safeInvoke(this.props.onClick, e)
        if (this.props.type === 'folder' && !isUndefined(id)) {
            safeInvoke(this.context.onClickSubmenu, id, e)
        }
    }

    renderMenuArrow() {
        const {type} = this.props
        if (type === 'group') {
            return null
        }

        return <i className="brick-menu-submenu-arrow"/>
    }

    renderMenuItem(submenu: React.ReactChild | null) {
        const {type, itemContent} = this.props
        const mustBePopper = this.mustBePopper
        const validType = type === 'popper' || !mustBePopper

        if (isDev()) {
            codeWarningOnce(validType, [
                'while layout is \'horizontal\',',
                'level 1 Submenu type must be \'popper\'.',
                'Submenu will change it automatically',
            ].join(' '))
        }

        if (type === 'popper' || mustBePopper || (type === 'folder' && !this.isExpanded)) {
            submenu = null
        }

        return (
            <li className={this.className}>
                <MenuItemContent
                    onClick={this.handlerClickItemContent}
                >
                    {itemContent}
                    {this.renderMenuArrow()}
                </MenuItemContent>
                {submenu}
            </li>
        )
    }

    renderSubmenu() {
        return <Menu size={this.submenuSize} className="brick-menu-submenu-menu">{this.props.children}</Menu>
    }

    render() {
        const submenu = this.renderSubmenu()
        const menuItem = this.renderMenuItem(submenu)

        if (this.props.type === 'popper' || this.mustBePopper) {
            return (
                <MenuPopper
                    size={this.menuPopperSize}
                    targetContent={menuItem}
                    placement={this.popperMenuPlacement}
                    type={this.props.popperTriggerType}
                >
                    {submenu}
                </MenuPopper>
            )
        }

        return menuItem
    }
}
