/**
 * @file: <%= $d.moduleName %>VM/index.js
 * @author: <%= $d.userName %>
 * @date: <%= $d.env.today %>
 * @description: <%= $d.moduleDescription %>
 */

import {
    observable,
    syncableObservable,
    action,
    computed,
    BaseModel,
    bindView
} from '@befe/utils/dev-pattern-vm/index-pc-normal';

import View from './View';

@bindView(View)
class BaseState extends BaseModel {
    static injectKey = 'layout';

    app;

    get layoutModel() {
        return this.app && this.app.layoutModel;
    }

    constructor(...args) {
        super(...args);
    }

    prepare(props) {
        this.app = props.app;
    }

    init(props) {}

    update(props) {}

    exit(props) {}
}

export default BaseState;
