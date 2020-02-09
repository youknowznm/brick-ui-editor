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
import Paper from '@material-ui/core/Paper'
import Snackbar from '@material-ui/core/Snackbar'

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
        this.local.mainState.loadUsedCompData()
    }

    registerMetaKeyListener = () => {
        const {local} = this
        window.addEventListener('keydown', event => {
            if (event.key === 'Meta') {
                local.mainState.setProps({
                    metaKeyPressing: true
                })
            }
            if (event.key === 'Escape') {
                local.mainState.setProps({
                    activeComponentId: ''
                })
            }
        })
        window.addEventListener('keyup', event => {
            if (event.key === 'Meta') {
                local.mainState.setProps({
                    metaKeyPressing: false
                })
            }
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
        return <div
            className="top-actions-drawer-trigger"
            onMouseOver={() => {
                this.local.mainState.triggerControlPanelDrawer(true)
                this.local.mainState.triggerDemoDrawer(false)
                this.local.mainState.setProps({
                    activeComponentId: ''
                })
            }}
        >
            <MoreHorizIcon
                className="trigger-icon"
                fontSize="small"
            />
        </div>
    }

    renderDemoDrawerTrigger = () => {
        return <div
            className="demo-drawer-trigger"
            onMouseOver={() => {
                this.local.mainState.triggerDemoDrawer(true)
                this.local.mainState.triggerControlPanelDrawer(false)
                this.local.mainState.setProps({
                    activeComponentId: ''
                })
            }}
        >
            <MoreVertIcon
                className="trigger-icon"
                fontSize="small"
            />
        </div>
    }

    renderToast = () => {
        return <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={this.local.mainState.toastFlag}
            message={this.local.mainState.msgToToast}
        />
    }

    render() {
        const {props, local} = this
        const {mainState} = local
        return <Provider root={mainState}>
            <div className={c(
                'index-page',
                mainState.metaKeyPressing && 'meta-key-pressed'
            )}>
                <DemoListView
                    // showDemoDrawer={true}
                    showDemoDrawer={mainState.showDemoDrawer}
                />
                {this.renderDemoDrawerTrigger()}
                <PlaygroundView
                    playgroundWidth={mainState.playgroundWidth}
                    playgroundHeight={mainState.playgroundHeight}
                    usedCompsDataArray={mainState.usedCompsDataArray}
                    showDemoDrawer={mainState.showDemoDrawer}
                    showControlPanelDrawer={mainState.showControlPanelDrawer}
                    triggerDemoDrawer={mainState.triggerDemoDrawer}
                    triggerControlPanelDrawer={mainState.triggerControlPanelDrawer}
                    activeComponentId={mainState.activeComponentId}
                    setActiveComponentId={id => {
                        mainState.setProps({
                            activeComponentId: id
                        })
                    }}
                    setCompResizeHandler={func => {
                        mainState.setProps({
                            compResizeHandler: func
                        })
                    }}
                    compDragHandler={mainState.compDragHandler}
                />
                <ControlPanelView
                    showControlPanelDrawer={mainState.showControlPanelDrawer}
                    usedCompsDataArray={mainState.usedCompsDataArray}
                    triggerControlPanelDrawer={mainState.triggerControlPanelDrawer}
                    clearAll={mainState.clearAll}
                    archiveName={mainState.archiveName}
                    setArchiveName={name => {
                        mainState.setProps({
                            archiveName: name
                        })
                    }}
                    author={mainState.author}
                    setAuthor={name => {
                        mainState.setProps({
                            author: name
                        })
                    }}
                    lastModified={mainState.lastModified}
                />
                <AttrEditorView
                    activeComponentData={mainState.activeComponentData}
                    targetPropsChangeHandler={mainState.targetPropsChangeHandler}
                    removeUsedComp={mainState.removeUsedComp}
                />
                {this.renderControlPanelDrawerTrigger()}
                {this.renderToast()}
            </div>
        </Provider>
    }
}
