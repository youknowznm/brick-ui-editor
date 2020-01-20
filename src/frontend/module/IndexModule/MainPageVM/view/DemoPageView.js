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

import compStyle from '../style/demo-page.use.less';

@inject('app')
@observer
@suh(compStyle)
export default class Comp extends Component {

    static propTypes = {
        // showDemoPageDrawer
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

    render() {
        const {local, props} = this;
        const {demoPageState} = local;
        return h.div('demo-page', {},
            h(
                Drawer,
                'demo-page-drawer',
                {
                    anchor: 'left',
                    variant: 'persistent',
                    open: props.showDemoPageDrawer,
                    onMouseOut() {
                        props.triggerDemoDrawer(false)
                    }
                },
                h.iframe('demo-page-iframe', {
                    width: '100%',
                    height: '100%',
                    style: {
                        width: `${props.demoPageMinWidth}px`,
                    },
                    src: props.demoPageSrc
                })
            )
        )
    }
}
