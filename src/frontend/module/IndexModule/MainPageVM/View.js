/**
 * @author zhangenming
 */

import {
    React,
    computed,
    Component,
    action,
    h,
    toJS,
    suh,
    observer
} from '@befe/utils/dev-pattern-vm/index-pc-normal';

import DemoPageView from './view/DemoPageView';
import ControlPanelView from './view/ControlPanelView';
import PlaygroundView from './view/PlaygroundView';
import AttrEditorView from './view/AttrEditorView';

import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Card from '@material-ui/core/Card';

import Draggable from 'react-draggable';

import ERPCompsButton from '@befe/erp-comps/v2/components/Button';

import PlaygroundCompWrap from './components/PlaygroundCompWrap';

import pageStyle from './style.use.less';

@suh(pageStyle)
@observer
export default class extends Component {

    // 是否注入全局的 app 对象
    static shouldInjectApp = true;
    
    componentDidMount() {
        const {local, props} = this;
        this.registerMessageListener();
        this.registerMetaKeyListener();
        this.registerBodyMouseEnterListener();
        this.registerResizeListener();
    }

    registerMessageListener = () => {
        const {local} = this;
        const {
            appendDemoComponent,
            metaKeyPressed
        } = local;
        window.addEventListener('message', event => {
            const {
                data,
                type
            } = event.data;
            
            if (type && type.indexOf('EUP') === 0) {
                switch (type) {
                    case 'EUP_APPEND_COMP':
                        console.log('msg data: ', data);
                        appendDemoComponent(h(PlaygroundCompWrap, data));
                        // appendDemoComponent(h(PlaygroundCompWrap, {
                        //     id: data.id,
                        //     originCompProps: data.props,
                        //     originCompStates: data.state,
                        // }));
                        break;
                    case 'EUP_META_KEY_ACTION':
                        local.setProps({
                            metaKeyPressed: data.metaKeyPressed
                        });
                        break;
                }
            }
            
        });
    }

    registerMetaKeyListener = () => {
        const {local} = this;
        const triggerMetaKeyPressed = (evt, target) => {
            if (evt.key === 'Meta') {
                local.setProps({
                    metaKeyPressed: target
                });
            }
        };
        
        if (!window._eupKeyListenerRegistered) {
            window.addEventListener('keydown', event => {
                triggerMetaKeyPressed(event, true);
            });
            window.addEventListener('keyup', event => {
                triggerMetaKeyPressed(event, false);
            });
            window._eupKeyListenerRegistered = true;
        }
    }

    // 从其它应用切换至浏览器时, 移除焦点, 聚焦自身
    registerBodyMouseEnterListener = () => {
        const {local} = this;
        window.document.body.addEventListener('mouseenter', event => {
            window.focus();
        });
        // TODO:
        // window.document.body.addEventListener('mouseout', event => {
        //     local.setProps({
        //         metaKeyPressed: false
        //     });
        // });
    }

 

    registerResizeListener = () => {
        const {local} = this;
        const getPlaygroundSize = () => {
            const playgroundDOM = document.querySelector('.playground-wrap .playground');
            if (playgroundDOM) {
                const {
                    width,
                    height
                } = document.defaultView.getComputedStyle(playgroundDOM);
                local.setProps({
                    playgroundWidth: parseInt(width, 10),
                    playgroundHeight: parseInt(height, 10),
                });
            }
        };
        window.addEventListener('resize', event => {
            getPlaygroundSize();
        });
        getPlaygroundSize();
    }

    renderControlPanelDrawerTrigger = () => {
        return h(
            Card,
            'top-actions-drawer-trigger', 
            {
                // raised: true,
                onMouseOver: () => {
                    this.local.triggerControlPanelDrawer(true);
                    this.local.triggerDemoDrawer(false);
                    this.local.setProps({
                        componentInEditId: ''
                    });
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
                // raised: true,
                onMouseOver: () => {
                    this.local.triggerDemoDrawer(true);
                    this.local.triggerControlPanelDrawer(false);
                    this.local.setProps({
                        componentInEditId: ''
                    });
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
                demoPageWidth: local.demoPageWidth,
                triggerDemoDrawer: local.triggerDemoDrawer
            }),
            this.renderDemoDrawerTrigger(),
            h(PlaygroundView, {
                playgroundWidth: local.playgroundWidth,
                playgroundHeight: local.playgroundHeight,
                componentsUsed: local.componentsUsed,
                demoPageWidth: local.demoPageWidth,
                showDemoPageDrawer: local.showDemoPageDrawer,
                triggerDemoDrawer: local.triggerDemoDrawer,
                triggerControlPanelDrawer: local.triggerControlPanelDrawer,
            }),
            h(AttrEditorView, {
                componentInEdit: local.componentInEdit,
            }),
            h(ControlPanelView, {
                showControlPanelDrawer: local.showControlPanelDrawer,
                triggerControlPanelDrawer: local.triggerControlPanelDrawer
            }),
            this.renderControlPanelDrawerTrigger(),
        );
    }
}
