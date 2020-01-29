/**
 * @file toaster
 * @author wujun07
 * @owner wujun07:2019-11-29
 */
import * as React from 'react'
import * as ReactDOM from 'react-dom'
// import * as PropTypes from 'prop-types'
import {default as c} from 'classnames'
import {Toast, ToastProps} from './toast'
import {safeInvoke} from '@befe/brick-utils'

export interface ToastItem extends ToastProps {
    id: string
}

export interface ToasterProps {
    /**
     * 用户可自定义 class
     */
    className?: string
}


interface ToasterState {
    toastList: ToastItem[]
}

/**
 * Toaster
 * @description brick component Toaster
 * @for-mobx
 */
export class Toaster extends React.Component<React.PropsWithRef<ToasterProps>, ToasterState> {
    static displayName = 'Toaster'
    // static propTypes = {}
    static defaultProps = {
        className: '',
    }

    state = {
        toastList: []
    }

    get className() {
        const {className} = this.props
        return c(
            'brick-toaster',
            className
        )
    }

    renderToast = (toast: ToastItem) => {
        const {id, onClose, ...toastProps} = toast
        return (
            <Toast
                key={id}
                onClose={() => {
                    this.remove(id)
                    safeInvoke(onClose)
                }}
                {...toastProps}
            />
        )

    }

    add(toast: ToastItem) {
        this.setState(prevState => {
            const {toastList} = prevState
            if (!toastList.some(t => t.id === toast.id)) {
                return {
                    toastList: toastList.concat(toast)
                }
            }
        })
    }

    remove(id: string) {
        this.setState(prevState => {
            return {
                toastList: prevState.toastList.filter(t => t.id !== id)
            }
        })
    }

    render() {
        const {toastList} = this.state
        return (
            <div className={this.className}>
                {toastList.map(this.renderToast)}
            </div>
        )
    }
}

export interface ToasterObject {
    toast: (toast: ToastItem) => void
    remove: (key: string) => void
    destroy: () => void
}

export function createToaster(props?: ToasterProps): ToasterObject {
    const container = document.createElement('div')
    container.className = 'brick-toaster-container'
    document.body.appendChild(container)
    const toaster = React.createRef<Toaster>()
    ReactDOM.render(<Toaster ref={toaster} {...props} />, container)

    return {
        toast(toast: ToastItem) {
            toaster.current && toaster.current.add(toast)
        },
        remove(key: string) {
            if (toaster.current) {
                toaster.current.remove(key)
            }
        },
        destroy() {
            ReactDOM.unmountComponentAtNode(container)
            document.body.removeChild(container)
        }
    }
}