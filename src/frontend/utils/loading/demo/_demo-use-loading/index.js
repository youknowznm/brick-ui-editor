/**
 * @file: UseLoadingDemo View 组件
 * @author: huqin
 * @date: 2019-05-05
 * @description: UseLoadingDemo 的 React UI 组件
 */

import {
    // computed,
    Component,
    h,
    suh,
} from '@befe/utils/dev-pattern-vm/index-pc-normal';


// import hoc from '../../index';
import hocLoading from '../../index';

import pageStyle from './style.use.less';


@hocLoading(void 0, {withDelayFirstly: true})
@suh(pageStyle)
class UseLoadingPart extends Component {

    render() {
        return h.div({
            style: {
                height: '300px',
                lineHeight: '200px',
                fontSize: '24px',
                textAlign: 'center'
            }
        }, 'Loading');
    }
}



@suh(pageStyle)
export default class UseLoadingDemoView extends Component {
    static shouldInjectApp = true;

    static demoKey = 'use-loading-demo'
    static demoName = 'use-loading-demo'

    state = {
        isLoading: false
    }
    renderCaseTitle(caseName) {
        return h.h4({}, `UI Demo case : ${caseName}`);
    }

    render() {
        const {props, local} = this;

        return h.div('use-loading-demo', {},
            h.div({
                onClick: e => this.setState({
                    isLoading: !this.state.isLoading
                })
            }, '点击我切换Loading'),
            this.renderCaseTitle('compomnent use loading'),
            h(UseLoadingPart, {
                isLoading: this.state.isLoading,
            }),
            h.div('demo-case-section', {},
            ),
        );
    }
}
