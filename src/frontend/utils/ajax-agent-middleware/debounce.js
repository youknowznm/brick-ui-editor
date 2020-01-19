/**
 * @file debounce
 * @author imcuttle <moyuyc95@gmail.com>
 * @date 2018/11/15
 *
 */

export default function debounce(fn) {
    let lastRequest;
    let lastRequestUrl;
    let pending = false;

    function fetchBufferFn(method, url, options) {
        if (options && options.fetchBuffer === false) {
            return fn(method, url, options);
        }

        // 访问相同接口且上次请求pending状态则abort
        if (pending && url === lastRequestUrl) {
            lastRequest.cancel && lastRequest.cancel();
        }

        lastRequestUrl = url;
        lastRequest = fn(method, url, options).finally(() => {
            pending = false;
        });
        pending = true;
        return lastRequest;
    }
    return fetchBufferFn;
}
