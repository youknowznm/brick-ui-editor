/**
 * @file erp-logo
 * @author wujun07
 * @owner wujun07:2019-12-14
 */
import * as React from 'react'
// import * as PropTypes from 'prop-types'
import {default as c} from 'classnames'
import {isUndefined} from 'lodash-es'

export interface HeadNavLogoProps {
    /**
     * 用户可自定义 class
     */
    className?: string

    /**
     * logo 跳转链接
     */
    url?: string

    /**
     * 副标题
     */
    subhead?: React.ReactNode

    /**
     * 副标题跳转链接
     *
     * - `undefined` （默认）使用 logo 链接即 `props.url`
     * - `null` 无跳转
     * - `string` 链接字符串
     *
     * @type string | null
     */
    subheadUrl?: string | null

    /**
     * 是否使用原色
     */
    originColor?: boolean
}

/**
 * HeadNavLogo
 * @description brick component HeadNavLogo
 * @for-mobx
 */
export class NavLogo extends React.Component<HeadNavLogoProps> {
    static displayName = 'NavLogo'
    // static propTypes = {}
    static defaultProps = {
        className: '',
        originColor: false,
    }

    get className() {
        const {className, originColor} = this.props
        return c(
            'brick-nav-logo',
            {
                'brick-nav-logo-origin-color': originColor,
            },
            className,
        )
    }

    render() {
        const {url, subhead, subheadUrl} = this.props
        const subheadHref = isUndefined(subheadUrl) ? url : subheadUrl
        return (
            <div className={this.className}>
                <a className={'brick-nav-logo-main'} href={url}/>
                {subhead
                    ? <a className={'brick-nav-logo-subhead'} href={subheadHref || undefined}>{subhead}</a>
                    : null
                }
            </div>
        )
    }
}
