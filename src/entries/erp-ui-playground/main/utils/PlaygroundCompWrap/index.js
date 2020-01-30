import * as React from 'react'
import {default as c} from 'classnames'
import {toJS, computed, observable, action} from 'mobx'
import {inject, observer} from 'mobx-react'

import {findDOMNode} from 'react-dom'
import Button from '@material-ui/core/Button'

import Draggable from 'react-draggable'

import getPlaygroundWrapDOMOffset from '../getOffset'

import './style.scss'

import {Button as BrickButton} from '@befe/brick'
import PropTypes from "prop-types";
// import {Button as BrickButton} from '../../../../../../../node_modules/@befe/brick'

@observer
export default class PlaygroundCompWrap extends React.Component {

    // static displayName = `${OriginComponent.displayName}PlaygroundWrap`

    contentDOM = null
    wrapDOM = null

    state = {
        wrapWidth: 0,
        wrapHeight: 0,
        isAbsolutePosition: false,
        prevX: 0,
        prevY: 0,
    }

    static propTypes = {
        // // playground 内容宽高
        // playgroundWidth: PropTypes.number.isRequired,
        // playgroundHeight: PropTypes.number.isRequired,
    }

    componentDidMount() {}

    createWrapDOMRef = wrapDOM => {
        this.wrapDOM = wrapDOM
    }

    createContentDOMRef = reactElem => {
        this.contentRef = reactElem
        const wrapDOM = findDOMNode(this.contentRef)
        if (wrapDOM) {
            const computedStyle = document.defaultView.getComputedStyle(wrapDOM)
            this.setState({
                wrapWidth: parseInt(computedStyle.width, 10),
                wrapHeight: parseInt(computedStyle.height, 10)
            })
        }
    }

    get draggableWrapProps() {
        const {
            props,
            state,
        } = this
        const {
            prevX,
            prevY,
        } = state
        const {
            originCompProps,
            id
        } = props
        return {
            defaultPosition: {
                x: prevX,
                y: prevY
            },
            bounds:'.playground-content',
            handle: ".action-layer",
            onStart: () => {},
            onDrag: (e, ui) => {
                const {x, y} = ui
                this.setState({
                    prevX: x,
                    prevY: y,
                })
            },
            onStop: (e, ui) => {
                const {x, y} = ui
                this.props.setComponentInEditId(prevX === x && prevY === y ? id : '')
                this.setState({
                    isAbsolutePosition: true,
                    prevX: x,
                    prevY: y,
                    // wrapDOMTop: ui.y,
                    // wrapDOMLeft: ui.x,
                })
            }
        }
    }

    wrapInControllers = children => {
        const {
            props,
            state
        } = this
        const {
            isAbsolutePosition,
            prevX,
            prevY,
            wrapWidth,
            wrapHeight,
        } = state
        const {
            originCompProps,
            id,
            playgroundWidth,
            playgroundHeight
        } = props
        console.log('?', playgroundHeight ,prevY , wrapHeight)
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
            <div className="aligner tl hor" style={{
                width: prevX,
                left: -prevX
            }}></div>
            <div className="aligner tl ver" style={{
                height: prevY,
                top: -prevY
            }}></div>
            <div className="aligner tr hor" style={{
                width: playgroundWidth - prevX - wrapWidth,
                right: -(playgroundWidth - prevX - wrapWidth)
            }}></div>
            <div className="aligner tr ver" style={{
                height: prevY,
                top: -prevY
            }}></div>
            <div className="aligner br hor" style={{
                width: playgroundWidth - prevX - wrapWidth,
                right: -(playgroundWidth - prevX - wrapWidth)
            }}></div>
            <div className="aligner br ver" style={{
                height: playgroundHeight - prevY - wrapHeight,
                bottom: -(playgroundHeight - prevY - wrapHeight)
            }}></div>
            <div className="aligner bl hor" style={{
                width: prevX,
                left: -prevX
            }}></div>
            <div className="aligner bl ver" style={{
                height: playgroundHeight - prevY - wrapHeight,
                bottom: -(playgroundHeight - prevY - wrapHeight)
            }}></div>
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
        const selected = props.componentInEditId === props.id
        const {
            isAbsolutePosition,
            prevX,

            prevY,
            wrapWidth,
            wrapHeight
        } = state
        const {
            originCompProps,
            id
        } = props
        return <Draggable {...this.draggableWrapProps}>
            <div
                className={c(
                    'playground-comp-wrap',
                    props.metaKeyPressing && 'meta-key-pressed',
                    selected && 'selected',
                    isAbsolutePosition && 'is-absolute-positon'
                )}
                style={{
                    width: state.wrapWidth,
                    height: state.wrapHeight
                }}
                ref={this.createWrapDOMRef}
            >
                {
                    this.wrapInControllers(
                        <BrickButton
                            ref={this.createContentDOMRef}
                            {...originCompProps}
                        />
                    )
                }
            </div>
        </Draggable>
    }
}
