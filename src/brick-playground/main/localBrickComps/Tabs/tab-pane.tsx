/**
 * @file tab-pane
 * @author wujun07
 * @owner wujun07:2019-12-05
 */
import * as React from 'react'
// import * as PropTypes from 'prop-types'
import {default as c} from 'classnames'
import {TabPaneId, TabsContext} from './tabs-context'
import {isUndefined} from 'lodash-es'

export interface TabPaneProps {
    /**
     * 用户可自定义 class
     */
    className?: string

    /**
     * 唯一标识
     */
    id: TabPaneId

    /**
     * 标签页上的内容
     */
    label: React.ReactNode

    /**
     * 是否禁用
     */
    disabled?: boolean

    /**
     * 是否可删除
     */
    deletable?: boolean

    /**
     * tab标签页的状态, 暂时只有error
     */
    status?: 'error'
}

/**
 * Tab
 * @description brick component TabPane
 * @for-mobx
 */
export class TabPane extends React.Component<TabPaneProps> {
    static displayName = 'Tab'
    // static propTypes = {}
    static defaultProps = {
        className: '',
    }

    static contextType = TabsContext


    context!: React.ContextType<typeof TabsContext>

    get className() {
        const {className, deletable, status} = this.props
        return c(
            'brick-tab-pane',
            `brick-tab-pane-${this.isActive ? 'active' : 'inactive'}`,
            {
                'brick-tabs-tab-deletable': deletable,
                [`brick-tabs-tab-${status}`]: status
            },
            className
        )
    }

    get isActive() {
        const {activeId} = this.context
        const {id} = this.props
        if (isUndefined(id) || isUndefined(activeId) || activeId === null) {
            return false
        }

        return id === activeId
    }

    render() {
        return (
            <div className={this.className}>
                {this.props.children}
            </div>
        )
    }
}
