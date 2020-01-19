/**
 * @file: Header 状态对象
 * @author: meijingjing
 * @date: 2019-02-26
 * @description: Header 的状态入口页面
 */
import {
    observable,
    syncableObservable,
    computed,
    action,
    urlsync,
    BaseModel,
    bindView as bind,
    ReactionManager
} from '@befe/utils/dev-pattern-vm/index-mobile';

// 如果有需要, 打开特定场景的 wrapper
// import {
// } from 'frontend/wrapper/WRAPPER_NAME'
// import {replacePage} from 'frontend/module/TestMobile/utils/tool';
// import {getPageUrl} from '../site-map';
import HeaderMenuVM from './HeaderMenuVM';
import View from './View';

@bind(View)
export default class HeaderState extends BaseModel {

    // ============= 常量定义 =============
    @syncableObservable currentPageNode = {};
    // @observable pagePath = '';
    // ============= 类对外变量定义 =============
    // 请不要预设初始值, 如果有需要加入初始值的话, 在 constructor 里
    // 调用 this.setDefaults({key: defaultValue})

    // ============= 类对外 API 定义 =============
    // 请不要预设初始值, 如果有需要加入初始值的话, 在 constructor 里
    // 调用 this.setDefaults({key: defaultValue})

    // ============= 类成员变量定义 =============
    // 请不要预设初始值, 如果有需要加入初始值的话, 在 constructor 里
    // 调用 this.setDefaults({key: defaultValue})

    // ============= 类 getter 定义 =============
    @computed
    get pageConfig() {
        return Object.assign({}, {
            showBackBtn: true,
            title: ''
        }, this.currentPageNode);
    }

    @computed
    get layoutModel() {
        return this.app.layoutModel || {};
    }

    @computed
    get title() {
        const {currentPageNode} = this.layoutModel;

        // 标题优先级以title字段为主
        if (currentPageNode && currentPageNode.title) {
            return currentPageNode.title;
        }
        return '';
    }

    // ============= 类 setter 定义 =============

    // ============= UI handlers =============
    toggleHeaderMenu = () => {
        const showHeaderMenu = !this.showHeaderMenu;
        this.setProps({
            showHeaderMenu
        });
    };

    // ============= 类成员方法定义 =============

    // Reaction 控制
    // reactions = new ReactionManager();

    // 组件生命周期
    constructor(initData, syncConfig) {
        super(undefined, syncConfig);
        this.setProps(initData);

        this.headerMenuVM = new HeaderMenuVM({}, {
            showHeaderMenu: [this, 'showHeaderMenu'],
        });
    }

    // 返回上一页操作, 引用处可覆盖, 也可以传值backUrl
    goBack() {
        const onBack = this.currentPageNode.onBack;
        if (typeof onBack === 'function') {
            onBack();
        }
        else {
            if (window.history.length) {
                window.history.back(-1);
            } else {
                window.close();
            }
        }
    }

    prepare(props) {
        // 在此注册一些状态联动
        this.app = props.app;
    }

    @action
    init(props) {
    }

    @action
    update(nextProps) {
    }

    exit(props) {
        // 销毁 Reaction, 如果使用 Reaction 需要打开本注释
        // this.reactions.dispose();
    }
}
