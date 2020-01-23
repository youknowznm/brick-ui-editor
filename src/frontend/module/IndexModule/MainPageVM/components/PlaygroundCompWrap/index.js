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
        isEditing: false,
        width: '0px',
        height: '0px',

        id: '',
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
        this.setState({
            id: this.props.id
        });
    }

    render() {
        const {props, state} = this;
        return h.div(
            c(
                'playground-comp-wrap',
                props.app.root.metaKeyPressed && 'meta-key-pressed'
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
                    handle: '.action-wrap'
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
                                this.setState({
                                    isEditing: true
                                });
                                props.app.root.setEditingComponentId(props.id);
                                console.log(35, props.id);
                                
                            }
                        },
                        h.span(
                            'text',
                            {},
                            '选择'
                        )
                    )
                )
            ),
        );
    }
};