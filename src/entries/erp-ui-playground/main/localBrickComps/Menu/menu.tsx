/**
 * @file menu
 * @author wujun07
 * @owner wujun07:2019-10-11
 */
import * as React from 'react'
// import * as PropTypes from 'prop-types'
import {default as c} from 'classnames'
import {isUndefined} from 'lodash-es'

import {MenuItemId, MenuLayout, MenuSize, MultipleItemType} from './common'
import {MenuContextValue, MenuContext} from './menu-context'

import {pickDerivedStateFromProps, safeInvoke, toggleSelectedList} from '@befe/brick-utils'
import {getDefaultValueUsingContextTheme} from '@befe/brick-comp-config-provider'

export interface MenuProps {
    /**
     * 用户可自定义 class
     */
    className?: string

    /**
     * 布局方式
     */
    layout?: MenuLayout

    /**
     * 尺寸
     */
    size?: MenuSize

    /**
     * 选中的 item id 列表
     */
    selectedIds?: MenuItemId[]

    /**
     * 展开的 submenu id 列表
     */
    expandedIds?: MenuItemId[]

    /**
     * 是否为多选
     */
    multiple?: boolean

    /**
     * 点选 item 的回调
     */
    onSelect?: (id: MenuItemId, selectedIds: MenuItemId[], currentSelectedIds: MenuItemId[]) => void

    /**
     * 反选 item 的回调
     */
    onDeselect?: (id: MenuItemId, selectedIds: MenuItemId[], currentSelectedIds: MenuItemId[]) => void

    /**
     * selectIds 变化时的回调
     * select / deselect 均会调用
     */
    onChangeSelectedIds?: (selectedIds: MenuItemId[]) => void

    /**
     * 子菜单展开时的回调
     */
    onExpand?: (id: MenuItemId, expandedIds: MenuItemId[], currentExpandedIds: MenuItemId[]) => void

    /**
     * 子菜单折叠时的回调
     */
    onCollapse?: (id: MenuItemId, expandedIds: MenuItemId[], currentExpandedIds: MenuItemId[]) => void

    /**
     * expandedIds 变化时的回调
     * expand / collapse 均会调用
     */
    onChangeExpandedIds?: (expandedIds: MenuItemId[]) => void

    /**
     * 多选选项类型（暂定）
     */
    multipleItemType?: MultipleItemType

    /**
     * 使用反色，适用于深色背景色上（暂定）
     */
    reverseColor?: boolean
}

interface MenuState {
    selectedIds: MenuItemId[]
    expandedIds: MenuItemId[]
}

/**
 * Menu
 * @description brick component Menu
 * @for-mobx
 */
export class Menu extends React.Component<MenuProps, MenuState> {
    static displayName = 'Menu'
    // static propTypes = {}
    static defaultProps = {
        className: '',
        layout: 'vertical',
        // size: 'md',
        multiple: false,
        multipleItemType: 'normal',
        reverseColor: false
    }
    static contextType = MenuContext

    static getDerivedStateFromProps(nextProps: MenuProps) {
        return pickDerivedStateFromProps(nextProps, [
            'selectedIds',
            'expandedIds',
        ])
    }

    context!: React.ContextType<typeof MenuContext>

    state: MenuState = {
        selectedIds: [],
        expandedIds: [],
    }

    get className() {
        const {className, layout, multiple, reverseColor} = this.props
        const size = this.size
        const {parentLayout, multipleItemType} = this.contextValue
        return c(
            'brick-menu',
            {
                [`brick-menu-layout-${layout}`]: layout,
                [`brick-menu-parent-layout-${parentLayout}`]: parentLayout,
                [`brick-menu-size-${size}`]: size,
                ['brick-menu-multiple']: multiple,
                [`brick-menu-multiple-item-type-${multipleItemType}`]: multipleItemType,
                ['brick-menu-reverse-color']: reverseColor,
            },
            className
        )
    }

    get size() {
        return getDefaultValueUsingContextTheme(this, 'size', 'defaultSize')
    }

    get contextValue(): MenuContextValue {
        const {selectedIds, expandedIds} = this.state
        const {layout, multiple, multipleItemType} = this.props
        return {
            onClickItem: this.handlerItemClick,
            onClickSubmenu: this.handlerClickSubMenu,
            expandedIds,
            selectedIds,
            size: this.size,
            multiple,
            multipleItemType,
            // 上面几个由顶层持有
            ...this.context,
            // layout 就近取
            layout,
            // @todo: 还有没别的办法？
            parentLayout: this.context.layout
        }
    }

    handlerItemClick = (id: MenuItemId, e: React.MouseEvent) => {
        // console.log('click item', id)
        if (this.props.multiple || !this.state.selectedIds.includes(id)) {
            this.toggleSelected(id)
        }
    }

    handlerClickSubMenu = (id: MenuItemId, e: React.MouseEvent) => {
        // console.log('click sub', id)
        this.toggleExpanded(id)
    }

    toggleSelected(id: MenuItemId) {
        const selectedIds = toggleSelectedList<MenuItemId>(
            id,
            this.state.selectedIds,
            {
                multiple: this.props.multiple,
                onSelect: this.props.onSelect,
                onDeselect: this.props.onDeselect,
            }
        )
        safeInvoke(this.props.onChangeSelectedIds, selectedIds)

        if (isUndefined(this.props.selectedIds)) {
            this.setSelectIds(selectedIds)
        }
    }

    toggleExpanded(id: MenuItemId) {
        const expandedIds = toggleSelectedList<MenuItemId>(
            id,
            this.state.expandedIds,
            {
                onSelect: this.props.onExpand,
                onDeselect: this.props.onCollapse,
            }
        )
        safeInvoke(this.props.onChangeExpandedIds, expandedIds)
        if (isUndefined(this.props.expandedIds)) {
            this.setExpandedIds(expandedIds)
        }
    }

    setSelectIds(selectedIds: MenuItemId[]) {
        this.setState({selectedIds})
    }

    setExpandedIds(expandedIds: MenuItemId[]) {
        this.setState({expandedIds})
    }

    render() {
        return (
            <MenuContext.Provider value={this.contextValue}>
                <ul className={this.className}>
                    {this.props.children}
                </ul>
            </MenuContext.Provider>
        )
    }
}
