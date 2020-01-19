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

export default class BillHeaderState extends BaseModel {

    // 编辑中标识
    @observable editingFlag = false;

    // 编辑弹性域中标识
    @observable editingFlexValuesFlag = false;

    addEditingFlagReaction(cb) {
        reaction(() => this.editingFlag, editingFlag => {
            cb(editingFlag);
        });
    }

    // 取消操作, 关闭整个头编辑时, 还原
    @observable localBillHeader = null;

    // 取消操作, 关闭弹性域弹窗时, 还原
    @observable localFlexValueSnapshot = null;

    @action
    setLocalBillHeader = newAttrs => {
        this.setProps({
            localBillHeader: Object.assign({}, this.localBillHeader, newAttrs)
        });
    }

    // 请求中标识
    @observable loadingFlag = false;
}
