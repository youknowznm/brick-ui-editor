import * as React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

import {Icon} from '@befe/brick'
// import {
//     SvgArrowDown, SvgArrowUp, SvgBoldArrowUp, SvgBoldThickDown, SvgFastLeft, SvgFastRight, SvgPlainDown, SvgPlainLeft, SvgPlainRight, SvgPlainUp, SvgTriangleDown, SvgTriangleLeft, SvgTriangleRight, SvgTriangleUp, SvgFileAdd, SvgFileCheck, SvgFileDataExport, SvgFileDataImport, SvgFileReject, SvgFileSearch, SvgFileSync, SvgTransmitDownload, SvgTransmitUpload, SvgFlowActivate, SvgFlowDistribute, SvgFlowForward, SvgFlowGoOn, SvgFlowPause, SvgFlowRefresh, SvgFlowRollback, SvgFlowUpdate, SvgFlowWithdraw, SvgGenderFemale, SvgGenderMale, SvgMedal, SvgProtectionChecked, SvgProtectionExternal, SvgProtectionInternal, SvgStarFilled, SvgStar, SvgThumbUpFilled, SvgThumbUp, SvgVisibleDisabled, SvgVisible, SvgBtnMinus, SvgBtnPlus, SvgCalendarChecked, SvgCalendarTrend, SvgCalendar, SvgCellphone, SvgChartHistogram, SvgChartOrg, SvgChartTrend, SvgChat, SvgComment, SvgCurrencyCoin, SvgCurrencyPaper, SvgDiscX, SvgInfinity, SvgLoading, SvgLocation, SvgPlus, SvgSort, SvgToTop, SvgFileEml, SvgFileExcel, SvgFileHtml, SvgFileImg, SvgFileOther, SvgFilePdf, SvgFilePpt, SvgFileTxt, SvgFileWord, SvgFileZip, SvgHi, SvgSignAt, SvgSignBan, SvgSignClock, SvgSignCny, SvgSignCross, SvgSignExclamation, SvgSignInfoBold, SvgSignInfo, SvgSignMinus, SvgSignQuestion, SvgSignTick, SvgAuthorizationKey, SvgAuthorizationLock, SvgAuthorizationSetting, SvgBell, SvgBroadcast, SvgGear, SvgHelpDu, SvgHelpService, SvgUserAdd, SvgUserAlert, SvgUserConfig, SvgUserManager, SvgUserTeam, SvgUser, SvgCalculate, SvgClip, SvgCopy, SvgEditPencil, SvgEdit, SvgFolderOpened, SvgFolder, SvgFontSize, SvgImage, SvgJoinUp, SvgLinkBreak, SvgLink, SvgMail, SvgMarkCheck, SvgMarkCross, SvgMoreEllipsis, SvgMoreList, SvgPin, SvgPrinter, SvgSave, SvgScaleDown, SvgScaleUp, SvgSearch, SvgShare, SvgSortTimeAsce, SvgSortTimeDesc, SvgTrash, SvgTrun90Acw, SvgTurn90Cw
// } from '@befe/brick-icon'

import {ICON_GROUP_MAP_MAIN} from '@befe/brick-icon/src/main/group-map'
import TextField from "@material-ui/core/TextField";

export default class extends React.Component {

    state = {
        open: false
    }

    triggerVis = tar => {
        this.setState({
            open: typeof tar === 'boolean' ? tar : !this.state.open
        })
    }

    render() {
        const {
            open
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
                    this.triggerVis(true)
                }}
                {...restProps}
            />
            <Dialog
                onClose={() => {
                    this.triggerVis(false)
                }}
                open={open}
            >
                <DialogTitle
                    onClose={() => {
                        this.triggerVis(false)
                    }}
                >
                    <Typography gutterBottom>
                        选择图标
                    </Typography>
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
                        in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                    </Typography>
                    <Typography gutterBottom>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
                        lacus vel augue laoreet rutrum faucibus dolor auctor.
                    </Typography>
                    <Typography gutterBottom>
                        Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
                        scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
                        auctor fringilla.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        autoFocus
                        onClick={() => {
                            this.triggerVis(false)
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
