/**
 * @file url-pattern
 * @author imcuttle <moyuyc95@gmail.com>
 * @date 2019/4/6
 * $END$
 */
import UrlPattern from 'url-pattern';
import {omit, pick} from 'lodash';

export default ajax => {
    return function (method, url, opts = {}, ...argv) {
        opts = Object.assign(
            {
                urlPattern: true
            },
            opts
        );

        if (opts.urlPattern && url) {
            const pattern = new UrlPattern(url);
            if (pattern.names && pattern.names.length) {
                url = pattern.stringify(opts.data);
                opts.data = omit(opts.data, pattern.names);
            }
        }

        return ajax.apply(ajax, [method, url, opts].concat(argv));
    };
};
