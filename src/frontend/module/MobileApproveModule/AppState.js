/**
 * @file MobileApproveModuleModule app 顶层状态, 本类会用来包含一些关键的 app 状态
 *                      以及 injectKey 注入进来的 page / layout 的 VM 实例
 * @author lzheng
 * @date 2018-08-02
 */

import {
    BaseModel,
    bindView as bind,
    observable
} from '@befe/utils/dev-pattern-vm/index-mobile';

import AppView from './AppView';

import MainApprovePage from './MainApprovePageVM';

@bind(AppView)
class AppState extends BaseModel {
    moduleClassName = 'mobile-approve-module-wrapper';

    pageComp;

    constructor(...args) {
        super(args);

        this.pageComp = new MainApprovePage();
    }
}

export default AppState;
