/**
 * @file head-nav
 * @author wujun07
 * @owner wujun07:2019-11-25
 */
import * as React from 'react'
// import * as PropTypes from 'prop-types'
import {default as c} from 'classnames'

import {
    ConfigContext,
    getValueFromContextTheme,
} from '@befe/brick-comp-config-provider'
import {MenuItemProps, Menu, Submenu, MenuPopper, MenuItemId, MenuItem, MenuProps} from '@befe/brick-comp-menu'
import {Icon} from '@befe/brick-comp-icon'
import {SvgTriangleDown} from '@befe/brick-icon'
import {isUndefined} from 'lodash-es'
import {safeInvoke} from '@befe/brick-utils'

interface MenuItemObject extends MenuItemProps {
    label: React.ReactNode
    href?: string
    target?: string
    selected?: boolean
    children?: MenuItemObject[]
}

type PropsFromMenu = Pick<MenuProps, 'reverseColor'>

export interface HeadNavProps extends PropsFromMenu {
    /**
     * 用户可自定义 class
     */
    className?: string

    /**
     * logo
     */
    logo?: React.ReactNode

    /**
     * menu
     */
    menu?: MenuItemObject[]

    /**
     * menu 已选择的 id 列表的控制值
     */
    menuSelectedIds?: MenuItemId[]

    /**
     * menu item 的点击回调
     */
    onClickMenuItem?: (item: MenuItemObject, e: React.MouseEvent) => void

    /**
     * 头像 url
     */
    avatar?: string

    /**
     * 用户主信息，一般为 姓名(工号)
     */
    userInfoPrimary?: React.ReactNode

    /**
     * 用户次要信息，一般为 部门
     */
    userInfoSecondary?: React.ReactNode

    /**
     * 用户菜单
     */
    userMenu?: MenuItemObject[]

    /**
     * @todo 用户附加内容，预留，尚无设计细则
     */
    userExtra?: React.ReactNode
}

interface HeadNavState {
    avatar?: string
}

/**
 * HeadNav
 * @description brick component HeadNav
 * @for-mobx
 */
export class HeadNav extends React.Component<HeadNavProps, HeadNavState> {
    static displayName = 'HeadNav'
    // static propTypes = {}
    static defaultProps = {
        className: '',
        reverseColor: true
    }

    static contextType = ConfigContext

    context!: React.ContextType<typeof ConfigContext>

    get className() {
        const {className} = this.props
        return c(
            'brick-head-nav',
            className
        )
    }

    get themeDefaultSize() {
        return getValueFromContextTheme(this.context, 'defaultSize')
    }

    get hasUserMenu() {
        const {userMenu} = this.props
        return !!(userMenu && userMenu.length)
    }

    get menu() {
        const {children, menu} = this.props
        if (children) {
            return children
        }

        return menu && menu.map(this.renderMenuItem)
    }

    get selectedMenuIds() {
        const {menu, menuSelectedIds} = this.props

        if (!isUndefined(menuSelectedIds)) {
            return menuSelectedIds
        }

        const selectedIds: MenuItemId[] = []
        const collectSelected = (item: MenuItemObject) => {
            const {id, disabled, selected, children} = item
            if (children) {
                children.forEach(collectSelected)
            }
            if (id && !disabled && selected) {
                selectedIds.push(id)
            }
        }

        (menu || []).forEach(collectSelected)

        return selectedIds
    }

    renderMenuItem = (item: MenuItemObject, index: number) => {
        const {id, label, children, href, target, onClick} = item
        const {onClickMenuItem} = this.props
        const key = id || index
        const itemContent = href ? <a href={href} target={target}>{label}</a> : label

        let onClickItem = onClick

        if (isUndefined(onClickItem) && !isUndefined(onClickMenuItem)) {
            onClickItem = e => {
                safeInvoke(onClickMenuItem, item, e)
            }
        }

        if (!isUndefined(children)) {
            return (
                <Submenu
                    key={key}
                    type={'popper'}
                    itemContent={itemContent}
                    onClick={onClickItem}
                >
                    {children.map(this.renderMenuItem)}
                </Submenu>
            )
        }

        return (
            <MenuItem key={key} id={id} onClick={onClickItem}>{itemContent}</MenuItem>
        )
    }

    renderLogo() {
        return (
            <div className={'brick-head-nav-logo'}>
                {this.props.logo}
            </div>
        )
    }

    renderMenu() {
        const {children, reverseColor, menu} = this.props
        const menuChildren = children
            ? children
            : menu && menu.map(this.renderMenuItem)

        if (!menuChildren) {
            return null
        }

        return (
            <div className={'brick-head-nav-menu'}>
                <Menu layout={'horizontal'} reverseColor={reverseColor} selectedIds={this.selectedMenuIds}>
                    {menuChildren}
                </Menu>
            </div>
        )
    }

    renderUserExtra() {
        const {userExtra} = this.props
        if (!userExtra) {
            return null
        }
        return (
            <div className={'brick-head-nav-user-extra'}>{userExtra}</div>
        )
    }

    renderUserMenuItem(item: MenuItemObject) {
        const {children, label, ...itemProps} = item
        const key = itemProps.id
        if (children && children.length) {
            return (
                <Submenu key={key} type={'popper'} itemContent={label}>
                    {children.map(userMenuitem => this.renderUserMenuItem(userMenuitem))}
                </Submenu>
            )
        }

        return <MenuItem key={key} {...itemProps}>{label}</MenuItem>
    }

    getSelectedIds(menuItems: MenuItemObject[] | undefined = this.props.userMenu) {
        let selectedIds: MenuItemId[] = []
        if (menuItems && menuItems.length) {


            selectedIds = selectedIds.concat(...menuItems.map(item => {
                let selected: MenuItemId[] = []
                if (item.selected && item.id) {
                    selected.push(item.id)
                }
                if (item.children) {
                    selected = selected.concat(this.getSelectedIds(item.children))
                }


                return selected
            }))
        }

        return selectedIds
    }

    renderUserMenu() {
        const {userMenu} = this.props
        if (!userMenu) {
            return null
        }
        const selectedIds = this.getSelectedIds()

        return (
            <Menu className={'brick-head-nav-user-menu'} selectedIds={selectedIds} size={'sm'}>
                {userMenu.map((userMenuItem => this.renderUserMenuItem(userMenuItem)))}
            </Menu>
        )
    }

    renderUserInfo() {
        const hasUserMenu = this.hasUserMenu
        const userInfo = (
            <div className={'brick-head-nav-user-info'}>
                <div className={'brick-head-nav-user-info-avatar'}>
                    <img src={this.props.avatar}/>
                </div>
                <div className={'brick-head-nav-user-info-detail'}>
                    <p className={'brick-head-nav-user-info-detail-primary'}>{this.props.userInfoPrimary}</p>
                    <p className={'brick-head-nav-user-info-detail-secondary'}>{this.props.userInfoSecondary}</p>
                </div>
                {this.hasUserMenu ? (
                    <div className={'brick-head-nav-user-info-arrow'}>
                        <Icon svg={SvgTriangleDown}/>
                    </div>
                ) : null}
            </div>
        )

        return hasUserMenu ? (
            <MenuPopper
                size={this.themeDefaultSize}
                type={'hover'}
                targetContent={userInfo}
            >
                {this.renderUserMenu()}
            </MenuPopper>
        ) : userInfo
    }

    renderUser() {
        return (
            <div className={'brick-head-nav-user'}>
                {this.renderUserExtra()}
                {this.renderUserInfo()}
            </div>
        )
    }

    // 用来计算菜单宽度，以自适应屏幕宽度收起到"更多"
    renderShadowMenu() {
        return null
        // @todo
        const {menu} = this.props
        if (!menu) {
            return null
        }
        return <div className={'brick-head-nav-shadow-menu'}>shadow-menu</div>
    }

    render() {
        return (
            <div className={this.className}>
                <div className={'brick-head-nav-content'}>
                    <div className={'brick-head-nav-content-inner'}>
                        {this.renderLogo()}
                        {this.renderMenu()}
                        {this.renderUser()}
                        {this.renderShadowMenu()}
                    </div>
                </div>
            </div>
        )
    }
}
