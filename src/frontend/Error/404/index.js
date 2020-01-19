/**
 * @file PAGE_NAME 页面入口组件
 * @author YOURNAME
 */

import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {h, c} from '@befe/utils/wrapper/erp';
import * as injector from '@befe/utils/lib/state-injector';

import State from './state';
import pageStyle from './style.use.less';
import ErrorWall from '@befe/erp-comps/v2/components/ErrorWall';

@inject('app')
@observer
export default class IndexPage extends Component {

    local = {
        state: new State()
    }

    componentWillMount() {
        pageStyle.use();
        injector.mount(this.props.app, this.local);
        this.local.state.init();
        this.props.app.setMenuVisible(false);
    }

    componentWillUnmount() {
        pageStyle.unuse();
        injector.unmount(this.props.app, this.local);
        this.local.state.exit();
        this.props.app.setMenuVisible(true);
    }

    render() {
        return h.div('page-error-404', {},
            h(ErrorWall, {
                type: '404'
            })
        );
    }
}
