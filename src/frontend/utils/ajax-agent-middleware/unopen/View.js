/**
 * @file View
 * @author imcuttle <moyuyc95@gmail.com>
 * @date 13/12/2018
 *
 */
import {
    h,
    suh
} from '@befe/utils/dev-pattern-vm/index-pc-normal';
import * as React from 'react';
import * as PropTypes from 'prop-types';

@suh(require('./style.use.less'))
export default class View extends React.Component {
    static propTypes = {}
    static defaultProps = {}

    render() {
        return h.div('ajax-unopen-wrapper', {},
            h.div('ajax-unopen-img'),
            h.div('ajax-unopen-text', {}, _i('ajax.unopen.text'))
        );
    }
}
