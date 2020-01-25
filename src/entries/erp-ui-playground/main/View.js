/**
 * @author zhangenming
 */

import * as React from 'react'
import {default as c} from 'classnames'
import {toJS, computed, observable, action} from 'mobx'
import {observer} from 'mobx-react'

import DemoPageView from './view/DemoPageView'
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

import MainState from './index'

@observer
export default class extends React.Component {

    local = {
        mainState: new MainState(),
    }
    
    componentDidMount() {
        const {local, props} = this
        this.registerMessageListener()
        this.registerMetaKeyListener()
        this.registerBodyMouseEnterListener()
        this.registerResizeListener()
    }

    // appendDemoComponent

    registerMessageListener = () => {
        const {local} = this
        const {
            pushUsedCompData,
            metaKeyPressing
        } = local.mainState
        window.addEventListener('message', event => {
            const {
                data,
                type
            } = event.data
            
            if (type && type.indexOf('EUP') === 0) {
                switch (type) {
                    case 'EUP_APPEND_COMP':
                        console.log('msg data: ', data)
                        pushUsedCompData(data);
                        // id: "gcxcsy5"
                        // originDisplayName: "Button"
                        // originCompProps: {type: "important", children: "important", className: "", color: "normal", disabled: false, …}
                        // originCompState: {asyncLoading: false, showLoading: false}
                        break
                    case 'EUP_META_KEY_ACTION':
                        console.log('metaKeyPressing: ', data.metaKeyPressing)
                        local.mainState.setProps({
                            metaKeyPressing: data.metaKeyPressing
                        })
                        break
                }
            }
            
        })
    }

    registerMetaKeyListener = () => {
        const {local} = this
        const triggerMetaKeyPressed = (evt, target) => {
            if (evt.key === 'Meta') {
                local.mainState.setProps({
                    metaKeyPressing: target
                })
            }
        }
        
        if (!window._eupKeyListenerRegistered) {
            window.addEventListener('keydown', event => {
                triggerMetaKeyPressed(event, true)
            })
            window.addEventListener('keyup', event => {
                triggerMetaKeyPressed(event, false)
            })
            window._eupKeyListenerRegistered = true
        }
    }

    // 从其它应用切换至浏览器时, 移除焦点, 聚焦自身
    registerBodyMouseEnterListener = () => {
        const {local} = this
        window.document.body.addEventListener('mouseenter', event => {
            window.focus()
        })
        // TODO:
        // window.document.body.addEventListener('mouseout', event => {
        //     local.setProps({
        //         metaKeyPressing: false
        //     })
        // })
    }


    registerResizeListener = () => {
        const {local} = this
        const getPlaygroundSize = () => {
            const playgroundDOM = document.querySelector('.playground-wrap .playground')
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
        return <div className="index-page">
            <DemoPageView
                showDemoPageDrawer={mainState.showDemoPageDrawer}
                demoPageSrc={mainState.demoPageSrc}
                demoPageWidth={mainState.demoPageWidth}
                triggerDemoDrawer={mainState.triggerDemoDrawer}
            />
            {this.renderDemoDrawerTrigger()}
            <PlaygroundView
                playgroundWidth={mainState.playgroundWidth}
                playgroundHeight={mainState.playgroundHeight}
                metaKeyPressing={mainState.metaKeyPressing}
                componentsUsedDataArray={mainState.componentsUsedDataArray}
                demoPageWidth={mainState.demoPageWidth}
                showDemoPageDrawer={mainState.showDemoPageDrawer}
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
    }
}
