/**
 * @file PAGE_NAME 页面入口组件
 * @author YOURNAME
 */

import {
    Component,
    h,
    suh
} from '@befe/utils/dev-pattern-vm/index-mobile';

import pageStyle from './style.use.less';

@suh(pageStyle)
export default class IndexPage extends Component {

    static shouldInjectApp = true;

    render() {
        const {props, local} = this;
        const {
            isShowHeader,
            isShowSideMenu
        } = local;

        return h.div('app-view-content', {
            id: 'filter-blur-elem'
        },
            isShowHeader ? h(local.headerVM) : '',
            props.children,
            isShowSideMenu ? h(local.menuVM) : ''
        );
    }
}
