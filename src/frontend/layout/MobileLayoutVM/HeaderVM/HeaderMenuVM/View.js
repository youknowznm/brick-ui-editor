/**
 * @file: HeaderMenu View 组件
 * @author: meijingjing
 * @date: 2019-03-19
 * @description: HeaderMenu 的 React UI 组件
 */

import {
    Component,
    h,
    suh
} from '@befe/utils/dev-pattern-vm/index-mobile';

// 如果有需要, 打开 global-wrapper 和特定的模块 wrapper
// import {
// } from 'frontend/wrapper/WRAPPER_NAME'

// 如果有需要, 打开特定场景的 wrapper
// import {
// } from 'frontend/wrapper/WRAPPER_NAME'
import compStyle from './style.use.less';

@suh(compStyle)
export default class HeaderMenuView extends Component {
    // 注入全局的 app 对象, 通过 props.app 可访问
    static shouldInjectApp = true;

    render() {
        const {props, local} = this;

        return h(local.maskVM, {
                className: 'header-menu-wrapper',
            },
            h.div({},
                h.ul('header-menu-content', {},
                    local.sceneData.map(item => {
                        const {code, text} = item;
                        return h.li('', {
                            key: code
                        },
                            h.div({}, text)
                        );
                    })
                )
            )
        );
    }
}
