
// url utils 请修改为正确的 url utils
import {pcNormalUrlUtils} from "../../utils/url-utils/pc-normal";

const alertErrorPromiseDecorator =
    promise => promise.then(
        resp => {
            if (resp.status === 'fail') {
                alert(`error message: ${resp.message}`)
            }
            return resp;
        }
    );

export const agentTheme = {
    // @def: {key: value}
    header: void 0,

    // @def: [ data => newData ]
    preDataHandlers: [],

    // @def [ extraParams => newExtraParams ]
    preExtraParamHandlers: [],

    // @def: [ url => newUrl ]
    urlTransformers: [
        pcNormalUrlUtils.getApiLink
    ],

    // @def: [ requestHandler => requestHandler ]
    requestHandlerDecorators: [],

    // @def: resp => resp
    genericSuccessHandler: void 0,

    // @def: error => undefined
    genericErrorHandler: void 0,

    // @def: [ promise => promise ]
    promiseDecorators: [alertErrorPromiseDecorator],

    // @def: [ responseData => newResponseData ]
    postDataHandlers: [],

    // boolean
    useCache: false,

    // boolean
    isJSON: true,
};

