import * as React from 'react'
import {observer} from 'mobx-react'
import PropTypes from 'prop-types'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Drawer from '@material-ui/core/Drawer'

import ButtonDemo from '../demos/ButtonDemo'
import IconDemo from '../demos/IconDemo'
import LinkDemo from '../demos/LinkDemo'
import TypographyDemo from '../demos/TypographyDemo'
import SectionDemo from '../demos/SectionDemo'
import CollapseDemo from '../demos/CollapseDemo'
import DialogDemo from '../demos/DialogDemo'
import PopoverDemo from '../demos/PopoverDemo'
import PopoverConfirmDemo from '../demos/PopoverConfirmDemo'
import TabsDemo from '../demos/TabsDemo'
import FileListDemo from '../demos/FileListDemo'
import TableDemo from '../demos/TableDemo'
import CheckboxGroupDemo from '../demos/CheckboxGroupDemo'
import DatePickerDemo from '../demos/DatePickerDemo'
import InputDemo from '../demos/InputDemo'
import RadioDemo from '../demos/RadioGroupDemo'
import SingleSelectDemo from '../demos/SingleSelectDemo'
import MultipleSelectDemo from '../demos/MultipleSelectDemo'
import SuggestDemo from '../demos/SuggestDemo'
import TextSwitchDemo from '../demos/TextSwitchDemo'
import IconSwitchDemo from '../demos/IconSwitchDemo'
import TextareaDemo from '../demos/TextareaDemo'
import AlertDemo from '../demos/AlertDemo'
import BreadcrumbDemo from '../demos/BreadcrumbDemo'
import HeadNavDemo from '../demos/HeadNavDemo'
import MenuDemo from '../demos/MenuDemo'
import PaginationDemo from '../demos/PaginationDemo'

import DemoListState from '../states/DemoListState'

import {PortalContainerProvider} from '../utils/PortalContainerContext'

import {COMP_TYPES} from "../config";
import '../style/demo-list.scss'

@observer
class DemoListView extends React.Component {

    static propTypes = {

        // 是否打开 demo 列表抽屉
        showDemoDrawer: PropTypes.bool.isRequired,
    }

    local = {
        demoListState: new DemoListState(),
    }

    getCnLabel = label => {
        for (let item in COMP_TYPES) {
            if (COMP_TYPES[item].enLabel === label) {
                return COMP_TYPES[item].cnLabel
            }
        }
        return ''
    }

    renderDemoPanels = () => {
        const {local, props, getCnLabel} = this
        const {demoListState} = local
        const {
            expandedDemoPanelLabel,
            setExpandedDemoPanelLabel
        } = demoListState

        const Demos = [
            {
                categoryName: '基础'
            },
            ButtonDemo,
            IconDemo,
            LinkDemo,
            TypographyDemo,
            {
                categoryName: '容器'
            },
            SectionDemo,
            CollapseDemo,
            DialogDemo,
            PopoverDemo,
            PopoverConfirmDemo,
            TabsDemo,
            {
                categoryName: '数据展示'
            },
            FileListDemo,
            TableDemo,
            {
                categoryName: '数据输入'
            },
            CheckboxGroupDemo,
            DatePickerDemo,
            InputDemo,
            RadioDemo,
            SingleSelectDemo,
            MultipleSelectDemo,
            SuggestDemo,
            TextSwitchDemo,
            IconSwitchDemo,
            TextareaDemo,
            {
                categoryName: '信息反馈'
            },
            AlertDemo,
            // ToastDemo, // Toast 与 Alert UI 一致.
            {
                categoryName: '导航'
            },
            BreadcrumbDemo,
            HeadNavDemo,
            MenuDemo,
            PaginationDemo
        ]

        return <PortalContainerProvider value=".demo-list-content">
            <div>
                {
                    Demos.map((Demo, index) => {
                        if (typeof Demo.categoryName === 'string') {
                            return <h3
                                className="demo-cate"
                                key={index}
                            >
                                <span className="name">
                                    {Demo.categoryName}
                                </span>
                            </h3>
                        }
                        let label = ''
                        const regArr = /^(.+)Demo$/.exec(Demo.wrapName)
                        if (regArr) {
                            label = regArr[1]
                        }
                        const isExpanded = expandedDemoPanelLabel === label
                        // Dialog 必须从初始保持渲染状态
                        const shouldRenderDemo = isExpanded
                            || label === 'Dialog'
                            || label === 'Table'
                            || label === 'Button'
                        return <ExpansionPanel
                            className="demo-exp-panel"
                            key={index}
                            square={true}
                            expanded={isExpanded}
                            onChange={(evt, value) => {
                                setExpandedDemoPanelLabel(value ? label : '')
                            }}>
                            {/*TransitionProps={{*/}
                            {/*    unmountOnExit: true*/}
                            {/*}}*/}
                            <ExpansionPanelSummary
                                className="title"
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography>
                                    <span>{label}</span>
                                    <span className="cn-label">{getCnLabel(label)}</span>
                                </Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails
                                className="content"
                            >
                                {shouldRenderDemo && <Demo />}
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    })
                }
            </div>
        </PortalContainerProvider>;
    }

    render() {
        const {local, props} = this
        return <div className="demo-list">
            <Drawer
                className="demo-list-drawer"
                anchor="left"
                variant="persistent"
                open={props.showDemoDrawer}
            >
                <div className="demo-list-wrap">
                    <div
                        className="demo-list-content"
                    >
                        {this.renderDemoPanels()}
                    </div>
                    <div
                        className="fake-trigger"
                    >
                        <MoreHorizIcon
                            className="trigger-icon"
                            fontSize="small"
                        />
                    </div>
                </div>
            </Drawer>
        </div>
    }
}

export default DemoListView