/**
 * @file: {{compDemoClass}} View 组件
 * @author: {{userName}}
 * @date: {{today}}
 * @description: {{compDemoClass}} 的 React UI 组件
 */

import {
    // computed,
    Component,
    h,
    suh,
    action,
    observable
} from '@befe/utils/dev-pattern-vm/index-pc-normal';

// import {
// } from 'frontend/MODULE_NAME/wrapper'

import pageStyle from './style.use.less';

@suh(pageStyle)
export default class /*{{compDemoReactClass}}*//*skip*/Comp/*skip*/ extends Component {
    static shouldInjectApp = true

    renderCaseTitle(caseName) {
        return h.h4({}, `UI Demo case : ${caseName}`);
    }

    renderNoLayoutLink() {
        const {local} = this;

        return h.a({
            href: local.noLayoutAddress,
            target: '_blank'
        }, 'ip 全地址 (用于移动端打开)');
    }

    renderPageContent() {
        const {local} = this;

        return h.div({},
            'hello, mobile demo case page',
            h(local./*{{compVMInstance}}*//*skip*/compVM/*skip*/)
        );
    }

    renderNoLayout() {
        const {props, local} = this;

        return h.div('no-layout-wrapper {{compDemoCssWrapper}}', {},
            this.renderPageContent()
        );
    }

    renderPCMobileWrapper(content) {
        return h.div('mobile-wrapper', {},
            content
        );
    }

    renderWithLayout() {
        const {props, local} = this;

        return h.div('{{compDemoCssWrapper}}', {},

            this.renderNoLayoutLink(),

            this.renderCaseTitle('基础 Demo'),

            h.div('demo-case-section', {},
                this.renderPCMobileWrapper(
                    this.renderPageContent()
                )
            ),
        );
    }

    render() {
        const {local} = this;
        return local.isUnderNoLayout ? this.renderNoLayout() : this.renderWithLayout();
    }
}
