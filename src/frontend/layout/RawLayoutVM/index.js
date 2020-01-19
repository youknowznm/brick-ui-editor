/**
 * @file: ApproveLayout 状态对象
 * @author: lzheng
 * @date: 2018-08-02
 * @description: ApproveLayout 的状态入口页面
 */

import {
    observable,
    action,
    urlsync,
    BaseModel,
    bindView as bind,
    bindActions,
    extendMethods,
    ReactionManager,
    i18n,
    agent
} from '@befe/utils/dev-pattern-vm/index-pc-normal';

import View from './View';

// 如果有需要, 打开 global-wrapper 和特定的模块 wrapper

// import {
//     urlUtils
// } from 'frontend/global-wrapper';

// import {} from 'frontend/MODULE_NAME/wrapper';

/**
 * 特殊:
 *
 * 请在 routes.js 中加入对应的 entry
 *
 {
     path: '/path',
     getComponent(next, callback) {
         require.ensure([], () => {
             wrapState(
                 callback, require('./ApproveLayoutPageVM')
             );
         }, 'approve-layout-page-vm');
     }
 },
 */

const actions = {
    // 用于放置 handleXXX 等需要绑定 this + action 的方法
};

const methods = {
    // 用于放置一些简单的扩展方法
};

@bind(View)
class ApproveLayoutVM extends BaseModel {

    // 注入到 props.app.approveLayoutPage
    static injectKey = 'rawLayout';

    @observable currentLang =(i18n.getLang() && i18n.getLang().lang) !== 'en-US' ? 'ZHS' : 'US';

    constructor(initData, syncConfig) {
        super(initData, syncConfig);

        bindActions(this, actions);
        extendMethods(ApproveLayoutVM, methods);
    }

    // Reaction 控制
    reactions = new ReactionManager();

    init(props) {
        // 在此注册一些状态联动
        // this.reaction.reaction( /* ... */ );
    }

    update(nextProps) {}

    exit(props) {
        this.reactions.dispose();
    }
}

export default ApproveLayoutVM;
