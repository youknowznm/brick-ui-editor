/**
 * @file erp-logo
 * @author wujun07
 * @owner wujun07:2019-12-14
 */
import * as React from 'react'
// import * as PropTypes from 'prop-types'
import {default as c} from 'classnames'

export interface ErpLogoProps {
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
     */
    subheadUrl?: string

    /**
     * 是否使用原色
     */
    originColor?: boolean
}

/**
 * ErpLogo
 * @description brick component ErpLogo
 * @for-mobx
 */
export class ErpLogo extends React.Component<ErpLogoProps> {
    static displayName = 'ErpLogo'
    // static propTypes = {}
    static defaultProps = {
        className: '',
        originColor: false,
    }

    get className() {
        const {className, originColor} = this.props
        return c(
            'brick-erp-logo',
            {
                ['brick-erp-logo-origin-color']: originColor,
            },
            className
        )
    }

    render() {
        const {url, subhead, subheadUrl} = this.props
        return (
            <div className={this.className}>
                <a className={'brick-erp-logo-main'} href={url} />
                {subhead
                    ? <a className={'brick-erp-logo-subhead'} href={subheadUrl || url}>{subhead}</a>
                    : null
                }
            </div>
        )
    }
}
