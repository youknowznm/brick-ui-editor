/**
 * @file: Avatar 状态对象
 * @author: yaozhiqiu
 * @date: 2018-11-16
 * @description: Avatar 的状态入口页面
 */
import * as React from 'react';
import PropTypes from 'prop-types';
import {
    h,
    c,
    suh
} from '@befe/utils/dev-pattern-vm/index-pc-normal';

@suh(require('./style.use.less'))
export default class Loading extends React.Component {
    static propTypes = {
        className: PropTypes.string
    }
    static defaultProps = {
    }

    render() {
        const {
            className,
            // ...props
        } = this.props;
        return h.div(c(className, 'okr-loading-wrapper'), {},
            h.div('loading-main')
        );
    }
}
