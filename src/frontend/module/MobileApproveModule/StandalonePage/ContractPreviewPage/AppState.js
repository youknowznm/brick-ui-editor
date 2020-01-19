/**
 * @file MobileApproveModuleModule app 顶层状态, 本类会用来包含一些关键的 app 状态
 *                      以及 injectKey 注入进来的 page / layout 的 VM 实例
 * @author lzheng
 * @date 2018-08-02
 */

import {
    BaseModel,
    bindView as bind,
    observable,
    action
} from '@befe/utils/dev-pattern-vm/index-mobile';

import {
    urlUtils,
    mobileApprovalUtils
} from '../../../../wrapper/mobile';

import AppView from './AppView';

/**
 * @def: PageVM
 *  url: (text, limit)
 *      text: string
 *      limit: string | undefined (50)
 */

@bind(AppView)
class AppState extends BaseModel {
    moduleClassName = 'contract-preview';

    @action
    handleTextChange = e => {
        this.text = e.target.value;
    };

    /**
     * @def: {}
     *  bmpProxyUrl: string
     *  paramStr: string
     */
    query;

    getPreviewUrl() {
        return mobileApprovalUtils.getProxyAbsoluteUrl('/empInfo/show?' + this.query.paramStr);
    }

    constructor(...args) {
        super(args);

        let search = window.location.search;
        if (/^\??url=/.test(search)) {
            search = search
                .replace(
                    /^\??url=[^?]+/, ''
            );
        }

        this.query = urlUtils.parseQuery(search);

        console.log(this.getPreviewUrl());
    }
}

export default AppState;
