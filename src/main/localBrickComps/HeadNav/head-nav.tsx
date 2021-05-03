/**
 * @file head-nav
 * @author wujun07
 * @owner wujun07:2019-11-25
 */
import * as React from 'react'
// import * as PropTypes from 'prop-types'
import c from 'classnames'

import {
    ConfiguredComponent,
    getValueFromContextTheme,
} from '@befe/brick-core'
import {
    Menu,
    Submenu,
    MenuPopper,
    MenuItemId,
    MenuItem,
    MenuProps,
    MenuItemObject,
    getControlledMenuIdsFromProps,
    NavProps,
} from '@befe/brick-comp-menu'
import {Icon} from '@befe/brick-comp-icon'
import {SvgTriangleDown} from '@befe/brick-icon'
import {isString, isUndefined} from 'lodash-es'
import {safeInvoke} from '@befe/brick-utils'

/**
 * @public
 */
export interface HeadNavMenuItemObject extends Omit<MenuItemObject, 'type' | 'expanded'> {
}

type PropsFromMenu = Pick<MenuProps, 'reverseColor' | 'onChangeSelectedIds'>
type PropsFromNavProps = Omit<NavProps<HeadNavMenuItemObject>, 'menuExpandedIds' | 'menuDefaultExpandedIds'>

export interface HeadNavProps extends PropsFromMenu, PropsFromNavProps {
    /**
     * 用户可自定义 class
     */
    className?: string

    /**
     * logo
     */
    logo?: React.ReactNode

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
    userMenu?: HeadNavMenuItemObject[]

    /**
     * @todo
     * 用户旁附加内容，（预留）尚无设计细则
     */
    userExtra?: React.ReactNode
}

interface HeadNavState {
    // avatar?: string
    menuSelectedIds: MenuItemId[]
}

function getControlledStateFromProps(props: HeadNavProps) {
    const state: Partial<HeadNavState> = {}

    const menuSelectedIds = getControlledMenuIdsFromProps<HeadNavMenuItemObject>(
        props,
        'menuSelectedIds',
        (item: HeadNavMenuItemObject) => !item.disabled && !!item.selected,
    )
    if (menuSelectedIds) {
        state.menuSelectedIds = menuSelectedIds
    }

    return state
}

/**
 * HeadNav
 * @description brick component HeadNav
 * @for-mobx
 */
export class HeadNav extends ConfiguredComponent<HeadNavProps, HeadNavState> {
    static displayName = 'HeadNav'
    // static propTypes = {}
    static defaultProps = {
        className: '',
        reverseColor: true,
    }

    static getDerivedStateFromProps(nextProps: HeadNavProps) {
        const state = getControlledStateFromProps(nextProps)
        return Object.keys(state).length ? state : null
    }

    state: HeadNavState

    constructor(props: HeadNavProps) {
        super(props)
        const state = getControlledStateFromProps(props)
        // 非控制型 menuSelectedIds
        if (isUndefined(state.menuSelectedIds)) {
            state.menuSelectedIds = props.menuDefaultSelectedIds || []
        }

        this.state = state as HeadNavState
    }

    get className() {
        const {className} = this.props
        return c(
            'brick-head-nav',
            className,
        )
    }

    get themeDefaultSize() {
        return getValueFromContextTheme(this.context, 'defaultSize')
    }

    get hasUserMenu() {
        const {userMenu} = this.props
        return !!(userMenu && userMenu.length)
    }

    handleChangeSelectedIds: MenuProps['onChangeSelectedIds'] = (menuSelectedIds) => {
        isUndefined(this.props.menuSelectedIds)
        && this.setState({
            menuSelectedIds,
        })

        safeInvoke(this.props.onChangeSelectedIds, menuSelectedIds)
    }

    renderMenuItem = (item: HeadNavMenuItemObject, index: number, level = 0) => {
        const {id, label, title, children, href, target, onClick} = item
        const key = id || index
        const itemContent = href ? <a href={href} target={target}>{label}</a> : label
        const itemProps = {
            key,
            id: key,
            icon: level ? undefined : item.icon,
            title,
            onClick,
        }

        if (!isUndefined(children)) {
            return (
                <Submenu
                    {...itemProps}
                    type={'popper'}
                    itemContent={itemContent}
                >
                    {children.map((child, idx) => this.renderMenuItem(child, idx, level + 1))}
                </Submenu>
            )
        }

        return (
            <MenuItem {...itemProps}>{itemContent}</MenuItem>
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
        const menuChildren = children || menu && menu.map((item, idx) => this.renderMenuItem(item, idx))

        if (!menuChildren) {
            return null
        }

        return (
            <div className={'brick-head-nav-menu'}>
                <Menu
                    layout={'horizontal'}
                    reverseColor={reverseColor}
                    selectedIds={this.state.menuSelectedIds}
                    onChangeSelectedIds={this.handleChangeSelectedIds}
                >
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

    renderUserMenuItem(item: HeadNavMenuItemObject) {
        const {children, label, ...itemProps} = item
        const key = itemProps.id
        if (children && children.length) {
            return (
                <Submenu id={key} key={key} type={'popper'} itemContent={label}>
                    {children.map(userMenuitem => this.renderUserMenuItem(userMenuitem))}
                </Submenu>
            )
        }

        return <MenuItem id={key} key={key} {...itemProps}>{label}</MenuItem>
    }

    getUserMenuSelectedIds(menuItems: HeadNavMenuItemObject[]) {
        let selectedIds: MenuItemId[] = []
        selectedIds = selectedIds.concat(...menuItems.map(item => {
            let selected: MenuItemId[] = []
            if (item.selected && item.id) {
                selected.push(item.id)
            }
            if (item.children) {
                selected = selected.concat(this.getUserMenuSelectedIds(item.children))
            }

            return selected
        }))

        return selectedIds
    }

    renderUserMenu() {
        const userMenu = this.props.userMenu!
        const selectedIds = this.getUserMenuSelectedIds(userMenu)

        return (
            <Menu className={'brick-head-nav-user-menu'} selectedIds={selectedIds} size={'sm'}>
                {userMenu.map(userMenuItem => this.renderUserMenuItem(userMenuItem))}
            </Menu>
        )
    }

    renderUserInfo() {
        const hasUserMenu = this.hasUserMenu
        const {userInfoPrimary, userInfoSecondary} = this.props
        const titleTipPrimary = isString(userInfoPrimary) ? userInfoPrimary : ''
        const titleTipSecondary = isString(userInfoSecondary) ? userInfoSecondary : ''

        const userInfo = (
            <div className={'brick-head-nav-user-info'}>
                <div className={'brick-head-nav-user-info-avatar'}>
                    <img src={this.props.avatar}/>
                </div>
                <div className={'brick-head-nav-user-info-detail'}>
                    <p className={'brick-head-nav-user-info-detail-primary'} title={titleTipPrimary}>
                        {userInfoPrimary}
                    </p>
                    <p className={'brick-head-nav-user-info-detail-secondary'} title={titleTipSecondary}>
                        {userInfoSecondary}
                    </p>
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
                targetNode={userInfo}
                preventOverflowBoundary={'viewport'}
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

    /* istanbul ignore next 预留功能 */

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
