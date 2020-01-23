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

import HtmlMeasure from 'html-measure';

import {pcNormalAgentTheme as theme} from 'frontend/service/agent-theme/pc-normal-agent-theme';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import ERPCompsButton from '@befe/erp-comps/v2/components/Button';

import PlaygroundCompWrap from '../components/PlaygroundCompWrap';

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
        const {props} = this;
        const {root} = props.app;
        return h.div(
            'playground-content',
            {
                onMouseOver: evt => {
                    if (evt.target.className.indexOf('playground') > -1) {
                        props.triggerDemoDrawer(false);
                    }
                },
                onClick: evt => {
                    if (evt.target.className.indexOf('playground') > -1) {
                        root.setProps({
                            componentInEditId: ''
                        });
                    };
                }
            },
            ...props.componentsUsed
        );
    }

    renderBlockLayer = () => {
        const {local, props} = this;
        const {
            playgroundWidth,
            playgroundHeight
        } = props;
        // console.log(133, props.playgroundWidth, props.playgroundHeight);

        // const tl = 100;
        // const tr = 100;
        // const br = 100;
        // const bl = 100;
        // const width = 
        
        // return h.div('block-layer', {},
        //     h.div('area-top-left', {
        //         style: {
        //             top: 0,
        //             right: playgroundWidth - tl,
        //             bottom: playgroundHeight - bl,
        //             left: 0,
        //         }
        //     }),
        // )
    }

    render() {
        const {local, props, triggerDemoDrawer} = this;
        const {demoPageState} = local;
        const {
            demoPageWidth,
            showDemoPageDrawer
        } = props;
        const offSet = demoPageWidth - 20;
        return h.div(
            c(
                'playground-wrap',
            ),
            {
                style: {
                    marginLeft: `${showDemoPageDrawer ? offSet : 0}px`,
                    right: `${showDemoPageDrawer ? -offSet : 0}px`,
                }
            },
            // h(
            //     HtmlMeasure,
            //     {},
                this.renderPlaygroundContent(),
            // ),
            this.renderBlockLayer()
        );
    }
}
