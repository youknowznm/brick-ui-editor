/**
 * @file: IndexPage 状态对象
 * @author: lzheng
 * @date: 2018-10-18
 * @description: IndexPage 的状态入口页面
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

@bindView(View)
class State extends BaseModel {

    // ============= 常量定义 =============

    injectKey = 'indexPage';

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

    // 如果需要联动控制, 打开注释
    // reactions = new ReactionManager();

    prepare(props) {
        this.layoutModel = props.app.layoutModel;
    }

    init(props) {
        // 在此注册一些状态联动
        // this.reaction.reaction( /* ... */ );
    }

    update(nextProps) {}

    exit(props) {
        // 如果需要联动控制, 打开注释
        // this.reactions.dispose();
    }
}

export default State;
