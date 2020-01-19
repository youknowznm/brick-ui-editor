/**
 * @file: {{compClass}} 状态对象
 * @author: {{userName}}
 * @date: {{today}}
 * @description: {{compClass}} 的状态入口页面
 */
import {
    observable,
    syncableObservable,
    computed,
    action,
    urlsync,
    BaseModel,
    bindView as bind,
    ReactionManager
} from '@befe/utils/dev-pattern-vm/index-mobile';
import CompVM from '..';

// 如果有需要, 打开特定场景的 wrapper
// import {
// } from 'frontend/wrapper/WRAPPER_NAME'

import View from './View';

@bind(View)
export default class /*skip*/State/*skip*/ extends BaseModel {
    static demoKey = '{{compClass}}Normal';
    static demoName = '{{compClass}} - Normal';

    compVM = new CompVM();

    // ============= 常量定义 =============

    // ============= 类对外变量定义 =============
    // 请不要预设初始值, 如果有需要加入初始值的话, 在 constructor 里
    // 调用 this.setDefaults({key: defaultValue})

    // ============= 类对外 API 定义 =============
    // 请不要预设初始值, 如果有需要加入初始值的话, 在 constructor 里
    // 调用 this.setDefaults({key: defaultValue})

    // ============= 类成员变量定义 =============
    // 请不要预设初始值, 如果有需要加入初始值的话, 在 constructor 里
    // 调用 this.setDefaults({key: defaultValue})

    // ============= 类 getter 定义 =============

    // ============= 类 setter 定义 =============

    // ============= UI handlers =============

    // ============= 类成员方法定义 =============

    // Reaction 控制
    /*{{#if (ne shouldUseReaction 'yes')}}// {{/if}}*/reactions = new ReactionManager();

    // 组件生命周期
    constructor(initData, syncConfig) {
        super(undefined, syncConfig);
        this.setProps(initData);
        // this.initProps();
    }

    // @action
    // initProps();

    prepare(props) {
        // 在此注册一些状态联动
        // this.reactions.reaction( /* ... */ )
    }

    init(props) {}

    update(nextProps) {}

    exit(props) {
        // 销毁 Reaction, 如果使用 Reaction 需要打开本注释
        /*{{#if (ne shouldUseReaction 'yes')}}// {{/if}}*/this.reactions.dispose();
    }
}
