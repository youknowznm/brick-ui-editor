/**
 * @file dialog-head
 * @author wujun07
 * @owner wujun07:2019-11-26
 */
import * as React from 'react'
// import * as PropTypes from 'prop-types'
import {default as c} from 'classnames'

export interface DialogHeadProps {
    /**
     * 用户可自定义 class
     */
    className?: string
}

/**
 * DialogHead
 * @description brick component DialogHead
 * @for-mobx
 */
export class DialogHead extends React.Component<DialogHeadProps> {
    static displayName = 'DialogHead'
    // static propTypes = {}
    static defaultProps = {
        className: '',
    }

    get className() {
        const {className} = this.props
        return c(
            'brick-dialog-head',
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
