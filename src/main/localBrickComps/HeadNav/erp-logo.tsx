/**
 * @file erp-logo
 * @author wujun07
 * @owner wujun07:2019-12-14
 */
import * as React from 'react'
// import * as PropTypes from 'prop-types'
import {default as c} from 'classnames'
import {NavLogo, HeadNavLogoProps} from './nav-logo'
import {omit} from '@befe/brick-utils'

export interface ErpLogoProps extends HeadNavLogoProps {
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
            className,
        )
    }

    render() {
        const props = omit(this.props, ['className'])
        return <NavLogo className={this.className} {...props} />
    }
}
