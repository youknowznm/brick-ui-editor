import * as React from 'react'
import {default as c} from 'classnames'
import {toJS, computed, observable, action} from 'mobx'
import {inject, observer} from 'mobx-react'

import {findDOMNode} from 'react-dom'
import Button from '@material-ui/core/Button'

import Draggable from 'react-draggable'

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
        localOriginComps: null,
        setContentState: null,
        setContentProps: null,
    }

    static propTypes = {
        // // playground 内容宽高
        // playgroundWidth: PropTypes.number.isRequired,
        // playgroundHeight: PropTypes.number.isRequired,
    }

    get isSelected() {
        return this.props.componentInEditId === this.props.id
    }

    componentDidMount() {
        this.setState({
            localOriginComps: toJS(this.props.originCompProps)
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {state, props} = this
        const {
            setContentState,
            localOriginComps
        } = state
        const justDidSelect = prevProps.componentInEditId !== prevProps.id && this.isSelected
        const justDidDeselect = prevProps.componentInEditId === prevProps.id && !this.isSelected
        if (justDidSelect) {
            const sb = params => {
                console.log('sb', setContentState)
                setContentState(params)
            }
            props.setTargetStateChangeHandler(sb)
            return
        }
        if (justDidDeselect) {
            // props.setTargetStateChangeHandler(null)
            return
        }
    }

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
                wrapHeight: parseInt(computedStyle.height, 10),
                setContentState: partialState => {
                    console.log('set partial state:', partialState)
                    reactElem.setState(partialState)
                }
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
            handle: ".has-drag-cursor",
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

    wrapCompInControllers = children => {
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
            <i className="aligner tl hor" style={{
                width: prevX,
                left: -prevX
            }} />
            <i className="aligner tl ver" style={{
                height: prevY,
                top: -prevY
            }} />
            <i className="aligner tr hor" style={{
                width: playgroundWidth - prevX - wrapWidth,
                right: -(playgroundWidth - prevX - wrapWidth)
            }} />
            <i className="aligner tr ver" style={{
                height: prevY,
                top: -prevY
            }} />
            <i className="aligner br hor" style={{
                width: playgroundWidth - prevX - wrapWidth,
                right: -(playgroundWidth - prevX - wrapWidth)
            }} />
            <i className="aligner br ver" style={{
                height: playgroundHeight - prevY - wrapHeight,
                bottom: -(playgroundHeight - prevY - wrapHeight)
            }} />
            <i className="aligner bl hor" style={{
                width: prevX,
                left: -prevX
            }} />
            <i className="aligner bl ver" style={{
                height: playgroundHeight - prevY - wrapHeight,
                bottom: -(playgroundHeight - prevY - wrapHeight)
            }} />
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
            isSelected
        } = this
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
                    isSelected && 'selected',
                    isAbsolutePosition && 'is-absolute-positon'
                )}
                style={{
                    width: state.wrapWidth,
                    height: state.wrapHeight
                }}
                ref={this.createWrapDOMRef}
            >
                {
                    this.wrapCompInControllers(
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
