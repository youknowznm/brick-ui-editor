/**
 * @author zhangenming
 */

import {
    computed,
    Component,
    h,
    toJS,
    suh,
    observer
} from '@befe/utils/dev-pattern-vm/index-pc-normal';

import BillHeaderView from './view/BillHeaderView';

import pageStyle from './style.use.less';

@suh(pageStyle)
export default class extends Component {

    // 是否注入全局的 app 对象
    static shouldInjectApp = true;

    componentDidMount() {
        const {local, props} = this;
        const {
        } = local;

        const {
            expHeaderId
        } = props.location.query;
    }

    render() {
        const {props, local} = this;
        return local.billHeaderReady ? h.div('index-page-wrapper', {},
            h(BillHeaderView, {
                // billHeader: local.billHeader,
                // billHeaderReady: local.billHeaderReady
            }),
        ) : null;
    }
}
