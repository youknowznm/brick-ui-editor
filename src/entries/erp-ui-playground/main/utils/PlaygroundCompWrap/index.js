import * as React from 'react'
import {default as c} from 'classnames'
import {toJS, computed, observable, action} from 'mobx'
import {inject, observer} from 'mobx-react'
import {findDOMNode} from 'react-dom'

import PropTypes from 'prop-types'
import {PropTypes as MobxPropTypes} from 'mobx-react'

import Button from '@material-ui/core/Button'

import Draggable from 'react-draggable'

import './style.scss'

import {Button as BrickButton} from '@befe/brick'
import transferSvgStringToElement from "../transferSvgStringToElement";

import {COMP_TYPES} from '../../config'

@observer
export default class PlaygroundCompWrap extends React.Component {

    // static displayName = `${OriginComponent.displayName}PlaygroundWrap`

    contentDOM = null
    wrapDOM = null

    state = {
        isAbsolutePosition: false,
        deltaX: 0,
        deltaY: 0,
    }

    static propTypes = {
        // // playground 内容宽高
        // playgroundWidth: PropTypes.number.isRequired,
        // playgroundHeight: PropTypes.number.isRequired,
    }

    get isSelected() {
        return this.props.componentInEditId === this.props.id
    }

    get processedOriginCompProps() {
        let {
            originName,
            originProps
        } = this.props
        const compTypeData = COMP_TYPES[originName]
        originProps = toJS(originProps)
        for (let propType of compTypeData.editableProps) {
            const {
                key,
                type,
            } = propType
            if (type === 'svg') {
                originProps[key] = transferSvgStringToElement(originProps[key])
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
            deltaX,
            deltaY,
        } = state
        const {
            id
        } = props
        return {
            defaultPosition: {
                x: deltaX,
                y: deltaY
            },
            bounds:'.playground-content',
            handle: '.has-drag-cursor',
            onStart: () => {},
            onDrag: (e, ui) => {
                const {x, y} = ui
                this.setState({
                    deltaX: x,
                    deltaY: y,
                })
            },
            onStop: (e, ui) => {
                const {x, y} = ui
                this.props.setComponentInEditId(deltaX === x && deltaY === y ? id : '')
                this.setState({
                    isAbsolutePosition: true,
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
            deltaX,
            deltaY,
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
                width: deltaX,
                left: -deltaX
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
                height: deltaY,
                top: -deltaY
            }} />
            <i className="aligner tr hor" style={{
                width: playgroundWidth - deltaX - wrapWidth,
                right: -(playgroundWidth - deltaX - wrapWidth)
            }} />
            <i className="aligner tr ver" style={{
                height: deltaY,
                top: -deltaY
            }} />
            <i className="aligner br hor" style={{
                width: playgroundWidth - deltaX - wrapWidth,
                right: -(playgroundWidth - deltaX - wrapWidth)
            }} />
            <i className="aligner br ver" style={{
                height: playgroundHeight - deltaY - wrapHeight,
                bottom: -(playgroundHeight - deltaY - wrapHeight)
            }} />
            <i className="aligner bl hor" style={{
                width: deltaX,
                left: -deltaX
            }} />
            <i className="aligner bl ver" style={{
                height: playgroundHeight - deltaY - wrapHeight,
                bottom: -(playgroundHeight - deltaY - wrapHeight)
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
            deltaX,
            deltaY,
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
                    isAbsolutePosition && 'is-absolute-positon'
                )}
                style={{
                    width: wrapWidth,
                    height: wrapHeight
                }}
                ref={this.processWrapDOMRef}
            >
                {
                    this.wrapCompInControllers(
                        <BrickButton
                            ref={this.processContentDOMRef}
                            {...this.processedOriginCompProps}
                        />
                    )
                }
            </div>
        </Draggable>
    }
}
