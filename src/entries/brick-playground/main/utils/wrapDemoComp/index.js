import * as React from 'react'
import {default as c} from 'classnames'
import {inject, observer} from 'mobx-react'
import {toJS, observable, action} from 'mobx'
import {findDOMNode} from 'react-dom'

import {COMP_TYPES} from "../../config"

import './style.scss'

const wrapDemoComp = OriginComponent => {

    @inject('root')
    @observer
    class ExtendedUIComponent extends React.Component {

        static displayName = `${OriginComponent.displayName}PlaygroundWrap`

        ref = null

        state = {
            ownProps: null,
            wrapWidth: 0,
            wrapHeight: 0,
        }

        static propTypes = {
        }

        generateId = () => Math.random().toString(36).slice(2, 9)

        createRef = reactElem => {
            this.ref = reactElem
            setTimeout(() => {
                let wrapDOM = findDOMNode(this.ref)
                window.sb = wrapDOM
                if (wrapDOM) {
                    const $wrapDOM = $(wrapDOM)
                    window.sb = $wrapDOM
                    const computedStyle = document.defaultView.getComputedStyle(wrapDOM)
                    const ownProps = Object.assign({}, reactElem.props)
                    for (let propKey in ownProps) {
                        if (ownProps.hasOwnProperty(propKey)) {
                            const propValue = ownProps[propKey]
                            if (typeof propValue === 'function') {
                                const isReactElement = React.isValidElement(propValue())
                                if (isReactElement) {
                                    ownProps[propKey] = propValue.name
                                } else {
                                    delete ownProps[propKey]
                                }
                            }
                        }
                    }
                    delete ownProps.root
                    delete ownProps.className

                    // let wrapWidth = parseInt(computedStyle.width, 10)
                    // let wrapHeight = parseInt(computedStyle.height, 10)
                    let wrapWidth = $wrapDOM.outerWidth()
                    let wrapHeight = $wrapDOM.outerHeight()
                    // const {
                    //     defaultWrapWidth,
                    //     defaultWrapHeight,
                    // } = COMP_TYPES[OriginComponent.displayName]
                    // if (defaultWrapWidth) {
                    //     wrapWidth = defaultWrapWidth
                    // }
                    // if (defaultWrapHeight) {
                    //     wrapHeight = defaultWrapHeight
                    // }
                    this.setState({
                        ownProps,
                        wrapWidth,
                        wrapHeight
                    })
                }
            })
        }

        dispatchCompToUse = () => {
            this.props.root.pushUsedCompData({
                id: this.generateId(),
                originName: OriginComponent.displayName,
                originProps: this.state.ownProps,
                wrapWidth: this.state.wrapWidth,
                wrapHeight: this.state.wrapHeight,
                deltaX: 0,
                deltaY: 0,
            })
        }

        render() {
            const {state, props} = this
            const {
                wrapWidth,
                wrapHeight
            } = state
            return <div
                className={c(
                    'demo-comp-wrap',
                    props.root.metaKeyPressing && 'meta-key-pressed',
                    // isAbsPos && 'is-abs-pos'
                )}
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