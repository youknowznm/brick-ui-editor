/**
 * @file: {{pageName}} 状态对象
 * @author: {{userName}}
 * @date: {{today}}
 * @description: {{pageName}} 的状态入口页面
 */

import {
    observable,
    syncableObservable,
    action,
    computed,
    BaseModel,
    bindView,
    ReactionManager
} from '@befe/utils/dev-pattern-vm/index-pc-normal';

import View from './View';

// 使用特定场景的 wrapper 引入要用的东西
// import {
// } from 'frontend/wrapper/erp-pc.js';

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
                 callback, require('./{{pageClass}}')
             );
         }, '{{dashCase pageClass}}');
     }
 },
 */

@bindView(View)
class /*{{pageClass}}*//*skip*/State/*skip*/ extends BaseModel {

    // ============= 常量定义 =============

    // 注入到 props.app.{{injectKey}}
    /*{{#unless shouldInjectKey}}// {{/unless}}*/injectKey = '{{injectKey}}';

    // ============= 类对外变量定义 =============

    // ============= 类对外 API 定义 =============

    // ============= 类成员变量定义 =============

    layoutModel;

    // ============= 类 getter 定义 =============

    // ============= 类 setter 定义 =============

    // ============= UI handlers =============

    // ============= 类成员方法定义 =============

    constructor(initData, syncConfig) {
        super(undefined, syncConfig);
        this.setProps(initData);
    }

    // Reaction 控制
    /*{{#unless shouldUseReaction}}// {{/unless}}*/reactions = new ReactionManager();

    prepare(props) {
        this.layoutModel = props.app.layoutModel;
    }

    init(props) {
        // 在此注册一些状态联动
        // this.reaction.reactions( /* ... */ );
    }

    update(nextProps) {
    }

    exit(props) {
        /*{{#unless shouldUseReaction}}// {{/unless}}*/this.reactions.dispose();
    }
}

export default /* {{pageClass}} *//*skip*/State/*skip*/;
