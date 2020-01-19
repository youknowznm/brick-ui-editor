/**
 * @file: {{pageName}} View 组件
 * @author: {{userName}}
 * @date: {{today}}
 * @description: {{pageName}} 的 React UI 组件
 */

import {
    computed,
    Component,
    h,
    suh
} from '@befe/utils/dev-pattern-vm/index-pc-normal';

// 如果有需要, 打开特定的模块 wrapper
// import {
// } from 'frontend/MODULE_NAME/wrapper';

import pageStyle from './style.use.less';

@suh(pageStyle)
export default class /* {{pageReactClass}} *//*skip*/Comp/*skip*/ extends Component {

    // 是否注入全局的 app 对象

    /*{{#if (not shouldInjectApp)}}//{{/if}}*/ static shouldInjectApp = true;

    render() {
        const {props, local} = this;

        return h.div('{{pageCSSWrapper}}', {},
            h(local.searchPageVM),
        );
    }
}
