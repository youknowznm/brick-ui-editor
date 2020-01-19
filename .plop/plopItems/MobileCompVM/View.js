/**
 * @file: {{compClass}} View 组件
 * @author: {{userName}}
 * @date: {{today}}
 * @description: {{compClass}} 的 React UI 组件
 */

import {
    Component,
    h,
    suh,
} from '@befe/utils/dev-pattern-vm/index-mobile';

// 如果有需要, 打开 global-wrapper 和特定的模块 wrapper
// import {
// } from 'frontend/wrapper/WRAPPER_NAME'

// 如果有需要, 打开特定场景的 wrapper
// import {
// } from 'frontend/wrapper/WRAPPER_NAME'

import compStyle from './style.use.less';

@suh(compStyle)
export default class /*{{compReactClass}}*//*skip*/Comp/*skip*/ extends Component {
    // 注入全局的 app 对象, 通过 props.app 可访问
    /*{{#if (ne shouldInjectApp 'yes')}}// {{/if}}*/static shouldInjectApp = true;

    render() {
        const {props, local} = this;

        return h.div('{{compCSSWrapper}}', {},
            '{{compClass}}'
        );
    }
}
