/**
 * @file toastError
 * @author imcuttle <moyuyc95@gmail.com>
 * @date 2018/11/15
 *
 */
import {isPlainObject} from 'lodash';

export default function needLogin({getLoginUrl = () => window.LOGIN_URL} = {}) {
    return function toast(ajax) {
        return function (method, url, opts = {}, ...argv) {
            /* eslint-disable prefer-rest-params */
            const promise = ajax.apply(ajax, arguments);
            return promise.then(res => {
                if (!isPlainObject(res)) {
                    return res;
                }
                const {status} = res;

                let loginUrlStr = getLoginUrl();
                if (status === 'need-login' && loginUrlStr) {
                    // 不带有 hash，因为后台不支持
                    window.location.href = loginUrlStr + encodeURIComponent(location.origin + location.pathname);
                }

                return res;
            });
        };
    };
}
