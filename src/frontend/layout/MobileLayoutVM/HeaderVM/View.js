/**
 * @file: Header View 组件
 * @author: meijingjing
 * @date: 2019-02-26
 * @description: Header 的 React UI 组件
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
export default class HeaderView extends Component {
    // 注入全局的 app 对象, 通过 props.app 可访问
    static shouldInjectApp = true;

    // 返回按钮
    renderBackBtn() {
        const {props, local} = this;

        return local.pageConfig.showBackBtn
            ? h.div({
                className: 'back-btn-container'
            },
                '<'
            )
            : undefined;
    }

    // 个别设备的双击阻止
    onTouchEnd = e => {
        e.preventDefault();
    };

    render() {
        const {props, local} = this;
        const {
            pageConfig,
            title
        } = local;
        const {
            canSwitchMenus
        } = pageConfig;

        return h.div('header-wrapper', {
            onTouchEnd: this.onTouchEnd
        },
            this.renderBackBtn(),

            h.div('map-header-text', {},
                h.div('map-header-text-handle', {},
                    h.span({}, title || ''),
                    canSwitchMenus
                        ? h.div(local.showHeaderMenu ? 'arrowUp' : 'arrowDown', {
                            className: 'title-arrow-icon'
                        })
                        : undefined,
                )
            ),

            h(local.headerMenuVM)
        );
    }
}
