import {pcNormalUrlUtils} from 'frontend/utils/url-utils/pc-normal-url-utils';
import {Message} from 'frontend/wrapper/erp-pc';

const alertErrorPromiseDecorator = promise => promise.then(
    resp => {
        if (resp.status === 'fail') {
            Message.error(resp.message);
        }

        return resp;
    }
);

export const pcNormalAgentTheme = {
    urlTransformers: [
        pcNormalUrlUtils.getApiLink
    ],
    promiseDecorators: [alertErrorPromiseDecorator]
};

export const erp8070TestAgentTheme = {
    header: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
};
