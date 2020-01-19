/**
 * @file: HeaderMenu 状态对象
 * @author: meijingjing
 * @date: 2019-03-19
 * @description: HeaderMenu 的状态入口页面
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
// import {getPageUrl} from 'frontend/module/TestMobile/map/site-map';
import View from './View';

@bind(View)
export default class HeaderMenuState extends BaseModel {

    // ============= 常量定义 =============
    @syncableObservable showHeaderMenu = false;
    @syncableObservable sceneType;
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
    get layoutModel() {
        return this.app.layoutModel || {};
    }

    @computed
    get sceneData() {
        return this.layoutModel.sceneData || [];
    }
    // ============= 类 setter 定义 =============

    // ============= UI handlers =============
    menuListTapHandle = card => {

        if (card.code !== this.sceneType) {
            this.app.processModel.clearLocation();
        }

        /*replacePage({
            url: getPageUrl(),
            params: {
                sceneType: card.code
            }
        });*/
    }

    // ============= 类成员方法定义 =============

    // Reaction 控制
    // reactions = new ReactionManager();

    // 组件生命周期
    constructor(initData, syncConfig) {
        super(undefined, syncConfig);
        this.setProps(initData);
    }

    prepare(props) {
        // 在此注册一些状态联动
        // this.reactions.reaction( /* ... */ )
        this.app = props.app;
        this.processModel = this.app.processModel;
    }

    init(props) {}

    update(nextProps) {}

    @action
    exit(props) {
        // 销毁 Reaction, 如果使用 Reaction 需要打开本注释
        // this.reactions.dispose();
        this.showHeaderMenu = false;
    }
}
