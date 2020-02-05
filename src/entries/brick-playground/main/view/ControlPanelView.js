import * as React from 'react'
import {default as c} from 'classnames'
import {toJS, computed, observable, action} from 'mobx'
import {inject, observer} from 'mobx-react'

import PropTypes from 'prop-types'
import {PropTypes as MobxPropTypes} from 'mobx-react'

import {withStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'

import ControlPanelState from '../states/ControlPanelState'

import '../style/control-panel.scss'
import Paper from "@material-ui/core/Paper";
import MoreVerIcon from "@material-ui/icons/MoreHoriz";
import FavoriteIcon from '@material-ui/icons/Favorite';
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

@observer
export default class ControlPanelView extends React.Component {

    static propTypes = {

        // 是否打开控制面板抽屉
        showControlPanelDrawer: PropTypes.bool.isRequired,

        // 开关控制面板抽屉
        triggerControlPanelDrawer: PropTypes.func.isRequired,
    }

    local = {
        controlPanelState: new ControlPanelState()
    }

    constructor(props) {
        super(props)
        const {local} = this
    }

    renderBanner = () => {
        return <div className="banner-wrap">
            <div className="banner">
                <h3 className="title">
                    <span className="title-single-word">Brick</span>
                    <span className="title-single-word">Playground</span>
                </h3>
                <p className="about">
                    <span>Made with </span>
                    <FavoriteIcon
                        className="sweet-sweet-heart"
                        fontSize="inherit"
                    />
                    <span> by youknowznm.</span>
                </p>
            </div>

        </div>
    }

    renderControlPanelContent = () => {
        const {
            showClearConfirmFlag,
            triggerConfirmFlag
        } = this.local.controlPanelState
        return <div className="control-panel-content">

            <TextField
                className="archive-name-input"
                size="small"
                label="存档名称"
                value={this.props.archiveName}
            />

            <Button
                className="btn-share"
                variant="outlined"
                size="small"
                color="primary"
            >
                复制到剪贴板
            </Button>

            <Button
                className="btn-clear"
                color="secondary"
                size="small"
                variant="outlined"
                onClick={() => {
                    triggerConfirmFlag(true)
                }}
            >
                清空画布
            </Button>
            <Dialog
                open={showClearConfirmFlag}
                onClose={() => {
                    triggerConfirmFlag(false)
                }}
            >
                <DialogTitle>删除所有元素？</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        删除的元素无法还原。
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => {
                            triggerConfirmFlag(false)
                            this.props.clearAll()
                        }}
                        color="primary">
                        确认
                    </Button>
                    <Button
                        onClick={() => {
                            triggerConfirmFlag(false)
                        }}
                        color="primary"
                        autoFocus
                    >
                        取消
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    }

    render() {
        const {local, props} = this
        return <div className="control-panel">
            <Drawer
                className="control-panel-drawer"
                anchor="top"
                variant="persistent"
                open={props.showControlPanelDrawer}
                // open={true}
            >
                {this.renderBanner()}
                {this.renderControlPanelContent()}
                <div
                    className="fake-trigger"
                >
                    <MoreVerIcon
                        className="trigger-icon"
                        fontSize="small"
                    />
                </div>
            </Drawer>
        </div>
    }
}
