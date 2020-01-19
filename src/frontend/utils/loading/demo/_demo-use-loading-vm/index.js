/**
 * @file: ExampleLoadingDemo 状态对象
 * @author: huqin
 * @date: 2019-05-05
 * @description: ExampleLoadingDemo 的状态入口页面
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
} from '@befe/utils/dev-pattern-vm/index-pc-normal';

import View from './View';


// 如果有需要, 打开 global-wrapper 和特定的模块 wrapper
// import {
// } from 'frontend/wrapper/WRAPPER_NAME'

// import ExampleLoadingVM from '../index'

@bind(View)
export default class ExampleLoadingDemoState extends BaseModel {
    // 布局
    demoLayout

    static injectKey = 'exampleLoadingDemo'
    static demoKey = 'example-loading-demo'

    // 如果要修改本 demo page 的显示名称, 可以修改此属性
    static demoName = 'use-LoadingVM-Demo1111111'

    reactions = new ReactionManager();


    @observable isLoading = true;


    constructor(initData, syncConfig) {
        super(initData, syncConfig);

    }

    @action
    init(props) {
        setTimeout(action(e => {
            this.isLoading = !this.isLoading;
        }), 5000);

    }

    update(nextProps) {
    }

    exit(props) {
        this.reactions.dispose();
    }
}
