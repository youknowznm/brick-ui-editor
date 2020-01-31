import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from "@material-ui/core/TextField";

import {Icon} from '@befe/brick'
// import {
//     SvgArrowDown, SvgArrowUp, SvgBoldArrowUp, SvgBoldThickDown, SvgFastLeft, SvgFastRight, SvgPlainDown, SvgPlainLeft, SvgPlainRight, SvgPlainUp, SvgTriangleDown, SvgTriangleLeft, SvgTriangleRight, SvgTriangleUp, SvgFileAdd, SvgFileCheck, SvgFileDataExport, SvgFileDataImport, SvgFileReject, SvgFileSearch, SvgFileSync, SvgTransmitDownload, SvgTransmitUpload, SvgFlowActivate, SvgFlowDistribute, SvgFlowForward, SvgFlowGoOn, SvgFlowPause, SvgFlowRefresh, SvgFlowRollback, SvgFlowUpdate, SvgFlowWithdraw, SvgGenderFemale, SvgGenderMale, SvgMedal, SvgProtectionChecked, SvgProtectionExternal, SvgProtectionInternal, SvgStarFilled, SvgStar, SvgThumbUpFilled, SvgThumbUp, SvgVisibleDisabled, SvgVisible, SvgBtnMinus, SvgBtnPlus, SvgCalendarChecked, SvgCalendarTrend, SvgCalendar, SvgCellphone, SvgChartHistogram, SvgChartOrg, SvgChartTrend, SvgChat, SvgComment, SvgCurrencyCoin, SvgCurrencyPaper, SvgDiscX, SvgInfinity, SvgLoading, SvgLocation, SvgPlus, SvgSort, SvgToTop, SvgFileEml, SvgFileExcel, SvgFileHtml, SvgFileImg, SvgFileOther, SvgFilePdf, SvgFilePpt, SvgFileTxt, SvgFileWord, SvgFileZip, SvgHi, SvgSignAt, SvgSignBan, SvgSignClock, SvgSignCny, SvgSignCross, SvgSignExclamation, SvgSignInfoBold, SvgSignInfo, SvgSignMinus, SvgSignQuestion, SvgSignTick, SvgAuthorizationKey, SvgAuthorizationLock, SvgAuthorizationSetting, SvgBell, SvgBroadcast, SvgGear, SvgHelpDu, SvgHelpService, SvgUserAdd, SvgUserAlert, SvgUserConfig, SvgUserManager, SvgUserTeam, SvgUser, SvgCalculate, SvgClip, SvgCopy, SvgEditPencil, SvgEdit, SvgFolderOpened, SvgFolder, SvgFontSize, SvgImage, SvgJoinUp, SvgLinkBreak, SvgLink, SvgMail, SvgMarkCheck, SvgMarkCross, SvgMoreEllipsis, SvgMoreList, SvgPin, SvgPrinter, SvgSave, SvgScaleDown, SvgScaleUp, SvgSearch, SvgShare, SvgSortTimeAsce, SvgSortTimeDesc, SvgTrash, SvgTrun90Acw, SvgTurn90Cw
// } from '@befe/brick-icon'

import {ICON_GROUP_MAP_MAIN} from '@befe/brick-icon/src/main/group-map'

import './style.scss'

export default class extends React.Component {

    state = {
        visible: false,
        iconTypes: [],
        selectedIconType: ''
    }

    componentDidMount() {
        const iconTypes = []
        for (let key in ICON_GROUP_MAP_MAIN) {
            iconTypes.push(key)
        }
        this.setState({
            iconTypes,
            selectedIconType: iconTypes[0]
        })
    }

    triggerVisible = tar => {
        this.setState({
            visible: typeof tar === 'boolean' ? tar : !this.state.visible
        })
    }

    render() {
        const {
            visible,
            iconTypes,
            selectedIconType
        } = this.state
        const {
            value,
            onChange,
            ...restProps
        } = this.props
        return <div>
            <TextField
                value={value}
                onChange={evt => {
                    // targetPropsChangeHandler({
                    //     [key]: evt.target.value
                    // })
                }}
                onClick={() => {
                    this.triggerVisible(true)
                }}
                {...restProps}
            />
            <Dialog
                onClose={() => {
                    this.triggerVisible(false)
                }}
                open={visible}
            >
                <DialogTitle
                    onClose={() => {
                        this.triggerVisible(false)
                    }}
                >
                    <Typography gutterBottom>
                        选择图标
                    </Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <Tabs
                        className="icon-type-tabs"
                        value={selectedIconType}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={()=>{}}
                    >
                        {
                            iconTypes.map(type => {
                                return <Tab label={type} />
                            })
                        }
                    </Tabs>
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={() => {
                            this.triggerVisible(false)
                        }}
                        color="primary"
                    >
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    }
}
