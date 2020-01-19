/**
 * @file PAGE_NAME 页面入口组件
 * @author YOURNAME
 */

import {
    React,
    Component,
    h
} from '@befe/utils/dev-pattern-vm/index-mobile';

export default class AppView extends Component {
    render() {
        const {local} = this.props;
        let className = 'app-view';
        if (local.moduleClassName) {
            className += ` app-view-${local.moduleClassName}`;
        }

        return h.div(className, {},
            h(local.pageComp)
        );
    }
}
