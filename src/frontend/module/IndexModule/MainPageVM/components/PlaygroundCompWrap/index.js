import {
    React,
    h,
    c,
    inject,
    toJS,
    suh,
    observable,
    observer,
    action
} from '@befe/utils/dev-pattern-vm/index-pc-normal';
import {findDOMNode} from 'react-dom';
import Button from '@material-ui/core/Button';

import Draggable from 'react-draggable';

import compStyle from './style.use.less';

import ERPCompsButton from '@befe/erp-comps/v2/components/Button';

@inject('app')
@observer
@suh(compStyle)
export default class PlaygroundCompWrap extends React.Component {

    // static displayName = `${OriginComponent.displayName}PlaygroundWrap`;

    ref = null;

    state = {
        // ownState: null,
        // ownProps: null,
        width: '0px',
        height: '0px',
        // display: '0px'
    }

    static propTypes = {
        // metaKeyPressed:
        // originCompDisplayName:
        // originCompProps:
        // id:
    }

    createRef = reactElem => {
        this.ref = reactElem;
        const wrapDOM = findDOMNode(this.ref);
        if (wrapDOM) {
            const computedStyle = document.defaultView.getComputedStyle(wrapDOM);
            this.setState({
                width: computedStyle.width,
                height: computedStyle.height
            });
        }
    }

    componentDidMount() {
    }

    render() {
        const {props, state} = this;
        const {root} = props.app;
        // 被编辑 id 非空, 并且与当前组件 id 不等时, 认为其它组件在被编辑, 而当前组件应禁止交互
        const notInEdit = root.componentInEditId !== '' && root.componentInEditId !== props.id;
        return h.div(
            c(
                'playground-comp-wrap',
                root.metaKeyPressed && 'meta-key-pressed',
                notInEdit && 'not-in-edit'
            ), 
            {
                style: {
                    width: state.width,
                    height: state.height
                },
            },
            h(
                Draggable,
                {
                    handle: '.action-wrap',
                    onStop() {
                        console.log('stopd');
                        
                        root.setProps({
                            componentInEditId: ''
                        });
                    }
                },
                // TODO: fragment
                h.div('', {},
                    React.createElement(
                        ERPCompsButton,
                        Object.assign({}, toJS(this.props.originCompProps), {
                            ref: this.createRef
                        }),
                    ),
                    h.div(
                        'action-wrap',
                        {
                            onClick: () => {
                                root.setEditingComponentId(props.id);
                                root.triggerDemoDrawer(false);
                                root.triggerControlPanelDrawer(false);
                            }
                        },
                        h.span(
                            'text',
                            {},
                            '选择'
                        )
                    ),
                )
            ),
        );
    }
};