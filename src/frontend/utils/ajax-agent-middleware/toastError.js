/**
 * @file toastError
 * @author imcuttle <moyuyc95@gmail.com>
 * @date 2018/11/15
 *
 */
import {error} from '@befe/erp-comps/v2/components/Message/index';
import {isPlainObject} from 'lodash';

export default function toast(ajax) {
    return function (method, url, opts = {}, ...argv) {
        opts = Object.assign(
            {
                toastError: true
            },
            opts
        );

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
                status !== 'ok'
                && !['need-login', 'response-empty', 'response-invalid-json'].includes(status)
                && opts.toastError
            ) {
                if (message) {
                    error(message);
                }

                if (errors) {
                    for (const errorItem in errors) {
                        if (errors.hasOwnProperty(errorItem)) {
                            error(errorItem + errors[errorItem]);
                        }

                    }
                }
            }

            return res;
        });
    };
}
