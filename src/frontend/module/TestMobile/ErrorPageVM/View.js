/**
 * @file: Error View 组件
 * @author: meijingjing
 * @date: 2019-04-09
 * @description: Error 的 React UI 组件
 */

import {
    Component,
    h,
    c,
    suh,
} from '@befe/utils/dev-pattern-vm/index-mobile';

// 使用特定场景的 wrapper 引入要用的东西
// import {
// } from 'frontend/wrapper/erp-pc.js';

import compStyle from './style.use.less';

@suh(compStyle)
export default class ErrorView extends Component {
    // 注入全局的 app 对象, 通过 props.app 可访问
    static shouldInjectApp = true;

    render() {
        const {local} = this;

        return h.div('error-wrapper', {},
            h.div('error-img'),
            local.errorMessage
        );
    }
}
