/**
 * @file IndexModule app 顶层状态, 本类会用来包含一些关键的 app 状态
 *                      以及 injectKey 注入进来的 page / layout 的 VM 实例
 * @author zhangenming
 */

import {
    BaseModel,
    BaseAppView,
    bindView as bind,
    observable,
    action
} from '@befe/utils/dev-pattern-vm/index-pc-normal';

@bind(BaseAppView)
class AppState extends BaseModel {

    moduleClassName = '';

    constructor(initProps, syncProps) {
        super(initProps, syncProps);

        this.initProps();
    }

    @action
    initProps() {
        // this.layoutModel = oieERPLayoutModelInstance;
    }

    @action
    init(props) {
    }

    @action
    update(props) {
    }
}

export default AppState;
