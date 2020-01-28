/**
 * @author zhangenming
 */

import * as React from 'react'
import {default as c} from 'classnames'
import {toJS, computed, observable, action} from 'mobx'
import {Provider, observer} from 'mobx-react'

import DemoListView from './view/DemoListView'
import ControlPanelView from './view/ControlPanelView'
import PlaygroundView from './view/PlaygroundView'
import AttrEditorView from './view/AttrEditorView'

import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Card from '@material-ui/core/Card'

import Draggable from 'react-draggable'

import PlaygroundCompWrap from './components/PlaygroundCompWrap'

import './style.scss'

import MainState from './State'

@observer
export default class extends React.Component {

    local = {
        mainState: new MainState(),
    }

    componentDidMount() {
        const {local, props} = this
        this.registerMetaKeyListener()
        this.registerBodyMouseEnterListener()
        this.registerResizeListener()
    }

    // pushUsedCompData(data);

    // // id: "gcxcsy5"
    // // originDisplayName: "Button"
    // // originCompProps: {type: "important", children: "important", className: "", color: "normal", disabled: false, …}
    // // originCompState: {asyncLoading: false, showLoading: false}

    registerMetaKeyListener = () => {
        const {local} = this
        const triggerMetaKeyPressed = (evt, target) => {
            if (evt.key === 'Meta') {
                local.mainState.setProps({
                    metaKeyPressing: target
                })
            }
        }
        window.addEventListener('keydown', event => {
            triggerMetaKeyPressed(event, true)
        })
        window.addEventListener('keyup', event => {
            triggerMetaKeyPressed(event, false)
        })
    }

    // 从其它应用切换至浏览器时, 移除焦点, 聚焦自身
    registerBodyMouseEnterListener = () => {
        const {local} = this
        window.document.body.addEventListener('mouseenter', event => {
            window.focus()
            local.mainState.setProps({
                metaKeyPressing: false
            })
        })
    }

    registerResizeListener = () => {
        const {local} = this
        const getPlaygroundSize = () => {
            const playgroundDOM = document.querySelector('.playground-content')
            if (playgroundDOM) {
                const {
                    width,
                    height
                } = document.defaultView.getComputedStyle(playgroundDOM)
                local.mainState.setProps({
                    playgroundWidth: parseInt(width, 10),
                    playgroundHeight: parseInt(height, 10),
                })
            }
        }
        window.addEventListener('resize', event => {
            getPlaygroundSize()
        })
        getPlaygroundSize()
    }

    renderControlPanelDrawerTrigger = () => {
        return <Card
            square={true}
            className="top-actions-drawer-trigger"
            onMouseOver={() => {
                this.local.mainState.triggerControlPanelDrawer(true)
                this.local.mainState.triggerDemoDrawer(false)
                this.local.mainState.setProps({
                    componentInEditId: ''
                })
            }}
        >
            <MoreHorizIcon
                className="trigger-icon"
                fontSize="small"
            ></MoreHorizIcon>
        </Card>
    }

    renderDemoDrawerTrigger = () => {
        return <Card
            square={true}
            className="demo-drawer-trigger"
            onMouseOver={() => {
                this.local.mainState.triggerDemoDrawer(true)
                this.local.mainState.triggerControlPanelDrawer(false)
                this.local.mainState.setProps({
                    componentInEditId: ''
                })
            }}
        >
            <MoreVertIcon
                className="trigger-icon"
                fontSize="small"
            ></MoreVertIcon>
        </Card>
    }

    render() {
        const {props, local} = this
        const {mainState} = local
        return <Provider root={mainState}>
            <div className="index-page">
                <DemoListView
                    demoListWidth={mainState.demoListWidth}
                    showDemoListDrawer={true}
                    metaKeyPressing={mainState.metaKeyPressing}
                    triggerDemoDrawer={mainState.triggerDemoDrawer}
                />
                {this.renderDemoDrawerTrigger()}
                <PlaygroundView
                    demoListWidth={mainState.demoListWidth}
                    playgroundWidth={mainState.playgroundWidth}
                    playgroundHeight={mainState.playgroundHeight}
                    metaKeyPressing={mainState.metaKeyPressing}
                    usedCompsDataArray={mainState.usedCompsDataArray}
                    showDemoListDrawer={mainState.showDemoListDrawer}
                    triggerDemoDrawer={mainState.triggerDemoDrawer}
                    triggerControlPanelDrawer={mainState.triggerControlPanelDrawer}
                    setEditingComponentId={local.setEditingComponentId}
                ></PlaygroundView>
                <AttrEditorView
                    componentInEdit={mainState.componentInEdit}
                />
                <ControlPanelView
                    showControlPanelDrawer={mainState.showControlPanelDrawer}
                    triggerControlPanelDrawer={mainState.triggerControlPanelDrawer}
                />
                {this.renderControlPanelDrawerTrigger()}
            </div>
        </Provider>
    }
}

// showDemoListDrawer={mainState.showDemoListDrawer}
