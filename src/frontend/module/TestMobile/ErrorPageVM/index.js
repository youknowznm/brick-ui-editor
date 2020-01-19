/**
 * @file: Error 状态对象
 * @author: meijingjing
 * @date: 2019-04-09
 * @description: Error 的状态入口页面
 */
import {
    observable,
    syncableObservable,
    computed,
    action,
    BaseModel,
    bindView as bind,
    ReactionManager
} from '@befe/utils/dev-pattern-vm/index-mobile';

// 使用特定场景的 wrapper 引入要用的东西
// import {
// } from 'frontend/wrapper/erp-pc.js';

import View from './View';

@bind(View)
export default class ErrorState extends BaseModel {

    // ============= 常量定义 =============

    // ============= 类对外变量定义 =============

    // ============= 类对外 API 定义 =============

    // ============= 类成员变量定义 =============

    // ============= 类 getter 定义 =============
    @computed
    get errorMessage() {
        return this.layoutModel.errorMessage;
    }
    // ============= 类 setter 定义 =============

    // ============= UI handlers =============

    // ============= 类成员方法定义 =============

    // Reaction 控制
    // reactions = new ReactionManager();

    // 组件生命周期
    constructor(initData, syncConfig) {
        super(undefined, syncConfig);
        this.setProps(initData);
    }

    prepare(props) {
        this.app = props.app;
        this.layoutModel = this.app.layoutModel;
        // 在此注册一些状态联动
        // this.reactions.reaction( /* ... */ );
    }

    init(props) {}

    update(nextProps) {}

    exit(props) {
        // 销毁 Reaction, 如果使用 Reaction 需要打开本注释
        // this.reactions.dispose();
    }
}
