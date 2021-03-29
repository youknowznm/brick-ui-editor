import * as React from 'react'
import {observer} from 'mobx-react'
import PropTypes from 'prop-types'

import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import MoreVerIcon from '@material-ui/icons/MoreHoriz'
import FavoriteIcon from '@material-ui/icons/Favorite'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import InputAdornment from '@material-ui/core/InputAdornment'
// import Tooltip from '@material-ui/core/Tooltip';

import ControlPanelState from '../states/ControlPanelState'

import '../style/control-panel.scss'

@observer
class ControlPanelView extends React.Component {

    static propTypes = {

        // 是否打开控制面板抽屉
        showControlPanelDrawer: PropTypes.bool.isRequired,

        // 开关控制面板抽屉
        triggerControlPanelDrawer: PropTypes.func.isRequired,

        archiveName: PropTypes.string,
        author: PropTypes.string,
        setAuthor: PropTypes.func,
        setArchiveName: PropTypes.func,
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
                    target="_blank" rel="noreferrer"
                >
                    <Button
                        className="link repo"
                        // variant="outlined"
                        size="small"
                    >
                        iCode 仓库
                    </Button>
                </a>
                <a
                    href="http://linky.dev.weiyun.baidu.com:8339/pages/linky.html#/index?main=_s_thapzri718u5__20200220_1545&side=_s_thapzri718u5__20200220_1545"
                    target="_blank" rel="noreferrer"
                >
                    <Button
                        className="link guide"
                        // variant="outlined"
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
            local,
            props
        } = this
        const {
            showClearConfirmFlag,
            triggerConfirmFlag,
            showLoadArchiveConfirmFLag,
            triggerLoadArchiveConfirmFLag,
            archiveJSON,
        } = local.controlPanelState
        const {
            archiveName,
            setArchiveName,
            author,
            setAuthor,
            clearAll,
            copyStorageToClipboard,
            loadFromCopy,
            playgroundHeight,
            playgroundWidth,
            setPlaygroundHeight,
            setPlaygroundWidth,
            resizePlayground,
        } = props
        return <div className="control-panel-content">
            <TextField
                className="archive-name-input"
                size="small"
                variant="filled"
                label="存档名称"
                value={archiveName}
                onChange={evt => {
                    setArchiveName(evt.target.value)
                }}
                onBlur={evt => {
                    setArchiveName(evt.target.value.trim())
                }}
            />
            <TextField
                className="author-input"
                size="small"
                variant="filled"
                label="作者"
                value={author}
                onChange={evt => {
                    setAuthor(evt.target.value)
                }}
                onBlur={evt => {
                    setAuthor(evt.target.value.trim())
                }}
            />
            <TextField
                className="playground-width"
                size="small"
                // variant="filled"
                label="画布宽度"
                type="number"
                value={playgroundWidth}
                InputProps={{
                    endAdornment: <InputAdornment position="end">px</InputAdornment>
                }}
                onChange={evt => {
                    setPlaygroundWidth(+evt.target.value)
                }}
            />
            <TextField
                className="playground-height"
                size="small"
                // variant="filled"
                label="画布高度"
                type="number"
                value={playgroundHeight}
                InputProps={{
                    endAdornment: <InputAdornment position="end">px</InputAdornment>
                }}
                onChange={evt => {
                    setPlaygroundHeight(+evt.target.value)
                }}
            />
            <div className="actions-right">
                {/*<Tooltip title="复制当前画布内容，用于分享给其他同学">*/}
                    <Button
                        className="btn-share"
                        variant="contained"
                        size="small"
                        disabled={this.isEmpty || archiveName === '' || author === ''}
                        color="primary"
                        onClick={() => {
                            copyStorageToClipboard()
                        }}
                    >
                        分享
                    </Button>
                {/*</Tooltip>*/}
                {/*<Tooltip title="读取其他同学完成的画布">*/}
                    <Button
                        className="btn-load"
                        variant="contained"
                        size="small"
                        color="primary"
                        onClick={() => {
                            triggerLoadArchiveConfirmFLag(true)
                        }}
                    >
                        读取
                    </Button>
                {/*</Tooltip>*/}
                <Dialog
                    open={showLoadArchiveConfirmFLag}
                    onClose={() => {
                        triggerLoadArchiveConfirmFLag(false)
                    }}
                >
                    <DialogTitle>读取</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            请粘贴已有的画布数据。
                        </DialogContentText>
                        <TextField
                            className="load-archive-dialog"
                            autoFocus
                            value={archiveJSON}
                            onChange={evt => {
                                local.controlPanelState.setProps({
                                    archiveJSON: evt.target.value
                                })
                            }}
                            onBlur={evt => {
                                local.controlPanelState.setProps({
                                    archiveJSON: evt.target.value.trim()
                                })
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                triggerLoadArchiveConfirmFLag(false)
                                loadFromCopy(archiveJSON)
                            }}
                        >
                            确认
                        </Button>
                        <Button
                            onClick={() => {
                                triggerLoadArchiveConfirmFLag(false)
                            }}
                        >
                            取消
                        </Button>
                    </DialogActions>
                </Dialog>
                {/*<Tooltip title="清空画布并还原宽高">*/}
                    <Button
                        className="btn-clear"
                        color="secondary"
                        size="small"
                        variant="contained"
                        // disabled={this.isEmpty}
                        onClick={() => {
                            triggerConfirmFlag(true)
                        }}
                    >
                        重置
                    </Button>
                {/*</Tooltip>*/}
                <Dialog
                    open={showClearConfirmFlag}
                    onClose={() => {
                        triggerConfirmFlag(false)
                    }}
                >
                    <DialogTitle>确认重置画布？</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            移除的组件无法还原。
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                triggerConfirmFlag(false)
                                clearAll()
                                resizePlayground()
                            }}
                        >
                            确认
                        </Button>
                        <Button
                            onClick={() => {
                                triggerConfirmFlag(false)
                            }}
                        >
                            取消
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
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

export default ControlPanelView