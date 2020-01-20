import {
    toJS,
    observable,
    syncableObservable,
    computed,
    action,
    urlsync,
    BaseModel,
    bindView as bind,
    bindActions,
    reaction,
    extendMethods,
    ReactionManager,
    h
} from '@befe/utils/dev-pattern-vm/index-pc-normal';

export default class State extends BaseModel {

    // 编辑中标识
    @observable editingFlag = false;

    // 请求中标识
    @observable loadingFlag = false;
}
