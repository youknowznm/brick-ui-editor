/* eslint-disable */

import {
    React,
    Component,
    observer,
    inject,
    observable,
    computed,
    reaction,
    h,
    c,
    action,
    toJS,
    suh
} from '@befe/utils/dev-pattern-vm/index-pc-normal';
import PropTypes from 'prop-types';
import {PropTypes as MobxPropTypes} from 'mobx-react';

import SectionForm from '@befe/erp-comps/v2/components/SectionForm';

import {withStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';

import DemoPageState from '../states/DemoPageState';

import compStyle from '../style/control-panel.use.less';

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
            
        )
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
                        props.triggerControlPanelDrawer(false)
                    }
                },
                this.renderControlPanelContent()
            )
        )
    }
}
