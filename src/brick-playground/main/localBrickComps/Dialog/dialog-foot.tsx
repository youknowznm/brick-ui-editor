/**
 * @file dialog-foot
 * @author wujun07
 * @owner wujun07:2019-11-26
 */
import * as React from 'react'
// import * as PropTypes from 'prop-types'
import {default as c} from 'classnames'

export interface DialogFootProps {
    /**
     * 用户可自定义 class
     */
    className?: string
}

/**
 * DialogFoot
 * @description brick component DialogFoot
 * @for-mobx
 */
export class DialogFoot extends React.Component<DialogFootProps> {
    static displayName = 'DialogFoot'
    // static propTypes = {}
    static defaultProps = {
        className: '',
    }

    get className() {
        const {className} = this.props
        return c(
            'brick-dialog-foot',
            className
        )
    }

    render() {
        return (
            <div className={this.className}>
                {this.props.children}
            </div>
        )
    }
}
