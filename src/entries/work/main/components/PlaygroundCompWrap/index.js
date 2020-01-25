import * as React from 'react';
import {c} from 'classnames';
import {toJS, computed, observable, action} from 'mobx';
import {observer} from 'mobx-react';

import {findDOMNode} from 'react-dom';
import Button from '@material-ui/core/Button';

import Draggable from 'react-draggable';

import './style.scss';

import {Button as BrickButton} from '@befe/brick' 
// import {Button as BrickButton} from '../../../../../../../node_modules/@befe/brick' 

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
        // metaKeyPressing:
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
        // // 被编辑 id 非空, 并且与当前组件 id 不等时, 认为其它组件在被编辑, 而当前组件应禁止交互
        // const selected = root.componentInEditId !== '' && root.componentInEditId !== props.id;
        const selected = root.componentInEditId === props.id;
        return h.div(
            c(
                'playground-comp-wrap',
                root.metaKeyPressing && 'meta-key-pressed',
                selected && 'selected'
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
                    handle: '.action-layer',
                    onStop() {
                        console.log('stopd');
                        root.setProps({
                            componentInEditId: ''
                        });
                    }
                },
                h.div('', {},
                    React.createElement(
                        BrickButton,
                        Object.assign({}, toJS(this.props.originCompProps), {
                            ref: this.createRef
                        }),
                    ),
                    h.div(
                        'action-layer',
                        {
                            onClick: () => {
                                root.setEditingComponentId(props.id);
                                root.triggerDemoDrawer(false);
                                root.triggerControlPanelDrawer(false);
                            }
                        },
                        // h.span(
                        //     'text',
                        //     {},
                        //     '选择'
                        // )
                    ),
                    h.div(
                        'selected-layer',
                        {
                            // onClick: () => {
                            //     root.setEditingComponentId(props.id);
                            //     root.triggerDemoDrawer(false);
                            //     root.triggerControlPanelDrawer(false);
                            // }
                        },
                        h.span(
                            'text',
                            {},
                            ''
                        ),
                        h.span('spot tl'),
                        h.span('spot tr'),
                        h.span('spot br'),
                        h.span('spot bl'),
                    ),
                )
            ),
        );
    }
};