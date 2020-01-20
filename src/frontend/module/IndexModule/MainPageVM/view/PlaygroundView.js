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

import {pcNormalAgentTheme as theme} from 'frontend/service/agent-theme/pc-normal-agent-theme';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';


import Card from '@material-ui/core/Card';

import PlaygroundState from '../states/PlaygroundState';

import compStyle from '../style/playground.use.less';

@inject('app')
@observer
@suh(compStyle)
export default class Comp extends Component {

    static propTypes = {
        // triggerDemoDrawer
    };

    local = {
        playgroundState: new PlaygroundState(),
    };

    constructor(props) {
        super(props);
        const {local} = this;
    }

    componentDidMount() {
    }

    componentDidUpdate() {}

    componentWillReceiveProps() {
    }

    renderPlaygroundContent = () => {
        return h.div(
            'playground',
            {
                onMouseOver: () => {
                    this.props.triggerDemoDrawer(false);
                }   
            },
        );
    }

    render() {
        const {local, props, triggerDemoDrawer} = this;
        const {demoPageState} = local;
        return h.div(
            'playground',
            {},
            this.renderPlaygroundContent(),
        );
    }
}
