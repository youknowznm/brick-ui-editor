/**
 * @file dialog-body
 * @author wujun07
 * @owner wujun07:2019-11-26
 */
import * as React from 'react'
// import * as PropTypes from 'prop-types'
import {default as c} from 'classnames'

export interface DialogBodyProps {
    /**
     * 用户可自定义 class
     */
    className?: string
}

interface DialogBodyState {
    overflowX: boolean
    overflowY: boolean
}

/**
 * DialogBody
 * @description brick component DialogBody
 * @for-mobx
 */
export class DialogBody extends React.Component<DialogBodyProps, DialogBodyState> {
    static displayName = 'DialogBody'
    // static propTypes = {}
    static defaultProps = {
        className: '',
    }

    state: DialogBodyState = {
        overflowX: false,
        overflowY: false,
    }

    body = React.createRef<HTMLDivElement>()
    bodyInner = React.createRef<HTMLDivElement>()

    get className() {
        const {className} = this.props
        return c(
            'brick-dialog-body',
            {
                ['brick-dialog-body-overflow-x']: this.state.overflowX,
                ['brick-dialog-body-overflow-y']: this.state.overflowY,
            },
            className
        )
    }

    updateBodyOverflow() {
        const elemBody = this.body.current
        const elemBodyInner = this.bodyInner.current

        if (!elemBody || !elemBodyInner) {
            return
        }

        const bodyRect = elemBody.getBoundingClientRect()
        const bodyInnerRect = elemBodyInner.getBoundingClientRect()

        const overflowY = bodyInnerRect.height > bodyRect.height
        const overflowX = bodyInnerRect.width > bodyRect.width

        if (overflowX !== this.state.overflowX || overflowY !== this.state.overflowY) {
            this.setState({
                overflowX,
                overflowY
            })
        }
    }

    componentDidMount(): void {
        this.updateBodyOverflow()
    }

    componentDidUpdate(prevProps: Readonly<DialogBodyProps>, prevState: Readonly<{}>, snapshot?: any): void {
        this.updateBodyOverflow()
    }

    render() {
        // @zhangenming 总最小高度 290, body 之外高度 130
        const bodyHeight = this.props.height > 290 ? this.props.height - 130 : 160
        return (
            <div
                className={this.className}
                ref={this.body}
                style={{
                    height: `${bodyHeight}px`
                }}
            >
                <div className={'brick-dialog-body-inner'} ref={this.bodyInner}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}
