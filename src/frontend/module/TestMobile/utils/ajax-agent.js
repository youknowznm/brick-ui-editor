/**
 * @file -- mobile 的agent
 * @author meijingjing
 * @description 可以在此文件中添加一些公共处理
 */

/*import agent from 'frontend/utils/ajax-agent';

export default agent;*/

import agent from '@befe/utils/lib/ajax-agent';
import {toast} from '../../../componentMobile/utils';

// 可以在这里扩展你的 agent, 加入 defaultGenericHandlers
const genericSuccessHandler = response => {
    return response;
};

const genericErrorHandler = response => {
    return response;
};

agent.post = function (url, options = {}) {
    options.genericSuccessHandler = genericSuccessHandler;
    options.genericErrorHandler = genericErrorHandler;

    return agent('post', url, options).then(res => {
        if (res.code !== 200 && options.popErrorMassage) {
            toast({
                message: res.message
            });
        }
        return res;
    });
};

agent.get = function (url, options = {}) {
    options.genericSuccessHandler = genericSuccessHandler;
    options.genericErrorHandler = genericErrorHandler;

    return agent('get', url, {
        data: {
            v: +new Date()
        },
        ...options
    }).then(res => {
        if (res.code !== 200 && options.popErrorMassage) {
            alert({
                massage: res.massage
            });
        }
        return res;
    });
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
