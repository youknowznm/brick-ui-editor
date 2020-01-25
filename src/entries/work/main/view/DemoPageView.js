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

import '../style/demo-page.scss';

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
                        props.triggerDemoDrawer(false);
                    }
                },
                h.iframe('demo-page-iframe', {
                    width: '100%',
                    height: '100%',
                    style: {
                        width: `${props.demoPageWidth}px`,
                    },
                    src: props.demoPageSrc
                })
            )
        );
    }
}
