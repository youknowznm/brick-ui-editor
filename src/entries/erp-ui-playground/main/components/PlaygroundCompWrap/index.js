import * as React from 'react'
import {default as c} from 'classnames'
import {toJS, computed, observable, action} from 'mobx'
import {inject, observer} from 'mobx-react'

import {findDOMNode} from 'react-dom'
import Button from '@material-ui/core/Button'

import Draggable from 'react-draggable'

import './style.scss'

import {Button as BrickButton} from '@befe/brick' 
// import {Button as BrickButton} from '../../../../../../../node_modules/@befe/brick' 

@observer
export default class PlaygroundCompWrap extends React.Component {

    // static displayName = `${OriginComponent.displayName}PlaygroundWrap`

    ref = null

    state = {
        // ownState: null,
        // ownProps: null,
        width: '0px',
        height: '0px',
        // display: '0px'
    }

    static propTypes = {
        // metaKeyPressing:
        // originCompDisplayName:
        // originCompProps:
        // id:
    }

    createRef = reactElem => {
        this.ref = reactElem
        const wrapDOM = findDOMNode(this.ref)
        if (wrapDOM) {
            const computedStyle = document.defaultView.getComputedStyle(wrapDOM)
            this.setState({
                width: computedStyle.width,
                height: computedStyle.height
            })
        }
    }

    componentDidMount() {
    }

    render() {
        const {props, state} = this
        const selected = props.componentInEditId === props.id
        const {originCompProps} = props.originDemoProps;
        return <div
            className={c(
                'playground-comp-wrap',
                props.metaKeyPressing && 'meta-key-pressed',
                selected && 'selected'
            )}
            style={{
                width: state.width,
                height: state.height
            }}
        >
            <Draggable>
                <div>
                    <BrickButton
                        ref={this.createRef}
                        {...originCompProps}
                    />
                    <div
                        className="action-layer"
                        onClick={() => {
                            props.setEditingComponentId(props.id)
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
            </Draggable>
        </div>
    }
}