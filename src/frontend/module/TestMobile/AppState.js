/**
 * @file TestMobile app 顶层状态, 本类会用来包含一些关键的 app 状态
 *                      以及 injectKey 注入进来的 page / layout 的 VM 实例
 * @author lzheng
 * @date 2018-08-02
 */

import {
    BaseModel,
    bindView as bind,
    observable,
    action,
    BaseAppView
} from '@befe/utils/dev-pattern-vm/index-mobile';
import {layoutModelInstance} from 'frontend/layout/MobileLayoutVM/layoutModel';

import {PAGE_CONFIG} from './site-map';

@bind(BaseAppView)
class AppState extends BaseModel {
    moduleClassName = 'mobile-module-wrapper';

    // 页面的配置信息, 此处配置信息对应layoutModelInstance配置中
    pageConfig = {
        ...PAGE_CONFIG
    };

    @observable layoutModel;

    constructor(initProps, syncProps) {
        super(initProps, syncProps);
    }

    @action
    setPageConfig(props) {
        const pagePath = props.location.pathname;
        const pathName = pagePath.replace(/(^\/!*)|(\/!*$)/g, '');
        const currentPageNode = pathName ? {
            pathName,
            ...this.pageConfig[pathName]
        } : {};

        this.layoutModel.setCurrentPageNode(currentPageNode);
    }

    @action
    prepare(props) {
        this.layoutModel = layoutModelInstance;
        this.setPageConfig(props);
    }

    @action
    init(props) {
        // this.setPageConfig(props);
    }

    @action
    update(nextProps) {
        this.setPageConfig(nextProps);
    }

}

export default AppState;
