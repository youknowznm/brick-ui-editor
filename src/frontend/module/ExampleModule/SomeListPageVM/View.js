/**
 * @file: SomeList View 组件
 * @author: wujun07
 * @date: 2018-11-26
 * @description: SomeList 的 React UI 组件
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
export default class extends Component {

    // 是否注入全局的 app 对象
    static shouldInjectApp = true;

    render() {
        const {local} = this;

        return h.div('some-list-page-wrapper', {},
            'hello, some list'
        );
    }
}
