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
        setContentState: null
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
            originDisplayName,
            originCompProps
        } = this.props
        originCompProps = toJS(originCompProps)
        if (originDisplayName === 'Button') {
            if (typeof originCompProps.icon === 'string') {
                originCompProps.icon = transferSvgStringToElement(originCompProps.icon)
            }
            if (typeof originCompProps.loadingIcon === 'string') {
                originCompProps.loadingIcon = transferSvgStringToElement(originCompProps.loadingIcon)
            }
        }

        return originCompProps
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {state, props} = this
        const {
            setContentState,
        } = state
        const justDidSelect = prevProps.componentInEditId !== prevProps.id && this.isSelected
        const justDidDeselect = prevProps.componentInEditId === prevProps.id && !this.isSelected
        if (justDidSelect) {
        }
        if (justDidDeselect) {
        }
    }

    processWrapDOMRef = wrapDOM => {
        this.wrapDOM = wrapDOM
    }

    processContentDOMRef = reactElem => {
        this.contentRef = reactElem
        const wrapDOM = findDOMNode(this.contentRef)
        if (wrapDOM) {
            const computedStyle = document.defaultView.getComputedStyle(wrapDOM)
            this.setState({
                wrapWidth: parseInt(computedStyle.width, 10),
                wrapHeight: parseInt(computedStyle.height, 10),
                setContentState: partialState => {
                    // console.log('set partial state:', partialState)
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
                    this.isSelected && 'selected',
                    isAbsolutePosition && 'is-absolute-positon'
                )}
                style={{
                    width: state.wrapWidth,
                    height: state.wrapHeight
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
