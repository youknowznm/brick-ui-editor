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

import compStyle from './style.use.less';

import View from '../View';

@suh(compStyle)
export default class /*skip*/Comp/*skip*/ extends Component {
    // 注入全局的 app 对象, 通过 props.app 可访问
    /*{{#if (ne shouldInjectApp 'yes')}}// {{/if}}*/static shouldInjectApp = true

    render() {
        const {props, local} = this;

        return h.div('{{compCSSWrapper}}-demo-normal', {},
            h(this.local.compVM)
        );
    }
}
