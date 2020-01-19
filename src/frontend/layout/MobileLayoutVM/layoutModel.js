import {
    observable,
    action,
    setProps
} from '@befe/utils/dev-pattern-vm/index-mobile';

class LayoutModel {
    constructor(props) {
        setProps(this, props);

        // this.getUserInfo();
    }

    // 页面节点
    @observable pageNode = {};

    // 当前页面节点
    @observable currentPageNode = {};

    // 用户信息
    @observable userInfo = {};

    // 错误信息
    @observable errorMessage = '啊哦, 出错了';

    @action
    setCurrentPageNode(node) {
        const pathName = node.pathName;
        if (!this.pageNode[pathName]) {
            this.pageNode[pathName] = node;
            this.currentPageNode = node;
        }
        else {
            this.currentPageNode = Object.assign({}, this.pageNode[pathName], node);
        }
    }

    @action
    setCurrentPageTitle(title) {
        this.currentPageNode.title = title;
    }

    @action
    setIsShowSideMenu(show) {
        const pathName = this.currentPageNode.pathName;
        this.pageNode[pathName] = Object.assign({}, this.pageNode[pathName], {
            isShowSideMenu: show
        });
        this.currentPageNode = this.pageNode[pathName];
    }

    // 设置用户信息
    @action
    setUserInfo(data) {
        this.userInfo = data || '';
    }

    @action
    setErrorMessage(message) {
        this.errorMessage = message;
    }
}
const layoutModelInstance = new LayoutModel();

export { layoutModelInstance };
