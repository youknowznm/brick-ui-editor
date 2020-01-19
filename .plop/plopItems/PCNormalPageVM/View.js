/**
 * @file: {{pageName}} View 组件
 * @author: {{userName}}
 * @date: {{today}}
 * @description: {{pageName}} 的 React UI 组件
 */

import {
    Component,
    h,
    c,
    suh
} from '@befe/utils/dev-pattern-vm/index-pc-normal';

// 使用特定场景的 wrapper 引入要用的东西
// import {
// } from 'frontend/wrapper/erp-pc.js';

import pageStyle from './style.use.less';

@suh(pageStyle)
export default class /*{{pageCompClass}}*//*skip*/Comp/*skip*/ extends Component {

    // 是否注入全局的 app 对象
    /*{{#unless shouldInjectApp}}// {{/unless}}*/static shouldInjectApp = true;

    render() {
        const {local} = this;

        return h.div('{{pageCSSWrapper}}', {},
            'hello, {{pageName}}'
        );
    }
}
