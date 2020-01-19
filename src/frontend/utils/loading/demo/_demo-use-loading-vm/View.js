/**
 * @file: ExampleLoadingDemo View 组件
 * @author: huqin
 * @date: 2019-05-05
 * @description: ExampleLoadingDemo 的 React UI 组件
 */

import {
    // computed,
    Component,
    h,
    suh,
} from '@befe/utils/dev-pattern-vm/index-pc-normal';

// import {
// } from 'frontend/MODULE_NAME/wrapper'

import pageStyle from './style.use.less';

import hocLoading from '../../index';


@suh(pageStyle)
@hocLoading(void 0, {vm: true})
export default class ExampleLoadingDemoView extends Component {
    static shouldInjectApp = true;

    renderCaseTitle(caseName) {
        return h.h4({}, `UI Demo case : ${caseName}`);
    }

    render() {
        const {props, local} = this;

        return h.div('example-loading-demo', {},
            this.renderCaseTitle('VM use Loading'),
            h.div('demo-case-section', {},
            ),
        );
    }
}
