/**
 * @file 入口页面
 * @author ztc01
 */
import React, {Component, createRef} from 'react';
import {observer} from 'mobx-react';
import PropTypes from 'prop-types';
import {h, c} from '@befe/utils/wrapper/erp';
import {isCallable} from '@befe/erp-comps/v2/common/utils';
import compStyle from './style.use.less';
import getLocaleText from '@befe/erp-comps/v2/components/TextArea/locale';
import getCaretCoordinates from 'textarea-caret';
import uncontrolled from '@rcp/hoc.uncontrolled';
import Tip from '@befe/erp-comps/v2/components/Tip';
import Icon from '@befe/erp-comps/v2/components/Icon';

@uncontrolled(['value'])
export default class TextareaNoScroll extends Component {
    static propTypes = {
        className: PropTypes.string,
        disabled: PropTypes.string,
        value: PropTypes.string,
        defaultValue: PropTypes.string,
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        inputRef: PropTypes.func,
        maxLength: PropTypes.number, // 字数长度
        shouldHideLimitReset: PropTypes.bool, // 隐藏字数
        overflowText: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
    };
    static defaultProps = {
        classPrefix: 'comp',
        className: '',
        defaultValue: '',
        disabled: '',
        placeholder: '',
        shouldHideLimitReset: true
    };

    componentWillMount() {
        compStyle.use();
    }

    constructor(props) {
        super(props);
        this.bindRef = this.bindRef.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.resize = this.resize.bind(this);
        this._tipTrigger = createRef();
    }

    componentDidMount() {
        this.resize();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.value !== this.state.value) {
            this.renderPopover();
            this.resize();
        }
    }

    componentWillUnmount() {
        compStyle.unuse();
    }

    bindRef(ref) {
        this.inputRef = ref;
        if (this.props.inputRef) {
            this.props.inputRef(ref);
        }
    }

    state = {
        // value: ''
        tipContent: null,
        tipPos: {
            left: null,
            top: null
        }
    };

    runtime = {
        tipVisible: false,
        tipHasShown: false
    };

    @observer
    render() {
        const {
            className,
            disabled,
            placeholder,
            ...config
        } = this.props;
        const {
            value,
            tipPos,
            tipContent
        } = this.state;
        let showLimitNumber = config.maxLength && !config.shouldHideLimitReset;
        return h.div(
            'textarea-no-scroll-box',
            {},
            h.textarea(
                c(
                    {
                        [`${this.compClass}-overflow`]: this.limitRest < 0
                    },
                    'textarea-no-scroll',
                    className
                ),
                {
                    rows: 1,
                    ref: this.bindRef,
                    placeholder,
                    value,
                    disabled,
                    onChange: this.handleChange,
                    // ...config
                }
            ),
            h(
                Tip,
                {
                    type: 'note',
                    paddingType: 'narrow',
                    content: h.div(
                        'textarea-tip-content',
                        {},
                        h(Icon, {
                            name: 'message-alert-disc'
                        }),
                        h.span('tip-content', {}, tipContent)
                    ),
                    trigger: 'click'
                },
                h.span({
                    style: {
                        position: 'absolute',
                        top: tipPos.top,
                        left: tipPos.left
                    },
                    ref: this._tipTrigger
                })
            ),
            showLimitNumber && this.renderLimitReset()
        );
    }

    renderLimitReset() {
        const {maxLength} = this.props;
        return h.div(
            `${this.compClass}-limit-reset`,
            {},
            h.span('reset-number', {}, this.limitRest),
            h.span('limit-suffix', {}, ` ${maxLength || getLocaleText('limitSuffix')}`)
        );
    }

    get limitRest() {
        const {maxLength: limit} = this.props;
        const value = this.state.value;
        if (!limit) {
            return '';
        }

        return limit - (value || '').length;
    }

    renderPopover() {
        const {
            state,
            props,
            _tipTrigger,
            inputRef
        } = this;
        const {value} = state;
        const {overflowText, maxLength} = props;

        if (value.length < maxLength) {
            return;
        }

        let text = overflowText;
        if (typeof overflowText === 'function') {
            text = overflowText(value);
        }

        if (inputRef && text) {
            const coordinate = getCaretCoordinates(this.inputRef, this.inputRef.textLength);

            if (_tipTrigger && _tipTrigger.current) {
                this.setState({
                    tipPos: {
                        left: coordinate.left,
                        top: coordinate.top
                    },
                    tipContent: text
                });
                if (this.runtime.tipVisible && this.runtime.tipCouldBeHidden) {
                    _tipTrigger.current.click();
                    this.runtime.tipVisible = false;
                    return;
                }

                if (this.runtime.tipHasShown) {
                    return;
                }

                this.runtime.tipTimer = setTimeout(() => {
                    this.runtime.tipCouldBeHidden = true;
                }, 3000);

                this.runtime.tipVisible = !this.runtime.tipVisible;
                _tipTrigger.current.click();
                this.runtime.tipHasShown = true;
            }
        }
    }

    /**
     * change 事件
     * @param e
     */
    handleChange = e => {
        const {onChange} = this.props;
        if (isCallable(onChange)) {
            onChange(e);
        }
        else {
            this.setState({
                value: e.target.value
            });
        }
    };

    // 重新计算 textarea 的高度
    resize() {
        if (this.inputRef) {
            this.inputRef.style.height = 'auto';
            const realHeight = this.inputRef.scrollHeight;
            this.inputRef.style.height = realHeight + 'px';
        }
    }

    get compClass() {
        return `${this.props.classPrefix}-textarea`;
    }
}
