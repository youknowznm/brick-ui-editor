/**
 * @file: {{compDemoClass}} View 组件
 * @author: {{userName}}
 * @date: {{today}}
 * @description: {{compDemoClass}} 的 React UI 组件
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

import pageStyle from './style.use.less';

@suh(pageStyle)
export default class /*{{compDemoReactClass}}*//*skip*/Comp/*skip*/ extends Component {
    static shouldInjectApp = true;

    render() {
        const {local} = this;

        return h.div('{{compDemoCssWrapper}}', {},
            h.h4({}, '{{compDemoName}}'),
            h.div('demo-case-section', {},
                h(local./*{{compVMInstance}}*//*skip*/compVM/*skip*/)
            ),
        );
    }
}
