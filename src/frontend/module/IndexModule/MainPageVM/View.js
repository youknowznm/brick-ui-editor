/**
 * @author zhangenming
 */

import {
    React,
    computed,
    Component,
    h,
    toJS,
    suh,
    observer
} from '@befe/utils/dev-pattern-vm/index-pc-normal';

import DemoPageView from './view/DemoPageView';
import ControlPanelView from './view/ControlPanelView';
import PlaygroundView from './view/PlaygroundView';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Card from '@material-ui/core/Card';

import pageStyle from './style.use.less';

@suh(pageStyle)
@observer
export default class extends Component {

    // 是否注入全局的 app 对象
    static shouldInjectApp = true;
    
    state = {
        compsUsed: []
    }

    pushCompUsed = comp => {
    }

    componentDidMount() {
        const {local, props, pushCompUsed} = this;
        const {
        } = local;

        const {
            expHeaderId
        } = props.location.query;

        window.addEventListener('message', function (event) {
            // event.data 数据；event.origin 发送消息窗口的源；event.source 发送消息的窗口对象
            const {
                data,
                type
            } = event;
            if (data.type === 'ERP_UI_PREVIEWER') {
                console.log(data.data);
                let a = React.createElement(
                    Button,
                    data.data.props
                );
                console.log({a});
                pushCompUsed(a);
            }
        });
    }

    renderControlPanelDrawerTrigger = () => {
        return h(
            Card,
            'top-actions-drawer-trigger', 
            {
                raised: true,
                onMouseOver: () => {
                    this.local.triggerControlPanelDrawer(true);
                }
            },
            h(
                MoreHorizIcon,
                'trigger-icon',
                {
                    fontSize: 'small'
                }
            )
        );
    }

    renderDemoDrawerTrigger = () => {
        return h(
            Card,
            'demo-drawer-trigger', 
            {
                raised: true,
                onMouseOver: () => {
                    this.local.triggerDemoDrawer(true);
                }
            },
            h(
                MoreVertIcon,
                'trigger-icon',
                {
                    fontSize: 'small'
                }
            )
        );
    }


    render() {
        const {props, local} = this;
        return h.div('index-page', {},
            h(DemoPageView, {
                showDemoPageDrawer: local.showDemoPageDrawer,
                demoPageSrc: local.demoPageSrc,
                demoPageMinWidth: local.demoPageMinWidth,
                triggerDemoDrawer: local.triggerDemoDrawer
            }),
            this.renderDemoDrawerTrigger(),
            h(ControlPanelView, {
                showControlPanelDrawer: local.showControlPanelDrawer,
                triggerControlPanelDrawer: local.triggerControlPanelDrawer
            }),
            this.renderControlPanelDrawerTrigger(),
            h(PlaygroundView, {
            }),
            ...this.state.compsUsed
        );
    }
}
