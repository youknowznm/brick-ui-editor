/**
 * @file: IndexPageVM 状态对象
 * @author: lzheng
 * @date: 2018-08-03
 * @description: IndexPageVM 的状态入口页面
 */

import {
    observable,
    action,
    urlsync,
    BaseModel,
    bindView as bind,
    bindActions,
    extendMethods,
    ReactionManager
} from '@befe/utils/dev-pattern-vm/index-mobile';

import View from './View';
// 如果有需要, 打开 global-wrapper 和特定的模块 wrapper

/* import {
    urlUtils,
    agent,
    mobileApprovalUtils
} from 'frontend/wrapper/mobile'; */

@bind(View)
class IndexPageVM extends BaseModel {

    constructor(initData, syncConfig) {
        super(undefined, syncConfig);
        this.setProps(initData);

    }

    // Reaction 控制
    reactions = new ReactionManager();


    @action
    init(props) {
        // 在此注册一些状态联动
        // this.reaction.reaction( /* ... */ );
        this.layoutModel = props.app.layoutModel;
    }

    update(nextProps) {}

    exit(props) {
        this.reactions.dispose();
    }
}

export default IndexPageVM;
