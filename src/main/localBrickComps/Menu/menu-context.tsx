import * as React from 'react'
import {MenuItemId, MenuLayout, MenuSize, MultipleItemType} from './common'

export interface MenuContextValue {
    onClickItem?: (id: MenuItemId, e: React.MouseEvent) => void
    onClickSubmenu?: (id: MenuItemId, e: React.MouseEvent) => void
    selectedIds?: MenuItemId[]
    expandedIds?: MenuItemId[]
    layout?: MenuLayout
    parentLayout?: MenuLayout
    size?: MenuSize
    multiple?: boolean
    multipleItemType?: MultipleItemType
}

export const MenuContext = React.createContext<MenuContextValue>({})

export const MenuContextProvider = MenuContext.Provider
export const MenuContextConsumer = MenuContext.Consumer
