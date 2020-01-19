/* eslint-disable */

/**
 * @author zhangenming
 */

import {
    observable,
    action,
    toJS,
    computed,
    urlsync,
    BaseModel,
    h,
    bindView as bind,
    ReactionManager,
    setProps
} from '@befe/utils/dev-pattern-vm/index-pc-normal';

import View from './View';
import moment from 'moment';

import {
} from 'frontend/service/api/common-api';

@bind(View)
class IndexPageVM extends BaseModel {

    static injectKey = 'root';

    layoutModel;

    constructor(initData, syncConfig) {
        super(initData, syncConfig);
    }

    @action
    initProps() {}

    @observable loadingFlag = false;

    triggerLoading = bool => {
        this.setProps({
            loadingFlag: bool
        });
    }

    // ==========

    reactions = new ReactionManager()

    prepare(props) {
        this.layout = props.app.layout;
        this.layoutModel = props.app.layoutModel;
    }

    @action
    init(props) {}

    update(nextProps) {}

    exit(props) {
        this.reactions.dispose();
    }
}

export default IndexPageVM;
