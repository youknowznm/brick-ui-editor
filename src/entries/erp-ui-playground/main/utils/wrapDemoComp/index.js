import * as React from 'react'
import {default as c} from 'classnames'
import {inject, observer} from 'mobx-react'
import {toJS, observable, action} from 'mobx'
import {findDOMNode} from 'react-dom';

import './style.scss';

const generateId = () => Math.random().toString(36).slice(2, 9);

const wrapDemoComp = OriginComponent => {

    @inject('root')
    @observer
    class ExtendedUIComponent extends React.Component {

        static displayName = `${OriginComponent.displayName}PlaygroundWrap`;

        ref = null;

        state = {
            ownState: null,
            ownProps: null,
            width: '0px',
            height: '0px',
            display: '0px',
        }

        static propTypes = {
            // OriginComponent:
        }

        createRef = reactElem => {
            this.ref = reactElem;
            const wrapDOM = findDOMNode(this.ref);
            if (wrapDOM) {
                const computedStyle = document.defaultView.getComputedStyle(wrapDOM);
                const ownProps = Object.assign({}, reactElem.props);
                for (let key in ownProps) {
                    if (ownProps.hasOwnProperty(key)) {
                        if (typeof ownProps[key] === 'function') {
                            // console.log(1111, React.isValidElement(ownProps[key]()))
                            console.log('func name', (ownProps[key].name))
                            // console.log(2222, (ownProps[key]()))
                            delete ownProps[key];
                            // ownProps[key] = ownProps[key].toString();
                        }
                    }
                }
                delete ownProps.root;
                this.setState({
                    ownState: reactElem.state,
                    ownProps,
                    width: computedStyle.width,
                    height: computedStyle.height
                });
            }

        }

        dispatchCompToUse = () => {
            this.props.root.pushUsedCompData({
                id: generateId(),
                originDisplayName: OriginComponent.displayName,
                originCompProps: this.state.ownProps,
                originCompState: this.state.ownState,
            })
        }


        render() {
            const {state, props} = this;
            const {
                width,
                height
            } = state;

            const extProps = Object.assign({}, toJS(this.props), {
                ref: this.createRef
            });

            return <div
                className={c(
                    'extend-ui-comp-wrap',
                    props.root.metaKeyPressing && 'meta-key-pressed'
                )}
                style={{
                    width,
                    height
                }}>
                    <OriginComponent {...extProps}>
                        {props.children}
                    </OriginComponent>
                    <div
                        className="action-layer"
                        onClick={() => {
                            this.dispatchCompToUse();
                        }}
                    >
                    </div>
            </div>;
        }
    }

    return ExtendedUIComponent;
};

export default wrapDemoComp;
