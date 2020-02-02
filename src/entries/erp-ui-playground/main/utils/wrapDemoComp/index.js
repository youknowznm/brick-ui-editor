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
            wrapWidth: 0,
            wrapHeight: 0,
        }

        static propTypes = {
        }

        createRef = reactElem => {
            this.ref = reactElem;
            let wrapDOM = findDOMNode(this.ref);
            // wrapDOM = wrapDOM.querySelector('a')
            if (wrapDOM) {
                setTimeout(() => {
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
                        wrapWidth: parseInt(computedStyle.width, 10),
                        wrapHeight: parseInt(computedStyle.height, 10)
                    });
                })

            }
        }

        dispatchCompToUse = () => {
            this.props.root.pushUsedCompData({
                id: generateId(),
                originName: OriginComponent.displayName,
                originProps: this.state.ownProps,
                wrapWidth: this.state.wrapWidth,
                wrapHeight: this.state.wrapHeight,
                deltaX: 100,
                deltaY: 100,
            })
        }

        render() {
            const {state, props} = this;
            const {
                wrapWidth,
                wrapHeight
            } = state;
            return <div
                className={c(
                    'demo-comp-wrap',
                    props.root.metaKeyPressing && 'meta-key-pressed'
                )}
                style={{
                    width: wrapWidth,
                    height: wrapHeight
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
