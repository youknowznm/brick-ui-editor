/**
 * @file: ApproveLayout View 组件
 * @author: lzheng
 * @date: 2018-08-02
 * @description: ApproveLayout 的 React UI 组件
 */

import {
    computed,
    Component,
    h,
    suh
} from '@befe/utils/dev-pattern-vm/index-mobile';

// 如果有需要, 打开 global-wrapper 和特定的模块 wrapper

// import {
//     urlUtils
// } from 'frontend/global-wrapper';

// import {} from 'frontend/MODULE_NAME/wrapper';

import pageStyle from './style.use.less';

@suh(pageStyle)
export default class extends Component {

    // 是否注入全局的 app 对象
    static shouldInjectApp = true;

    render() {
        const {props, local} = this;

        return h.div('raw-layout', {},
            props.children,
        );
    }
}
