import * as React from 'react'
import {default as c} from 'classnames'
import {toJS, computed, observable, action} from 'mobx'
import {inject, observer} from 'mobx-react'

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

import PropTypes from 'prop-types'
import {PropTypes as MobxPropTypes} from 'mobx-react'

import ButtonDemo from '../demos/ButtonDemo'
import IconDemo from '../demos/IconDemo'
import LinkDemo from '../demos/LinkDemo'
import CollapseDemo from '../demos/CollapseDemo'
import DialogDemo from '../demos/DialogDemo'
import PopoverDemo from '../demos/PopoverDemo'
import TabsDemo from '../demos/TabsDemo'
import FileListDemo from '../demos/FileListDemo'
import TableDemo from '../demos/TableDemo'
import CheckboxDemo from '../demos/CheckboxDemo'
import DatePickerDemo from '../demos/DatePickerDemo'
import InputDemo from '../demos/InputDemo'
import RadioDemo from '../demos/RadioDemo'
import SelectDemo from '../demos/SelectDemo'
import SuggestDemo from '../demos/SuggestDemo'
import SwitchDemo from '../demos/SwitchDemo'
import TextareaDemo from '../demos/TextareaDemo'
import AlertDemo from '../demos/AlertDemo'
import BreadcrumbDemo from '../demos/BreadcrumbDemo'
import HeadNavDemo from '../demos/HeadNavDemo'
import MenuDemo from '../demos/MenuDemo'
import PaginationDemo from '../demos/PaginationDemo'

import MUIDrawer from '@material-ui/core/Drawer'
import MUIButton from '@material-ui/core/Button'

import DemoListState from '../states/DemoListState'

import {PortalContainerProvider} from '../utils/PortalContainerContext'
// import {PortalContainerConsumer} from '../../PortalContainerContext'

import '../style/demo-list.scss'

@observer
export default class DemoListView extends React.Component {

    static propTypes = {
        // showDemoListDrawer
    }

    local = {
        demoListState: new DemoListState(),
    }

    constructor(props) {
        super(props)
        const {local} = this
    }

    componentDidMount() {}

    componentDidUpdate() {}

    renderDemoPanels = () => {
        const {local, props} = this
        const {demoListState} = local
        const {metaKeyPressing} = props
        const {
            expandedDemoPanelLabel,
            setExpandedDemoPanelKey
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
            CheckboxDemo,
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
                        const shouldRenderDemo = isExpanded || label === 'Dialog'
                        return <ExpansionPanel
                            key={label}
                            square={true}
                            expanded={isExpanded}
                            onChange={(evt, value) => {
                                setExpandedDemoPanelKey(value ? label : '')
                            }}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography>{label}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                {shouldRenderDemo && <Demo metaKeyPressing={metaKeyPressing} />}
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    })
                }
            </div>
        </PortalContainerProvider>;
    }

    render() {
        const {local, props} = this
        const {demoListState} = local
        const {metaKeyPressing} = props
        return <div className="demo-list">
            <MUIDrawer
                className="demo-list-drawer"
                anchor="left"
                variant="persistent"
                open={props.showDemoListDrawer}
            >
                <div
                    className="demo-list-content"
                    style={{
                        width:`${props.demoListWidth}px`
                    }}
                >
                    {this.renderDemoPanels()}
                </div>
            </MUIDrawer>
        </div>
    }
}
