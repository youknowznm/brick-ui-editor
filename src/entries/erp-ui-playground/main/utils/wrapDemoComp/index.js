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
            ownProps: null,
            width: '0px',
            height: '0px',
            display: '0px',
        }

        static propTypes = {
        }

        createRef = reactElem => {
            this.ref = reactElem;
            const wrapDOM = findDOMNode(this.ref);
            if (wrapDOM) {
                const computedStyle = document.defaultView.getComputedStyle(wrapDOM);
                const ownProps = Object.assign({}, reactElem.props);
                for (let propKey in ownProps) {
                    if (ownProps.hasOwnProperty(propKey)) {
                        const propValue = ownProps[propKey]
                        if (typeof propValue === 'function') {
                            const isReactElement = React.isValidElement(propValue())
                            if (isReactElement) {
                                ownProps[propKey] = propValue.name
                            } else {
                                delete ownProps[propKey];
                            }
                        }
                    }
                }
                delete ownProps.root;
                delete ownProps.className;
                this.setState({
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
                // ...this.state.ownProps
            })
        }

        render() {
            const {state, props} = this;
            const {
                width,
                height
            } = state;
            return <div
                className={c(
                    'extend-ui-comp-wrap',
                    props.root.metaKeyPressing && 'meta-key-pressed'
                )}
                style={{
                    width,
                    height
                }}>
                    <OriginComponent
                        {...this.props}
                        ref={this.createRef}
                    >
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
