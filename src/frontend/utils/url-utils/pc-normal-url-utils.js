import {buildUrlUtils} from '@befe/utils/dev-pattern-vm/utils/UrlUtils2';

let CONTEXT = window.WEB_CONTEXT;
let API_CONTEXT = window.API_CONTEXT;

export const pcNormalUrlUtils = buildUrlUtils(CONTEXT, {
    apiContext: API_CONTEXT
});
