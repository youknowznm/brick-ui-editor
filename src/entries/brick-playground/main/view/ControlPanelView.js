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
import {Link, Typography} from "@material-ui/core";

@observer
export default class ControlPanelView extends React.Component {

    static propTypes = {

        // 是否打开控制面板抽屉
        showControlPanelDrawer: PropTypes.bool.isRequired,

        // 开关控制面板抽屉
        triggerControlPanelDrawer: PropTypes.func.isRequired,

        archiveName: PropTypes.string,
        author: PropTypes.string,
        lastModified: PropTypes.string,
    }

    local = {
        controlPanelState: new ControlPanelState()
    }

    constructor(props) {
        super(props)
        const {local} = this
    }

    get isEmpty() {
        return this.props.usedCompsDataArray.length === 0
    }

    renderBanner = () => {
        return <div className="banner-wrap">
            <div className="banner">
                <h3 className="title">
                    <span className="title-single-word">Brick</span>
                    <span className="title-single-word">Playground</span>
                </h3>
                <a
                    href="http://icode.baidu.com/repos/baidu/erp/erp-ui-previewer"
                    target="_blank"
                >
                    <Button
                        className="link repo"
                        variant="outlined"
                        size="small"
                    >
                        iCode 仓库
                    </Button>
                </a>
                <a
                    href="http://doc.eux.baidu.com/app/list/dc2565e3f8b9c733aa"
                    target="_blank"
                >
                    <Button
                        className="link guide"
                        variant="outlined"
                        size="small"
                    >
                        使用指引
                    </Button>
                </a>
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
                variant="filled"
                label="存档名称"
                value={this.props.archiveName}
            />
            <TextField
                className="author-input"
                size="small"
                variant="filled"
                label="作者"
                value={this.props.author}
            />
            <Button
                className="btn-share"
                variant="contained"
                size="small"
                disabled={this.isEmpty}
                color="primary"
            >
                分享
            </Button>
            <Typography
                className="last-modified"
                variant="section"
            >
                更新于 {this.props.lastModified}
            </Typography>
            <Button
                className="btn-clear"
                color="secondary"
                size="small"
                variant="outlined"
                disabled={this.isEmpty}
                onClick={() => {
                    // TODO: 待移除
                    // triggerConfirmFlag(true)
                    this.props.clearAll()
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
                <DialogTitle>移除所有组件？</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        移除的组件无法还原。
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
            <Button
                className="btn-load"
                variant="outlined"
                size="small"
                color="secondary"
            >
                加载存档
            </Button>
        </div>
    }

    render() {
        const {local, props} = this
        return <div className="control-panel">
            <Drawer
                className="control-panel-drawer"
                anchor="top"
                variant="persistent"
                // open={props.showControlPanelDrawer}
                open={true}
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
