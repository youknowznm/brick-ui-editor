/**
 * @author zhangenming
 */

import {
    observable,
    action,
    toJS,
    computed,
    urlsync,
    BaseModel,
    h,
    bindView as bind,
    ReactionManager,
    setProps
} from '@befe/utils/dev-pattern-vm/index-pc-normal';

import View from './View';
import moment from 'moment';

import {
} from 'frontend/service/api/common-api';

@bind(View)
class IndexPageVM extends BaseModel {

    static injectKey = 'root';

    constructor(initData, syncConfig) {
        super(initData, syncConfig);
    }

    @action
    initProps() {}

    // ##### 全局 #####

    @observable loadingFlag = false;

    triggerLoading = bool => {
        this.setProps({
            loadingFlag: bool
        });
    }

    @observable frameWindowRef = null;

    @observable metaKeyPressed = false;

    // ##### 头部操作卡片 #####

    @observable showControlPanelDrawer = false;

    triggerControlPanelDrawer = target => {
        const result = typeof target === 'boolean' ? target : !this.showControlPanelDrawer;
        this.setProps({
            showControlPanelDrawer: result
        });
    }

    // ##### 左侧 demo 容器 #####

    @observable componentLibName = 'erp-comps';

    @observable demoPageSrc = 'http://localhost:18988/pages/ui-demo-shared.html#/button';
    @observable demoPageWidth = 1075;

    @observable showDemoPageDrawer = false;

    triggerDemoDrawer = target => {
        const result = typeof target === 'boolean' ? target : !this.showDemoPageDrawer;
        this.setProps({
            showDemoPageDrawer: result
        });
    }

    @observable componentsUsed = [];

    @action appendDemoComponent = comp => {
        this.componentsUsed.push(comp);
    }

    @observable componentInEditId = '';

    setEditingComponentId = id => {
        this.setProps({
            componentInEditId: id
        });
    }

    @computed get componentInEdit() {
        return this.componentsUsed.find(item => {
            return item.props.id === this.componentInEditId;
        }) || null;
    }

    // ##### 右侧实际内容(默认下的全屏) #####

    @observable showDemoPageDrawer = false;

    // @observable selectedComponent = null;

    // ==========

    reactions = new ReactionManager()

    prepare(props) {}

    @action
    init(props) {}

    update(nextProps) {}

    exit(props) {
        this.reactions.dispose();
    }
}

export default IndexPageVM;
