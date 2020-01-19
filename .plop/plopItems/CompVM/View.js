/**
 * @file: {{compClass}} View 组件
 * @author: {{userName}}
 * @date: {{today}}
 * @description: {{compClass}} 的 React UI 组件
 */

import {
    Component,
    h,
    c,
    suh,
} from '@befe/utils/dev-pattern-vm/index-pc-normal';

// 使用特定场景的 wrapper 引入要用的东西
// import {
// } from 'frontend/wrapper/erp-pc.js';

import compStyle from './style.use.less';

@suh(compStyle)
export default class /*{{compReactClass}}*//*skip*/Comp/*skip*/ extends Component {
    // 注入全局的 app 对象, 通过 props.app 可访问
    /*{{#unless shouldInjectApp}}// {{/unless}}*/static shouldInjectApp = true;

    render() {
        const {local} = this;

        return h.div('{{compCSSWrapper}}', {},
            '{{compClass}}'
        );
    }
}
