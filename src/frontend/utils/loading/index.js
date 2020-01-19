/**
 * @file loading
 * @author imcuttle <moyuyc95@gmail.com>
 * @date 2018/11/16
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import {h, suh, c, observer} from '@befe/utils/dev-pattern-vm/index-pc-normal';
import toClass from '@rcp/util.tocompclass';
import displayName from '@rcp/util.displayname';
import Loading from './LoadingComp';


export default function hoc(
    LoadingComponent = ({className, isLoading, ...props}) => h(Loading, props),
    {timeout = 1000, withDelayFirstly = false, vm = false, className} = {}
) {
    return function loading(Component) {
        Component = toClass(Component);

        const key = '__loadingHoc__';

        @suh(require('./style.use.less'))
        class LoadingHoc extends Component {
            constructor(props, context) {
                super(props, context);
                Object.defineProperty(this, key, {
                    value: {
                        timer: null,
                        hide: !!timeout,
                        register: () => {
                            if (timeout) {
                                this[key].hide = true;
                                this[key].kill();
                                this[key].timer = setTimeout(() => {
                                    this[key].timer = null;
                                    this[key].hide = false;
                                    this.forceUpdate();
                                }, timeout);
                            }
                        },
                        kill: () => {
                            clearTimeout(this[key].timer);
                            this[key].timer = null;
                        }
                    },
                    enumerable: false
                });
            }

            static displayName = displayName(Component);
            static propTypes = {
                ...Component.propTypes,
                loadingClassName: PropTypes.string
            };

            componentWillMount(...arg) {
                if (withDelayFirstly) {
                    this[key].register();
                }
                else {
                    this[key].hide = false;
                }

                // if (vm) {
                //     this[key].reactionManager.reaction(() => this.local.isLoading, () => {
                //         this.local.isLoading && this[key].register();
                //     })
                // }

                if (super.componentWillMount) {
                    return super.componentWillMount(...arg);
                }
            }

            componentWillReceiveProps(...argv) {
                const [newProps] = argv;

                if (!vm) {
                    if (newProps.isLoading && !this[key].timer) {
                        this[key].register();
                    }
                }
                else {
                    if (newProps.local.isLoading && !this[key].timer) {
                        this[key].register();
                    }
                }

                if (super.componentWillReceiveProps) {
                    return super.componentWillReceiveProps(...argv);
                }
            }

            componentWillUnmount(...arg) {
                this[key].kill();
                if (super.componentWillUnmount) {
                    return super.componentWillUnmount(...arg);
                }
            }

            render() {
                const isLoading = vm ? this.local.isLoading : this.props.isLoading;
                if (!this[key].hide && isLoading) {
                    const elem = super.render();
                    return h.div(
                        c('loading-hoc-wrapper', this.props.loadingClassName, className),
                        {},
                        elem,
                        h.div('loading-hoc-mask'),
                        h.div('loading-hoc-main', {}, h(LoadingComponent))
                    );
                }

                return super.render();
            }
        }

        return LoadingHoc;
    };
}
