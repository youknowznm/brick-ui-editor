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
                onMouseEnter() {
                    
                }
            },
            h(
                Draggable,
                {
                    handle: '.action-wrap'
                },
                h.div('', {},
                    React.createElement(
                        ERPCompsButton,
                        Object.assign({}, toJS(this.props.originCompProps), {
                            ref: this.createRef
                        }),
                    ),
                    h.div('action-wrap', {})
                )
            ),
        );
    }
};