/**
 * @file: {{compDemoClass}} 状态对象
 * @author: {{userName}}
 * @date: {{today}}
 * @description: {{compDemoClass}} 的状态入口页面
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
    computed
} from '@befe/utils/dev-pattern-vm/index-pc-normal';

import {get} from '@befe/utils/dev-pattern-vm/utils/ajaxAgent2';
import View from './View';

// 如果有需要, 打开 global-wrapper 和特定的模块 wrapper
// import {
// } from 'frontend/wrapper/WRAPPER_NAME'

// 如果需要, 注释或去除以下的引用
import /*{{compVMClass}}*//*skip*/CompVM/*skip*/ from '../index';

@bind(View)
export default class /*{{compDemoStateClass}}*//*skip*/State/*skip*/ extends BaseModel {
    static injectKey = '{{compDemoStateInjectKey}}'
    static demoKey = '{{compDemoKey}}'

    // 如果要修改本 demo page 的显示名称, 可以修改此属性
    static demoName = '{{compDemoName}}'

    @observable ipAddress;

    @computed
    get noLayoutAddress() {
        if (this.ipAddress) {
            const href = location.href;
            return href
                .replace('http://localhost:', `http://${this.ipAddress}:`)
                .replace('#/', '#/no-layout/');
        }

        return 'javascript:void(0)';
    }

    reactions = new ReactionManager()

    // 如果有新的 demo 可以在此新增定义
    /*{{compVMInstance}}*//*skip*/compVM/*skip*/;
    isUnderNoLayout = false;

    constructor(initData, syncConfig) {
        super(initData, syncConfig);

        // 如果有新的 demo 可以在此新增初始化
        // this./*{{compVMInstance}}*//*skip*/compVM/*skip*/ = new /*{{compVMClass}}*//*skip*/CompVM/*skip*/();
    }

    prepare(props) {
        if (/\/no-layout\//.exec(props.location.pathname)) {
            console.log('is no layout');
            this.isUnderNoLayout = true;

            const documentHtml = document.head.innerHTML;
            if (documentHtml.indexOf('is-demo-inited') === -1) {
                document.head.innerHTML += '<meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" data-page="is-demo-inited">'
                    + '<meta name="format-detection" content="telephone=no">';
            }
        }

        get({}, '/_/matriks/get-ip-address')
            .then(action(res => {
                this.ipAddress = res.ip;
            }));
    }

    @action
    init(props) {
    }

    update(nextProps) {
    }

    exit(props) {
        this.reactions.dispose();
    }
}
