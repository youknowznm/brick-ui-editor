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

import {withStyles} from '@material-ui/core/styles'
import MUIDrawer from '@material-ui/core/Drawer'
import MUIButton from '@material-ui/core/Button'

import DemoListState from '../states/DemoListState'

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

    componentDidMount() {
    }

    componentDidUpdate() {}

    componentWillReceiveProps() {}

    handleChange() {

    }

    renderDemoPanels = () => {
        const {local, props} = this
        const {demoListState} = local
        const {metaKeyPressing} = props
        const {
            expandedDemoPanelKey,
            setExpandedDemoPanelKey
        } = demoListState
        const demoTypes = [
            {
                label: 'Button',
                Demo: ButtonDemo
            },
            {
                label: 'Icon',
                Demo: IconDemo
            },
            {
                label: 'Link',
                Demo: LinkDemo
            },
            {
                label: 'Collapse',
                Demo: CollapseDemo
            },
            {
                label: 'Dialog',
                Demo: DialogDemo
            },
            {
                label: 'Popover',
                Demo: PopoverDemo
            },
            {
                label: 'Tabs',
                Demo: TabsDemo
            },
            {
                label: 'FileList',
                Demo: FileListDemo
            },
            {
                label: 'Table',
                Demo: TableDemo
            },
            {
                label: 'Checkbox',
                Demo: CheckboxDemo
            },
            {
                label: 'DatePicker',
                Demo: DatePickerDemo
            },
            {
                label: 'Input',
                Demo: InputDemo
            }
        ]
        return <div>
            {
                demoTypes.map(item => {
                    const {label, Demo} = item
                    const key = `demo-panel-${label}`
                    const expanded = expandedDemoPanelKey === key
                    return <ExpansionPanel
                        key={key}
                        square={true}
                        expanded={expanded}
                        onChange={(evt, value) => {
                            setExpandedDemoPanelKey(value ? key : '')
                        }}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{label}</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Demo metaKeyPressing={metaKeyPressing} />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                })
            }
        </div>;
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
