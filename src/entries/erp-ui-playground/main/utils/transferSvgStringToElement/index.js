import * as React from 'react'
import {Icon} from '@befe/brick'

// import {
//     SvgArrowDown, SvgArrowUp, SvgBoldArrowUp, SvgBoldThickDown, SvgFastLeft, SvgFastRight, SvgPlainDown, SvgPlainLeft, SvgPlainRight, SvgPlainUp, SvgTriangleDown, SvgTriangleLeft, SvgTriangleRight, SvgTriangleUp, SvgFileAdd, SvgFileCheck, SvgFileDataExport, SvgFileDataImport, SvgFileReject, SvgFileSearch, SvgFileSync, SvgTransmitDownload, SvgTransmitUpload, SvgFlowActivate, SvgFlowDistribute, SvgFlowForward, SvgFlowGoOn, SvgFlowPause, SvgFlowRefresh, SvgFlowRollback, SvgFlowUpdate, SvgFlowWithdraw, SvgGenderFemale, SvgGenderMale, SvgMedal, SvgProtectionChecked, SvgProtectionExternal, SvgProtectionInternal, SvgStarFilled, SvgStar, SvgThumbUpFilled, SvgThumbUp, SvgVisibleDisabled, SvgVisible, SvgBtnMinus, SvgBtnPlus, SvgCalendarChecked, SvgCalendarTrend, SvgCalendar, SvgCellphone, SvgChartHistogram, SvgChartOrg, SvgChartTrend, SvgChat, SvgComment, SvgCurrencyCoin, SvgCurrencyPaper, SvgDiscX, SvgInfinity, SvgLoading, SvgLocation, SvgPlus, SvgSort, SvgToTop, SvgFileEml, SvgFileExcel, SvgFileHtml, SvgFileImg, SvgFileOther, SvgFilePdf, SvgFilePpt, SvgFileTxt, SvgFileWord, SvgFileZip, SvgHi, SvgSignAt, SvgSignBan, SvgSignClock, SvgSignCny, SvgSignCross, SvgSignExclamation, SvgSignInfoBold, SvgSignInfo, SvgSignMinus, SvgSignQuestion, SvgSignTick, SvgAuthorizationKey, SvgAuthorizationLock, SvgAuthorizationSetting, SvgBell, SvgBroadcast, SvgGear, SvgHelpDu, SvgHelpService, SvgUserAdd, SvgUserAlert, SvgUserConfig, SvgUserManager, SvgUserTeam, SvgUser, SvgCalculate, SvgClip, SvgCopy, SvgEditPencil, SvgEdit, SvgFolderOpened, SvgFolder, SvgFontSize, SvgImage, SvgJoinUp, SvgLinkBreak, SvgLink, SvgMail, SvgMarkCheck, SvgMarkCross, SvgMoreEllipsis, SvgMoreList, SvgPin, SvgPrinter, SvgSave, SvgScaleDown, SvgScaleUp, SvgSearch, SvgShare, SvgSortTimeAsce, SvgSortTimeDesc, SvgTrash, SvgTrun90Acw, SvgTurn90Cw
// } from '@befe/brick-icon'

import {ICON_GROUP_MAP_MAIN} from '@befe/brick-icon/src/main/group-map'

// var a = '[#4C84FF, #39BF45, #F27C49, #E64552, 12px, 14px, 16px, 20px, true, 1.5, 2, 3, ]'

const transferSvgStringToElement = string => {
    let svg = null
    for (let groupKey in ICON_GROUP_MAP_MAIN) {
        let group = ICON_GROUP_MAP_MAIN[groupKey]
        for (let iconKey in group) {
            let icon = group[iconKey]
            if (icon.name === string) {
                svg = icon
                break
            }
        }
    }
    return svg
    // return React.createElement(Icon, {
    //     svg
    // })
}

export default transferSvgStringToElement
