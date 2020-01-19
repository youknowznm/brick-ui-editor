/**
 * @file: <%= $d.moduleName %>VM/index.js
 * @author: <%= $d.userName %>
 * @date: <%= $d.env.today %>
 * @description: <%= $d.moduleDescription %>
 */

import {
    observable,
    syncableObservable,
    BaseModel,
    action,
    computed,
    setProps,
    bindView,
    ReactionManager
} from '@befe/utils/dev-pattern-vm/index-mobile';

/* import {
    urlUtils,
    URL_CONSTS,
    agent
} from 'frontend/wrapper/mobile'; */
import HeaderVM from './HeaderVM';
import View from './View';

@bindView(View)
export default class LayoutState extends BaseModel {
    static injectKey = 'layout';

    // ============= 变量
    @observable app;
    @observable currentPageNode;

    // ============= getters
    @computed
    get layoutModel() {
        return this.app.layoutModel;
    }

    @computed
    get isShowHeader() {
        return !this.currentPageNode.isHideHeader;
    }

    @computed
    get isShowSideMenu() {
        return this.currentPageNode.isShowSideMenu;
    }

    @action
    setIsShowSideMenu = isShow => {
        this.layoutModel.setIsShowSideMenu(isShow);
    };

    constructor(...args) {
        super(...args);

        // 头部
        this.headerVM = new HeaderVM({
            menuVM: this.menuVM,
            setIsShowSideMenu: this.setIsShowSideMenu
        }, {
            currentPageNode: [this, 'currentPageNode']
        });
    }

    reactions = new ReactionManager();

    @action
    prepare(props) {
        this.app = props.app;

        this.reactions.reaction(() => {
            return this.layoutModel
                ? this.layoutModel.currentPageNode
                : undefined;
        }, node => {
            this.setProps({
                currentPageNode: node || {}
            });
        });
    }

    @action
    init(props) {}

}
