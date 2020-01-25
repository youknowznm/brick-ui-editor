import * as React from 'react';
import {c} from 'classnames';
import {toJS, computed, observable, action} from 'mobx';
import {observer} from 'mobx-react';

import PropTypes from 'prop-types';
import {PropTypes as MobxPropTypes} from 'mobx-react';

import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

import DemoPageState from '../states/DemoPageState';

import '../style/control-panel.scss';

@inject('app')
@observer
@suh(compStyle)
export default class Comp extends Component {

    static propTypes = {
        // showControlPanelDrawer
    };

    local = {
        demoPageState: new DemoPageState(),
    };

    constructor(props) {
        super(props);
        const {local} = this;
    }

    componentDidMount() {
    }

    componentDidUpdate() {}

    componentWillReceiveProps() {}

    renderControlPanelContent = () => {
        return h.div('control-panel-content', {},
            
        );
    }

    render() {
        const {local, props} = this;
        const {demoPageState} = local;
        return h.div('control-panel', {},
            h(
                Drawer,
                'control-panel-drawer',
                {
                    anchor: 'top',
                    variant: 'persistent',
                    open: props.showControlPanelDrawer,
                    onMouseOut() {
                        props.triggerControlPanelDrawer(false);
                    }
                },
                this.renderControlPanelContent()
            )
        );
    }
}
