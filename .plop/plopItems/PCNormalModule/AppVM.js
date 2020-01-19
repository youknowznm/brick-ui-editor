/**
 * @file {{moduleName}} app 顶层状态, 本类会用来包含一些关键的 app 状态
 *                      以及 injectKey 注入进来的 page / layout 的 VM 实例
 * @author {{userName}}
 * @date {{today}}
 */

import {
    BaseModel,
    BaseAppView,
    bindView,
    observable,
    action,
} from '@befe/utils/dev-pattern-vm/index-pc-normal';
import {baseERPLayoutModelInstance} from 'frontend/layout/ERPLayoutVM/ERPLayoutModel';
import {
    /*{{moduleNameConst}}*//*skip*/MODULE_NAME/*skip*/
} from './site-map';

@bindView(BaseAppView)
class AppVM extends BaseModel {

    // ============= 常量定义 =============
    /*plop
    moduleClassName = '{{moduleCSSWrapper}}';
    plop*//*skip*/moduleClassName = 'module-wrapper';/*skip*/

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
        this.layoutModel = baseERPLayoutModelInstance;
    }

    updateCurrentPage(props) {
        this.layoutModel.setCurrentPage(
            /*{{moduleNameConst}}*//*skip*/MODULE_NAME/*skip*/,
            props.location.pathname,
            props.location.query,
        );
    }

    init(props) {
        this.updateCurrentPage(props);
    }

    update(props) {
        this.updateCurrentPage(props);
    }
}

export default AppVM;
