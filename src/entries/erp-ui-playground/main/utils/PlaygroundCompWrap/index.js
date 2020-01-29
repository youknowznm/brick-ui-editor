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
// import {Button as BrickButton} from '../../../../../../../node_modules/@befe/brick'

@observer
export default class PlaygroundCompWrap extends React.Component {

    // static displayName = `${OriginComponent.displayName}PlaygroundWrap`

    contentDOM = null
    wrapDOM = null

    prevX = 0
    prevY = 0

    state = {
        width: 0,
        height: 0,
        isAbsolutePosition: false,
    }

    static propTypes = {
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
                width: computedStyle.width,
                height: computedStyle.height
            })
        }
    }

    render() {
        const {
            props,
            state,
            createWrapDOMRef,
            prevX,
            prevY
        } = this
        const selected = props.componentInEditId === props.id
        const {
            isAbsolutePosition
        } = state
        const {
            originCompProps,
            id
        } = props
        return <Draggable
            defaultPosition={{
                x: 0,
                y: 0
            }}
            bounds=".playground-content"
            handle=".action-layer"
            onStart={() => {}}
            onStop={(e, ui) => {
                const {x, y} = ui
                props.setComponentInEditId((prevX === x && prevY === y) ? id : '')
                this.setState({
                    isAbsolutePosition: true,
                    // wrapDOMTop: ui.y,
                    // wrapDOMLeft: ui.x,
                })
                this.prevX = x
                this.prevY = y
            }}
        >
            <div
                className={c(
                    'playground-comp-wrap',
                    props.metaKeyPressing && 'meta-key-pressed',
                    selected && 'selected',
                    isAbsolutePosition && 'is-absolute-positon'
                )}
                style={{
                    width: state.width,
                    height: state.height
                }}
                ref={createWrapDOMRef}
            >
                <div>
                    <BrickButton
                        ref={this.createContentDOMRef}
                        {...originCompProps}
                    />
                    <div
                        className="action-layer"
                        onClick={() => {
                            props.triggerDemoDrawer(false)
                            props.triggerControlPanelDrawer(false)
                        }}
                    >
                    </div>
                    <div
                        className="selected-layer"
                        onClick={() => {}}
                    >
                        <span className="spot tl"></span>
                        <span className="spot tr"></span>
                        <span className="spot br"></span>
                        <span className="spot bl"></span>
                    </div>
                </div>
            </div>
        </Draggable>
    }
}
