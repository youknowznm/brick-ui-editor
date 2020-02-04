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
        return <Paper
            square={true}
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
        </Paper>
    }

    renderDemoDrawerTrigger = () => {
        return <Paper
            square={true}
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
        </Paper>
    }

    renderToast = () => {
        return <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            open={this.local.mainState.toastFlag}
            // autoHideDuration={5000}
            // onClose={handleClose}
            message={this.local.mainState.msgToToast}
            // action={
            //     <React.Fragment>
            //         <Button color="secondary" size="small" onClick={() => {}}>
            //             UNDO
            //         </Button>
            //         <IconButton size="small" aria-label="close" color="inherit" onClick={() => {}}>
            //             <CloseIcon fontSize="small" />
            //         </IconButton>
            //     </React.Fragment>
            // }
        />
    }

    render() {
        const {props, local} = this
        const {mainState} = local
        return <Provider root={mainState}>
            <div className="index-page">
                <DemoListView
                    demoListWidth={mainState.demoListWidth}
                    showDemoDrawer={true}
                    // showDemoDrawer={mainState.showDemoDrawer}
                    metaKeyPressing={mainState.metaKeyPressing}
                />
                {this.renderDemoDrawerTrigger()}
                <PlaygroundView
                    playgroundWidth={mainState.playgroundWidth}
                    playgroundHeight={mainState.playgroundHeight}
                    demoListWidth={mainState.demoListWidth}
                    usedCompsDataArray={mainState.usedCompsDataArray}
                    metaKeyPressing={mainState.metaKeyPressing}
                    showDemoDrawer={mainState.showDemoDrawer}
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
                <AttrEditorView
                    activeComponentData={mainState.activeComponentData}
                    targetPropsChangeHandler={mainState.targetPropsChangeHandler}
                    removeUsedComp={mainState.removeUsedComp}
                />
                <ControlPanelView
                    showControlPanelDrawer={mainState.showControlPanelDrawer}
                    triggerControlPanelDrawer={mainState.triggerControlPanelDrawer}
                />
                {this.renderControlPanelDrawerTrigger()}
                {this.renderToast()}
            </div>
        </Provider>
    }
}
