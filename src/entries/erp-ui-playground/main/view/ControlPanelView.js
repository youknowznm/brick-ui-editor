import * as React from 'react'
import {default as c} from 'classnames'
import {toJS, computed, observable, action} from 'mobx'
import {inject, observer} from 'mobx-react'

import PropTypes from 'prop-types'
import {PropTypes as MobxPropTypes} from 'mobx-react'

import {withStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'

import DemoPageState from '../states/DemoPageState'

import '../style/control-panel.scss'

@observer
export default class ControlPanelView extends React.Component {

    static propTypes = {
        // showControlPanelDrawer
    }

    local = {
        demoPageState: new DemoPageState()
    }

    constructor(props) {
        super(props)
        const {local} = this
    }

    componentDidMount() {
    }

    componentDidUpdate() {}

    componentWillReceiveProps() {}

    renderControlPanelContent = () => {
        return <div className="control-panel-content"></div>
    }

    render() {
        const {local, props} = this
        const {demoPageState} = local
        return <div className="control-panel">
            <Drawer
                className="control-panel-drawer"
                anchor="top"
                variant="persistent"
                open={props.showControlPanelDrawer}
                onMouseOut={() => {
                    props.triggerControlPanelDrawer(false)
                }}
            >
                {this.renderControlPanelContent()}
            </Drawer>
        </div>
    }
}
