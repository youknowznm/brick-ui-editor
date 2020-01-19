/**
 * @file: IndexPage View 组件
 * @author: lzheng
 * @date: 2018-10-18
 * @description: IndexPage 的 React UI 组件
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
export default class IndexPageView extends Component {

    // 是否注入全局的 app 对象
    static shouldInjectApp = true;

    render() {
        const {local} = this;

        return h.div('index-page-wrapper', {},
            'hello, example'
        );
    }
}
