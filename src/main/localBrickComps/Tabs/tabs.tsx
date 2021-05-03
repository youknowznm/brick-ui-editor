/**
 * @file tabs
 * @author wujun07
 * @owner wujun07:2019-12-05
 */
import * as React from 'react'
// import * as PropTypes from 'prop-types'
import {default as c} from 'classnames'
import {TabPaneId, TabsContext, TabsContextValue} from './tabs-context'
import {TabPane, TabPaneProps} from './tab-pane'
import {addEventListener, EventListenerHandler, pick, pickDerivedStateFromProps, safeInvoke} from '@befe/brick-utils'
import {isUndefined} from 'lodash-es'
import {ConfigContext, getDefaultValueUsingContextTheme} from '@befe/brick-core'
import {Icon} from '@befe/brick-comp-icon'
import {SvgMarkX, SvgPlainDown, SvgPlainUp, SvgMarkPlus, SvgSignExclamation} from '@befe/brick-icon'
import {MenuPopper, MenuPopperProps} from '../Menu'
import {RadioGroup, RadioGroupProps} from '@befe/brick-comp-radio'

type ButtonGroupProps = Pick<RadioGroupProps, 'value' | 'options'>

interface TabItem extends TabPaneProps {
    /**
     * tab 页内容
     */
    content?: React.ReactNode
}

export interface TabsProps {
    /**
     * 用户可自定义 class
     */
    className?: string

    /**
     * 尺寸
     * use config context `defaultSize` as default
     */
    size?: 'sm' | 'md'

    /**
     * 标签卡样式类型
     */
    type?: 'plain' | 'card' | 'button-group'

    /**
     * 标签页
     */
    panes?: TabItem[]

    /**
     * 激活 tab id 的 控制值
     */
    activeId?: TabPaneId

    /**
     * 激活 tab id 的 默认值
     */
    defaultActiveId?: TabPaneId | null

    /**
     * activeId 变化时的回调
     */
    onChange?: (activeId: TabPaneId) => void

    /**
     * 下拉列表触发方式
     */
    triggerType?: MenuPopperProps['type']

    /**
     * 是否干掉非当前激活的 pane dom
     */
    shouldDestroyInactivePane?: boolean

    /**
     * 动态添加便签按钮
     */
    addable?: boolean

    /**
     * add button 添加tab回调
     */
    onTabAdd?: () => void

    /**
     * delete 删除tab回调
     */
    onTabDelete?: (activeId: TabPaneId) => void
}

interface TabsState {
    activeId?: TabPaneId | null
    visibleFrom?: number
    visibleTo?: number
    shouldShowEllipsisPopper?: boolean
}

/**
 * Tabs
 * @description brick component Tabs
 * @for-mobx
 */
export class Tabs extends React.Component<TabsProps, TabsState> {
    static displayName = 'Tabs'
    // static propTypes = {}
    static defaultProps = {
        className: '',
        type: 'plain',
        defaultActiveId: null,
        shouldDestroyInactivePane: false,
        addable: false
    }

    static contextType = ConfigContext

    context!: React.ContextType<typeof ConfigContext>

    windowResizeHandler!: EventListenerHandler | null

    static getDerivedStateFromProps(nextProps: TabsProps) {
        return pickDerivedStateFromProps(nextProps, ['activeId'])
    }

    state: TabsState = {
        activeId: isUndefined(this.props.activeId) ? this.props.defaultActiveId : this.props.activeId,
        // visibleFrom: undefined,
        // visibleTo: undefined
        shouldShowEllipsisPopper: false
    }

    bTabsRef = React.createRef<HTMLUListElement>()
    tabsContainerRef = React.createRef<HTMLDivElement>()

    tabContainerWidthCache: number = 0
    tabsWidthCache: number[] = []

    get className() {
        const {className, type} = this.props
        const size = this.size
        return c(
            'brick-tabs',
            {
                [`brick-tabs-type-${type}`]: type,
                [`brick-tabs-size-${size}`]: size
            },
            className
        )
    }

    get size() {
        // @todo: default size 是否跟随主题 defaultSize 待 ui 确定
        return getDefaultValueUsingContextTheme(this, 'size', 'defaultSize')
    }

    get contextValue(): TabsContextValue {
        return {
            activeId: this.state.activeId,
        }
    }

    get validChildren() {
        const {children} = this.props
        if (!children) {
            return null
        }

        const validChildren = React.Children.toArray(children).filter(child => {
            return React.isValidElement(child) && child.type === TabPane
        }) as React.ReactComponentElement<typeof TabPane>[]

        return validChildren.length
            ? validChildren
            : null
    }

    // 全部的 tabs， 主要提供给
    // - tabs-container-shadow
    // - isTabPaneDisabled 判断用
    get tabsAll(): TabItem[] {
        const {panes} = this.props
        const validChildren = this.validChildren
        if (validChildren) {
            return validChildren.map(child => pick(child.props, [
                'id',
                'label',
                'disabled',
                'deletable',
                'status'
            ]))
        }

        return panes || []
    }

    // 可视的 tabs
    get tabs(): TabItem[] {
        const tabs = this.tabsAll

        const from = this.state.visibleFrom || 0
        const to = this.state.visibleTo || tabs.length

        return tabs.slice(from, to)
    }

    // 收到下拉里的  tabs
    get tabsEllipsis(): TabItem[] {

        const tabs = this.tabsAll

        const from = this.state.visibleFrom || 0
        const to = this.state.visibleTo || tabs.length

        const prevTabs = tabs.slice(0, from)
        const afterTabs = tabs.slice(to, tabs.length)

        return [...prevTabs, ...afterTabs]
    }

    // 整体宽度
    setTabContainerWidthCache = () => {
        if (this.tabsContainerRef.current) {
            const tabsContainer = this.tabsContainerRef.current.querySelector('ul')
            if (tabsContainer) {
                this.tabContainerWidthCache = tabsContainer.clientWidth
            }
        }
    }

    // 每个tab宽度集合
    setTabsWidthCache = () => {
        // 当tabs的长度变更时, 重新计算tabsWidthCache
        // todo to-review 当单个tab长度变更时(如添加错误状态icon), 是否重新计算 以及 计算时机选择?
        if (this.tabsContainerRef.current && this.tabsWidthCache.length !== this.tabsAll.length) {
            const tabs = this.tabsContainerRef.current.querySelectorAll('li')

            this.tabsWidthCache = Array.from(tabs).map((tab: HTMLLIElement) => {
                return tab.clientWidth
            })
        }
        return this.tabsWidthCache
    }

    handleClickTab = (id: TabPaneId, e?: React.MouseEvent) => {
        if (this.state.activeId === id || this.isTabPaneDisabled(id)) {

            console.log(id)
            return
        } else if (isUndefined(this.props.activeId)) {
            this.setState({
                activeId: id
            })
        }

        safeInvoke(this.props.onChange, id)
    }

    handleGroupButtonClick = (value: ButtonGroupProps['value']) => {
        if (value && value[0]) {
            this.handleClickTab(value[0] as TabPaneId)
        }
    }

    isTabPaneDisabled(id: TabPaneId) {
        return !!this.tabsAll.filter(tab => tab.disabled).some(tab => tab.id === id)
    }

    getTabFromAndTo = () => {
        // 重新计算container的width
        const oldTabContainerWidth = this.tabContainerWidthCache
        this.setTabContainerWidthCache()

        const {visibleFrom, visibleTo} = this.state
        const id = this.state.activeId
        const activeIndex = id
            ? this.tabsAll.findIndex(tab => tab.id === id)
            : 0

        // 在可视区域内, 不调整可视区
        if (
            oldTabContainerWidth === this.tabContainerWidthCache
            && !isUndefined(visibleFrom)
            && !isUndefined(visibleTo)
            && activeIndex >= visibleFrom
            && activeIndex < visibleTo
        ) {
            return {
                from: visibleFrom,
                to: visibleTo
            }
        }

        const tabCount = this.tabsAll.length
        let totalWidth = this.tabsWidthCache[activeIndex]
        let from = activeIndex
        let to = activeIndex

        while (from >= 0 || to <= tabCount) {
            from--
            if (from >= 0) {
                const tempWidth = totalWidth + this.tabsWidthCache[from]
                if (tempWidth > this.tabContainerWidthCache) {
                    from += 1
                    break
                }
                totalWidth = tempWidth
            }

            to++
            if (to < tabCount) {
                const tempWidth = totalWidth + this.tabsWidthCache[to]
                if (tempWidth > this.tabContainerWidthCache) {
                    to -= 1
                    break
                }
                totalWidth = tempWidth
            }
        }

        return {
            from: from < 0 ? 0 : from,
            to: to >= tabCount ? tabCount : to + 1
        }
    }

    // 滚动到可视区域
    transformToVisible = (from = 0) => {
        if (this.bTabsRef.current) {
            const transformX = this.tabsWidthCache
                .slice(0, from)
                .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
            this.bTabsRef.current.style.transform = `translate(-${transformX}px, 0px)`
        }
    }

    updateEllipsis() {
        const {visibleFrom, visibleTo} = this.state

        // 通过 tabs-container-shadow 计算 visibleFrom, visibleTo
        this.setTabsWidthCache()
        const {from, to} = this.getTabFromAndTo()

        // 因为 updateEllipsis 在 didUpdate 中被调用，所以一定要，判断不一致时才更新
        if (visibleFrom !== from || visibleTo !== to) {

            this.setState({
                visibleFrom: from,
                visibleTo: to
            })
            this.transformToVisible(from)
        }
    }

    handleAddButtonClick = () => {
        safeInvoke(this.props.onTabAdd)
    }

    handleTabDelete = (id: TabPaneId, e: React.MouseEvent) => {
        safeInvoke(this.props.onTabDelete, id)
        e.stopPropagation()
        e.nativeEvent.stopImmediatePropagation()
    }

    handleMenuPopperChange = (status: boolean) => {
        this.setState({
            shouldShowEllipsisPopper: status
        })
    }

    renderTab = (tab: TabItem, idx: number, className: string) => {
        const {visibleFrom = 0, visibleTo = this.tabsAll.length} = this.state

        const tabClass = c(
            'brick-tabs-tab',
            {
                'brick-tabs-tab-invisible': idx < visibleFrom || idx >= visibleTo,
                'brick-tabs-tab-active': this.state.activeId === tab.id,
                'brick-tabs-tab-disabled': tab.disabled,
                'brick-tabs-tab-deletable': tab.deletable,
                [`brick-tabs-tab-${tab.status}`]: tab.status
            }
        )

        const tabProps = {
            className: tabClass,
            onClick: (e: React.MouseEvent) => {
                this.handleClickTab(tab.id, e)
            }
        }

        const deleteIconProps = {
            className: 'brick-tabs-tab-cross',
            onClick: (e: React.MouseEvent) => {
                this.handleTabDelete(tab.id, e)
            }
        }

        const deleteIcon = () => {
            if (this.props.type === 'card' && tab.deletable) {
                return (
                    <div {...deleteIconProps}>
                        <Icon svg={SvgMarkX}/>
                    </div>
                )
            }
        }

        const statusIcon = () => {
            if (className === 'brick-tabs-list' && this.props.type === 'card' && tab.status === 'error') {
                const statusClass = c({
                    [`brick-tabs-tab-${tab.status}-icon`]: tab.status
                })

                return (
                    <Icon className={statusClass} svg={SvgSignExclamation}/>
                )
            }
        }

        return (
            <li key={tab.id} tabIndex={0} {...tabProps}>
                {statusIcon()}
                {tab.label}
                {deleteIcon()}
            </li>
        )
    }

    renderTabs(tabs: TabItem[], className: string, tabRef?: React.RefObject<HTMLUListElement>) {
        const tabsClass = c(
            className,
            {[`${className}-drop-down`]: this.tabsEllipsis.length}
        )
        return (
            <div className={tabsClass}>
                <ul ref={tabRef}>
                    {tabs.map((tab: TabItem, idx: number) => {
                        return this.renderTab(tab, idx, className)
                    })}
                </ul>
            </div>
        )
    }

    renderTabsEllipsisList() {
        return this.renderTabs(this.tabsEllipsis, 'brick-tabs-ellipsis-list')
    }

    renderTabsEllipsis() {
        const targetContent = (
            <div
                className={'brick-tabs-ellipsis'}
            >
                <Icon svg={this.state.shouldShowEllipsisPopper ? SvgPlainUp : SvgPlainDown}/>
            </div>
        )

        return (
            <MenuPopper
                size={this.props.size}
                targetContent={targetContent}
                placement={'bottom-start'}
                type={this.props.triggerType}
                onChange={this.handleMenuPopperChange}
            >
                {this.renderTabsEllipsisList()}
            </MenuPopper>
        )
    }

    renderAddButton() {
        if (this.props.addable) {
            return (
                <div className={'brick-tabs-add-button'} onClick={this.handleAddButtonClick}>
                    <Icon className={'brick-tabs-add-button-icon'} svg={SvgMarkPlus}/>
                </div>
            )
        }
    }

    renderButtonGroupTabs() {
        const value = [this.state.activeId] as ButtonGroupProps['value']
        const options = this.tabsAll.map(child => {
            const {id, label, disabled} = child
            return {
                value: id,
                label,
                disabled
            }
        })

        return (
            <RadioGroup
                type={'intensive'}
                size={this.size}
                value={value}
                options={options}
                onChange={this.handleGroupButtonClick}
            />
        )
    }

    renderTabsContainer() {
        if (this.props.type === 'button-group') {
            return this.renderButtonGroupTabs()
        }
        return (
            <div className={'brick-tabs-container'} ref={this.tabsContainerRef}>
                {this.renderTabs(this.tabsAll, 'brick-tabs-list', this.bTabsRef)}
                {this.tabsEllipsis.length ? this.renderTabsEllipsis() : null}
                {this.renderAddButton()}
            </div>
        )
    }

    renderTabPanes() {
        const {panes, shouldDestroyInactivePane} = this.props
        const validChildren = this.validChildren
        if (validChildren) {
            if (shouldDestroyInactivePane) {
                return validChildren.filter(tab => {
                    return this.state.activeId === tab.props.id
                })
            }
            return validChildren
        }

        if (!panes || !panes.length) {
            return null
        }

        let panesResult = panes
        if (shouldDestroyInactivePane) {
            panesResult = panes.filter(tab => {
                return this.state.activeId === tab.id
            })
        }

        return panesResult.map((tab) => {
            const {content, ...tabProps} = tab
            return <TabPane key={tab.id} {...tabProps}>{content}</TabPane>
        })
    }

    renderTabPanesContainer() {
        const panes = this.renderTabPanes()

        return panes ? (
            <div className={'brick-tabs-panes-container'}>{panes}</div>
        ) : null
    }

    componentDidMount(): void {
        this.setTabContainerWidthCache()
        this.setTabsWidthCache()
        this.updateEllipsis()
        this.windowResizeHandler = addEventListener(window, 'resize', () => {
            this.updateEllipsis()
        })
    }

    componentWillUnmount(): void {
        if (this.windowResizeHandler) {
            this.windowResizeHandler.remove()
        }
    }

    componentDidUpdate(prevProps: Readonly<TabsProps>, prevState: Readonly<TabsState>, snapshot?: any): void {
        this.updateEllipsis()
    }

    render() {
        return (
            <TabsContext.Provider value={this.contextValue}>
                <div className={this.className}>
                    {this.renderTabsContainer()}
                    {this.renderTabPanesContainer()}
                </div>
            </TabsContext.Provider>
        )
    }
}
