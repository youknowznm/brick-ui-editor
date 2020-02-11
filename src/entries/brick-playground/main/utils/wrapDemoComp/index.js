import * as React from 'react'
import {default as c} from 'classnames'
import {inject, observer} from 'mobx-react'
import {toJS, observable, action} from 'mobx'
import {findDOMNode} from 'react-dom'

import {COMP_TYPES} from "../../config"

import './style.scss'

const wrapDemoComp = OriginComponent => {

    @inject('pushUsedCompData')
    @observer
    class ExtendedUIComponent extends React.Component {

        static displayName = `${OriginComponent.displayName}PlaygroundWrap`

        ref = null

        state = {
            ownProps: null,
            wrapWidth: 0,
            wrapHeight: 0,
        }

        static propTypes = {}

        generateId = () => Math.random().toString(36).slice(2, 9)

        createRef = reactElem => {
            this.ref = reactElem
            setTimeout(() => {
                let wrapDOM = findDOMNode(this.ref)
                if (wrapDOM) {
                    const $wrapDOM = $(wrapDOM)
                    const ownProps = Object.assign({}, reactElem.props)
                    for (let propKey in ownProps) {
                        if (ownProps.hasOwnProperty(propKey)) {
                            const propValue = ownProps[propKey]
                            if (typeof propValue === 'function') {
                                delete ownProps[propKey]
                            }
                        }
                    }

                    delete ownProps.pushUsedCompData
                    delete ownProps.className

                    // 移除 Table 的特殊列
                    if (ownProps.columns && ownProps.columns.length > 0) {
                        ownProps.columns = ownProps.columns.filter(item => {
                            return item.key !== '_checkbox' && item.key !== '_operations'
                        })
                    }

                    let wrapWidth = $wrapDOM.outerWidth()
                    let wrapHeight = $wrapDOM.outerHeight()

                    this.setState({
                        ownProps,
                        wrapWidth,
                        wrapHeight
                    })
                }
            })
        }

        dispatchCompToUse = () => {
            this.props.pushUsedCompData({
                id: this.generateId(),
                originName: OriginComponent.displayName,
                originProps: this.state.ownProps,
                wrapWidth: this.state.wrapWidth,
                wrapHeight: this.state.wrapHeight,
            })
        }

        render() {
            const {state, props} = this
            const {
                wrapWidth,
                wrapHeight
            } = state
            return <div
                className="demo-comp-wrap"
                style={{
                    width: wrapWidth,
                    height: wrapHeight
                }}>
                    <OriginComponent
                        {...this.props}
                        ref={this.createRef}
                    >
                        {props.children}
                    </OriginComponent>
                    <div
                        className="action-layer"
                        onClick={() => {
                            this.dispatchCompToUse()
                        }}
                    >
                    </div>
            </div>
        }
    }

    return ExtendedUIComponent
}

export default wrapDemoComp
