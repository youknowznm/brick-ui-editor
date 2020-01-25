import * as React from 'react'
import {Link as RouteLink, RouteComponentProps, withRouter} from 'react-router-dom'
import {Menu, Submenu, MenuItem, Link} from '@befe/brick'

import {urlUtils} from 'src/utils'
import {SITE_MAP, SiteNode} from '../site-map'
import {ENTRY_NAME} from '../../constants'

interface MenuRouteItem {
    key: string
    label?: string | React.ReactNode
    path?: string
    entry?: string
    children?: MenuRouteItem[]
}

const getMenuItemKey = (entry: string, path: string) => `${entry}${path}`
const makeMenuItem = (siteNode: SiteNode): MenuRouteItem => {
    const {label, children, path = '', entry = ''} = siteNode
    return {
        key: getMenuItemKey(entry, path),
        children: children && children.map(makeMenuItem),
        label,
        entry,
        path,
    }
}

const menu = SITE_MAP.children!.map(makeMenuItem)
const defaultExpandedIds = menu.map(menuItem => menuItem.key).filter(Boolean)

interface SideMenuProps extends RouteComponentProps {
    forwardRef?: React.Ref<HTMLDivElement>
}

const SideMenuWithRouter = withRouter((props: SideMenuProps) => {
    const selectedIds = [getMenuItemKey(ENTRY_NAME, props.location.pathname.replace(/\/$/, ''))]
    const [expandedIds, updateExpandedIds] = React.useState(defaultExpandedIds)

    const renderMenuItem = (item: MenuRouteItem): React.ReactChild => {
        const {path = '', label, key, entry} = item

        const link = ENTRY_NAME === entry
            ? <RouteLink to={path}>{label}</RouteLink>
            : <Link href={urlUtils.getPageLink(path, {}, {entry})}>{label}</Link>

        return (
            <MenuItem id={key} key={key}>
                {link}
            </MenuItem>
        )
    }

    const renderMenu = (subMenuItem: MenuRouteItem) => {
        const {key, label, children} = subMenuItem
        return children
            ? (
                <Submenu id={key} key={key} itemContent={label}>
                    {children.map(renderMenuItem)}
                </Submenu>
            )
            : renderMenuItem(subMenuItem)
    }

    return (
        <div className="app-side-menu-wrap" ref={props.forwardRef}>
            <Menu
                className="app-side-menu"
                selectedIds={selectedIds}
                expandedIds={expandedIds}
                onChangeExpandedIds={(expIds: any)=> updateExpandedIds(expIds)}
            >
                {menu.map(renderMenu)}
            </Menu>
            <div className="app-side-menu-handle">
                <div className="app-side-menu-handle-icon"/>
            </div>
        </div>
    )
})

export const SideMenu = React.forwardRef(
    (props, ref: React.Ref<HTMLDivElement>) => <SideMenuWithRouter forwardRef={ref}/>
)
SideMenu.displayName = 'SideMenu'
