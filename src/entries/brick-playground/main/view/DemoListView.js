import * as React from 'react'
import {default as c} from 'classnames'
import {toJS, computed, observable, action} from 'mobx'
import {inject, observer} from 'mobx-react'
import PropTypes from 'prop-types'
import {PropTypes as MobxPropTypes} from 'mobx-react'

import {ThemeProvider} from '@material-ui/core/styles'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

import ButtonDemo from '../demos/ButtonDemo'
import IconDemo from '../demos/IconDemo'
import LinkDemo from '../demos/LinkDemo'
import CollapseDemo from '../demos/CollapseDemo'
import DialogDemo from '../demos/DialogDemo'
import PopoverDemo from '../demos/PopoverDemo'
import TabsDemo from '../demos/TabsDemo'
import FileListDemo from '../demos/FileListDemo'
import TableDemo from '../demos/TableDemo'
import CheckboxGroupDemo from '../demos/CheckboxGroupDemo'
import DatePickerDemo from '../demos/DatePickerDemo'
import InputDemo from '../demos/InputDemo'
import RadioDemo from '../demos/RadioGroupDemo'
import SelectDemo from '../demos/SelectDemo'
import SuggestDemo from '../demos/SuggestDemo'
import SwitchDemo from '../demos/SwitchDemo'
import TextareaDemo from '../demos/TextareaDemo'
import AlertDemo from '../demos/AlertDemo'
import BreadcrumbDemo from '../demos/BreadcrumbDemo'
import HeadNavDemo from '../demos/HeadNavDemo'
import MenuDemo from '../demos/MenuDemo'
import PaginationDemo from '../demos/PaginationDemo'

import Drawer from '@material-ui/core/Drawer'
import MUIButton from '@material-ui/core/Button'

import DemoListState from '../states/DemoListState'

import {PortalContainerProvider} from '../utils/PortalContainerContext'

import '../style/demo-list.scss'
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Paper from "@material-ui/core/Paper";
import {COMP_TYPES} from "../config";

@observer
export default class DemoListView extends React.Component {

    static propTypes = {

        // 是否打开 demo 列表抽屉
        showDemoDrawer: PropTypes.bool.isRequired,
    }

    local = {
        demoListState: new DemoListState(),
    }

    constructor(props) {
        super(props)
        const {local} = this
    }

    componentDidMount() {
        // TODO: 待移除
        this.local.demoListState.setProps({
            expandedDemoPanelLabel: 'Dialog'
        })
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
            ButtonDemo,
            IconDemo,
            LinkDemo,
            CollapseDemo,
            DialogDemo,
            PopoverDemo,
            TabsDemo,
            FileListDemo,
            TableDemo,
            CheckboxGroupDemo,
            DatePickerDemo,
            InputDemo,
            RadioDemo,
            SelectDemo,
            SuggestDemo,
            SwitchDemo,
            TextareaDemo,
            AlertDemo,
            // ToastDemo, // Toast 与 Alert UI 一致.
            BreadcrumbDemo,
            HeadNavDemo,
            MenuDemo,
            PaginationDemo
        ]

        return <PortalContainerProvider value=".demo-list-content">
            <div>
                {
                    Demos.map(Demo => {
                        let label = ''
                        const regArr = /^(.+)Demo$/.exec(Demo.name)
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
                            key={label}
                            square={true}
                            expanded={isExpanded}
                            onChange={(evt, value) => {
                                setExpandedDemoPanelLabel(value ? label : '')
                            }}>
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
