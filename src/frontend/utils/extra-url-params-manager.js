/**
 * @todo: 待重构
 */
import urlUtils from './url-utils';

let extraUrlsQuery;

export default {
    init() {
        const urlDetail = urlUtils.parseUrl();
        extraUrlsQuery = urlDetail.query;

        // @todo:future 使用 session cookie 进行控制? 这样的话, 其实有很大一批东西可以优化... hmmm...
        if (extraUrlsQuery.bpEbsRespId && extraUrlsQuery.bpEbsSecGroupId) {
            document.cookie = `contract_management_bpEbsRespId=${extraUrlsQuery.bpEbsRespId};path=/`;
            document.cookie = `contract_management_bpEbsSecGroupId=${extraUrlsQuery.bpEbsSecGroupId};path=/`;
        }

    },

    isUndefined(value) {
        return typeof value === 'undefined';
    },

    checkIfShouldReload() {
        const urlDetail = urlUtils.parseUrl();
        if (!extraUrlsQuery) {
            return false;
        }

        if (
            !this.isUndefined(urlDetail.query.bpEbsRespId)
            && this.isUndefined(extraUrlsQuery.bpEbsRespId)
        ) {
            window.location.reload();
            return true;
        }

        return false;
    },

    injectAjaxAgentOptions(options = {}) {
        options.header = options.header || {};

        options.header.bpEbsRespId = parseInt(extraUrlsQuery.bpEbsRespId, 10);
        options.header.bpEbsSecGroupId = parseInt(extraUrlsQuery.bpEbsSecGroupId, 10);
        return options;
    }
};
