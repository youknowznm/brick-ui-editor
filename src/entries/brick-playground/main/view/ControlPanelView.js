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

@observer
export default class ControlPanelView extends React.Component {

    static propTypes = {

        // 是否打开控制面板抽屉
        showControlPanelDrawer: PropTypes.bool.isRequired,

        // 开关控制面板抽屉
        triggerControlPanelDrawer: PropTypes.func.isRequired,
    }

    local = {
        ControlPanelState: new ControlPanelState()
    }

    constructor(props) {
        super(props)
        const {local} = this
    }

    renderControlPanelContent = () => {
        return <div className="control-panel-content">
            <Button variant="contained">
                清除存档
            </Button>
            <Button variant="contained" color="primary">
                分享
            </Button>
        </div>
    }

    render() {
        const {local, props} = this
        const {ControlPanelState} = local
        return <div className="control-panel">
            <Drawer
                className="control-panel-drawer"
                anchor="top"
                variant="persistent"
                open={props.showControlPanelDrawer}
                // onMouseOut={() => {
                //     props.triggerControlPanelDrawer(false)
                // }}
            >
                {this.renderControlPanelContent()}
                <Paper
                    square={true}
                    className="fake-trigger"
                >
                    <MoreVerIcon
                        className="trigger-icon"
                        fontSize="small"
                    />
                </Paper>
            </Drawer>
        </div>
    }
}