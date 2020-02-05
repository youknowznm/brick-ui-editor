import * as React from 'react'
import {default as c} from 'classnames'
import {toJS, computed, observable, action} from 'mobx'
import {inject, observer} from 'mobx-react'
import {findDOMNode} from 'react-dom'

import PropTypes from 'prop-types'
import {PropTypes as MobxPropTypes} from 'mobx-react'

import Draggable from 'react-draggable'

import './style.scss'

import getSvgByName from "../getSvgByName";

import {debounce} from 'lodash-es';

import {COMP_TYPES} from '../../config'

@observer
export default class PlaygroundCompWrap extends React.Component {

    // static displayName = `${OriginComponent.displayName}PlaygroundWrap`

    contentDOM = null
    wrapDOM = null

    state = {
        isAbsolutePosition: false,
        prevDeltaX: 0,
        prevDeltaY: 0,
    }

    static propTypes = {
        // // playground 内容宽高
        // playgroundWidth: PropTypes.number.isRequired,
        // playgroundHeight: PropTypes.number.isRequired,
        // deltaX,
        // deltaY,
    }

    componentDidMount() {
        this.setState({
            prevDeltaX: this.props.deltaX,
            prevDeltaY: this.props.deltaY,
        })
    }

    get isSelected() {
        return this.props.activeComponentId === this.props.id
    }

    get compTypeData() {
        return COMP_TYPES[this.props.originName]
    }

    get processedOriginCompProps() {
        let {
            originProps
        } = this.props
        originProps = toJS(originProps)
        for (let propType of this.compTypeData.editableProps) {
            const {
                key,
                type,
            } = propType
            if (type === 'svg') {
                originProps[key] = getSvgByName(originProps[key])
            }
        }
        return originProps
    }

    processWrapDOMRef = wrapDOM => {
        this.wrapDOM = wrapDOM
    }

    processContentDOMRef = reactElem => {
        this.contentRef = reactElem
        this.props.setCompResizeHandler(this.compResizeHandler)
    }

    compResizeHandler = () => {
        let wrapWidth = 0
        let wrapHeight = 0
        const wrapDOM = findDOMNode(this.contentRef)
        if (wrapDOM) {
            const computedStyle = document.defaultView.getComputedStyle(wrapDOM)
            wrapWidth = parseInt(computedStyle.width, 10)
            wrapHeight = parseInt(computedStyle.height, 10)
        }
        return {
            wrapWidth,
            wrapHeight
        }
    }

    get draggableWrapProps() {
        const {
            props,
            state,
        } = this
        const {
            prevDeltaX,
            prevDeltaY,
        } = state
        const {
            id
        } = props
        return {
            position: {
                x: prevDeltaX,
                y: prevDeltaY
            },
            bounds:'.playground-content',
            handle: '.has-drag-cursor',
            onStart: () => {
                this.props.setActiveComponentId(id)
            },
            onDrag: debounce((e, ui) => {
                const {x, y} = ui
                this.setState({
                    prevDeltaX: x,
                    prevDeltaY: y,
                })
                this.props.compDragHandler({
                    deltaX: x,
                    deltaY: y,
                })
            }),
            onStop: (e, ui) => {
                const {x, y} = ui
                this.setState({
                    isAbsolutePosition: true,
                    prevDeltaX: x,
                    prevDeltaY: y,
                })
                this.props.compDragHandler({
                    deltaX: x,
                    deltaY: y,
                })
            }
        }
    }

    wrapCompInControllers = children => {
        const {
            props,
            state
        } = this
        const {
            isAbsolutePosition,
            prevDeltaX,
            prevDeltaY,
        } = state
        const {
            id,
            playgroundWidth,
            playgroundHeight,
            wrapWidth,
            wrapHeight,
        } = props
        return <div className="controllers">
            {children}
            <div
                className="action-layer has-drag-cursor"
                onClick={() => {
                    props.triggerDemoDrawer(false)
                    props.triggerControlPanelDrawer(false)
                }}
            >
            </div>
            {/* TODO: 标尺*/}
            {/*<span className="ruler left" style={{*/}
            {/*    left: -deltaX / 2,*/}
            {/*    bottom: '100%',*/}
            {/*    zIndex: 3,*/}
            {/*    transform: 'translate(-50%, 50%)'*/}
            {/*}}>*/}
            {/*    {deltaX}px*/}
            {/*</span>*/}
            <i className="aligner tl hor" style={{
                width: prevDeltaX,
                left: -prevDeltaX
            }} />
            {/*<span className="ruler top" style={{*/}
            {/*    top: -deltaY / 2,*/}
            {/*    right: '100%',*/}
            {/*    zIndex: 3,*/}
            {/*    transform: 'translate(50%, -50%)'*/}
            {/*}}>*/}
            {/*    {deltaY}px*/}
            {/*</span>*/}
            <i className="aligner tl ver" style={{
                height: prevDeltaY,
                top: -prevDeltaY
            }} />
            <i className="aligner tr hor" style={{
                width: playgroundWidth - prevDeltaX - wrapWidth,
                right: -(playgroundWidth - prevDeltaX - wrapWidth)
            }} />
            <i className="aligner tr ver" style={{
                height: prevDeltaY,
                top: -prevDeltaY
            }} />
            <i className="aligner br hor" style={{
                width: playgroundWidth - prevDeltaX - wrapWidth,
                right: -(playgroundWidth - prevDeltaX - wrapWidth)
            }} />
            <i className="aligner br ver" style={{
                height: playgroundHeight - prevDeltaY - wrapHeight,
                bottom: -(playgroundHeight - prevDeltaY - wrapHeight)
            }} />
            <i className="aligner bl hor" style={{
                width: prevDeltaX,
                left: -prevDeltaX
            }} />
            <i className="aligner bl ver" style={{
                height: playgroundHeight - prevDeltaY - wrapHeight,
                bottom: -(playgroundHeight - prevDeltaY - wrapHeight)
            }} />
            {/*<span className="ruler width" style={{*/}
            {/*    bottom: '-100%',*/}
            {/*    left: '50%',*/}
            {/*    zIndex: 3,*/}
            {/*    transform: 'translate(50%, -50%)'*/}
            {/*}}>*/}
            {/*    {wrapWidth}px*/}
            {/*</span>*/}
            <div className="selected-layer has-drag-cursor">
                <span className="spot tl" />
                <span className="spot tr" />
                <span className="spot br" />
                <span className="spot bl" />
            </div>
        </div>
    }

    render() {
        const {
            props,
            state,
        } = this
        const {
            isAbsolutePosition,
            prevDeltaX,
            prevDeltaY,
        } = state
        const {
            originProps,
            id,
            wrapWidth,
            wrapHeight
        } = props
        return <Draggable {...this.draggableWrapProps}>
            <div
                className={c(
                    'playground-comp-wrap',
                    props.metaKeyPressing && 'meta-key-pressed',
                    this.isSelected && 'selected',
                    // TODO: wrap 尺寸不对, 到底是不是定位的原因
                    isAbsolutePosition && 'is-absolute-positon'
                    // 'is-absolute-positon'
                )}
                style={{
                    width: wrapWidth,
                    height: wrapHeight
                }}
                ref={this.processWrapDOMRef}
            >
                {
                    this.wrapCompInControllers(
                        <this.compTypeData.Element
                            ref={this.processContentDOMRef}
                            {...this.processedOriginCompProps}
                        />
                    )
                }
            </div>
        </Draggable>
    }
}
