/**
 * @file menu-item-select-all
 * @author wujun07
 * @owner wujun07:2020-01-03
 */
import * as React from 'react'
// import * as PropTypes from 'prop-types'
import {default as c} from 'classnames'
import {MenuItem, MenuItemProps} from './menu-item'
import {omit, safeInvoke} from '@befe/brick-utils'
import {ConfigContext, createComponentLocale} from '@befe/brick-core'

export interface MenuItemSelectAllProps extends Omit<MenuItemProps, 'id'> {
    /**
     * 用户可自定义 class
     */
    className?: string
}

const componentLocale = createComponentLocale('menu-item-select-all', {
    'en_us': {
        all: 'All',
    },
    'zh_cn': {
        all: '全部',
    }
})

/**
 * MenuItemSelectAll
 * @description brick component MenuItemSelectAll
 * @for-mobx
 */
export class MenuItemSelectAll extends React.Component<MenuItemSelectAllProps> {
    static displayName = 'MenuItemSelectAll'
    // static propTypes = {}
    static defaultProps = {
        className: '',
    }

    static contextType = ConfigContext

    context!: React.ContextType<typeof ConfigContext>

    get className() {
        const {className} = this.props
        return c(
            'brick-menu-item-select-all',
            {},
            className
        )
    }

    getLocaleText(key: string, ...args: []): string {
        return safeInvoke(this.context.getLocaleText, componentLocale, key, ...args) || ''
    }

    render() {
        // @todo: 国际化
        return (
            <MenuItem className={this.className} {...omit(this.props, ['className'])}>
                {this.getLocaleText('all')}
            </MenuItem>
        )
    }
}
