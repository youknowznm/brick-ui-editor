import * as React from 'react'
import {inject, observer} from 'mobx-react'
import {findDOMNode} from 'react-dom'

import './style.scss'

const wrapDemoComp = OriginComponent => {

    @inject('pushUsedCompData')
    @observer
    class ExtendedUIComponent extends React.Component {

        static displayName = `${OriginComponent.displayName}EditorWrap`

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
                    // const $wrapDOM = $(wrapDOM)
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

                    // let _wrapWidth = $wrapDOM.outerWidth()
                    // let _wrapHeight = $wrapDOM.outerHeight()

                    const computedStyle = document.defaultView.getComputedStyle(wrapDOM)

                    let wrapWidth = parseInt(computedStyle.width, 10)
                    let wrapHeight = parseInt(computedStyle.height, 10)

                    // console.log(1, w)
                    // console.log(2, h)
                    // console.log(3, wrapWidth)
                    // console.log(4, wrapHeight)

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
