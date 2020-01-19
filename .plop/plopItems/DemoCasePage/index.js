/**
 * @file: {{compDemoClass}} 状态对象
 * @author: {{userName}}
 * @date: {{today}}
 * @description: {{compDemoClass}} 的状态入口页面
 */

import {
    observable,
    syncableObservable,
    action,
    computed,
    BaseModel,
    bindView as bind,
    ReactionManager
} from '@befe/utils/dev-pattern-vm/index-pc-normal';

import View from './View';

// 使用特定场景的 wrapper 引入要用的东西
// import {
// } from 'frontend/wrapper/erp-pc.js';

import /*{{compVMClass}}*//*skip*/CompVM/*skip*/ from '../index';

@bind(View)
export default class /*{{compDemoStateClass}}*//*skip*/State/*skip*/ extends BaseModel {
    // 布局
    layoutModel;

    static injectKey = '{{compDemoStateInjectKey}}';
    static demoPageKey = '{{compDemoKey}}';

    // 如果要修改本 demo page 的显示名称, 可以修改此属性
    static demoPageName = '{{compDemoName}}';

    reactions = new ReactionManager();

    // 如果有新的 demo 可以在此新增定义
    /*{{compVMInstance}}*//*skip*/compVM/*skip*/;

    constructor(initData, syncConfig) {
        super(undefined, syncConfig);
        this.setProps(initData);

        // 如果有新的 demo 可以在此新增初始化
        this./*{{compVMInstance}}*//*skip*/compVM/*skip*/ = new /*{{compVMClass}}*//*skip*/CompVM/*skip*/();
    }

    prepare(props) {
    }

    init(props) {
    }

    update(nextProps) {
    }

    exit(props) {
        this.reactions.dispose();
    }
}
