/**
 * @file toastError
 * @author imcuttle <moyuyc95@gmail.com>
 * @date 2018/11/15
 *
 */
import {
    h,
    React
} from '@befe/utils/dev-pattern-vm/index-pc-normal';
import ReactDOM from 'react-dom';
import {isPlainObject} from 'lodash';

import View from './View';

export default function unopen(ajax) {
    return function (method, url, opts = {}, ...argv) {

        /* eslint-disable prefer-rest-params */
        const promise = ajax.apply(ajax, arguments);
        return promise.then(res => {
            if (!isPlainObject(res)) {
                return res;
            }

            const {
                status,
                data,
                message,
                errors
            } = res;
            if (
                status === 'unopen'
            ) {
                ReactDOM.render(
                    h(View),
                    document.getElementById('root')
                );
            }

            return res;
        });
    };
}
