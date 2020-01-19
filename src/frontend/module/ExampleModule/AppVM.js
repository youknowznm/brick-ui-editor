/**
 * @file mainModule app 顶层状态, 本类会用来包含一些关键的 app 状态
 *                      以及 injectKey 注入进来的 page / layout 的 VM 实例
 * @author lzheng
 * @date 2018-10-18
 */

import {
    BaseModel,
    BaseAppView,
    bindView,
    observable,
    action
} from '@befe/utils/dev-pattern-vm/index-pc-normal';
// import {CommonLayoutModel} from 'frontend/layout/CommonLayoutVM';
import {baseERPLayoutModelInstance} from 'frontend/layout/ERPLayoutVM/ERPLayoutModel';
import {MODULE_EXAMPLE} from './site-map';

@bindView(BaseAppView)
class AppState extends BaseModel {

    // ============= 常量定义 =============
    moduleClassName = 'example-module-wrapper';

    // ============= 类成员变量定义 =============
    layoutModel;

    // ============= 类 getter 定义 =============

    // ============= 类 setter 定义 =============

    // ============= UI handlers =============

    // ============= 类成员方法定义 =============

    // ============= 生命周期方法 =============

    constructor(initProps, syncProps) {
        super(undefined, syncProps);
        this.setProps(initProps);
        // this.layoutModel = new CommonLayoutModel();
        this.layoutModel = baseERPLayoutModelInstance;
    }

    updateCurrentPage(props) {
        this.layoutModel.setCurrentPage(
            MODULE_EXAMPLE,
            props.location.pathname,
            props.location.query,
        );
    }

    prepare(props) {}

    init(props) {
        this.updateCurrentPage(props);
    }

    update(props) {
        this.updateCurrentPage(props);
    }
}

export default AppState;
