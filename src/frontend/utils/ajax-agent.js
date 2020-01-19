/**
 * @file --
 * @author zhengliangliang
 */

import originAgent from '@befe/utils/dev-pattern-vm/utils/ajaxAgent2';
import extraUrlParamsManager from './extra-url-params-manager';
import toastError from './ajax-agent-middleware/toastError';
import debounce from './ajax-agent-middleware/debounce';
import needLogin from './ajax-agent-middleware/needLogin';
import unopen from './ajax-agent-middleware/unopen/index';
import urlPattern from './ajax-agent-middleware/url-pattern';

extraUrlParamsManager.init();

function use(origin, fn) {
    if (Array.isArray(fn)) {
        return fn.reduce((curr, fn) => {
            return use(curr, fn);
        }, origin);
    }

    return Object.assign(fn(origin), origin);
}

const agent = use(originAgent, [urlPattern, unopen, needLogin(), debounce, toastError]);

// 可以在这里扩展你的 agent, 加入 defaultGenericHandlers
const genericSuccessHandler = response => {
    return response;
};

const genericErrorHandler = () => {
};


agent.post = function (url, options = {}) {
    options.genericSuccessHandler = genericSuccessHandler;
    options.genericErrorHandler = genericErrorHandler;

    options = extraUrlParamsManager.injectAjaxAgentOptions(options);

    return agent('post', url, options);
};

agent.get = function (url, options = {}) {
    options.genericSuccessHandler = genericSuccessHandler;
    options.genericErrorHandler = genericErrorHandler;

    options = extraUrlParamsManager.injectAjaxAgentOptions(options);

    return agent('get', url, options);
};

// 本方法给 matriks 开发使用

/* globals __DEVELOPMENT__ */
if (__DEVELOPMENT__) {
    agent.devPost = function (url, options = {}) {
        options.isRawUrl = true;
        url = '/_/matriks/api' + url;
        return agent('post', url, options);
    };
}

export default agent;
