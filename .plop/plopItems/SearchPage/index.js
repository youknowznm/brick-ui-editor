/**
 * @file: {{pageName}} 状态对象
 * @author: {{userName}}
 * @date: {{today}}
 * @description: {{pageName}} 的状态入口页面
 */

import {
    observable,
    action,
    urlsync,
    BaseModel,
    bindView as bind,
    ReactionManager,
} from '@befe/utils/dev-pattern-vm/index-pc-normal';

/*plop
import {get{{searchPageVarKey}}DataConfig} from './{{searchPageFilePrefix}}-data';
import {get{{searchPageVarKey}}SearchConfig} from './{{searchPageFilePrefix}}-search';
plop*/

/*skip*/
import {getPersonalCostDataConfig} from './personal-cost-data';
import {getPersonalCostSearchConfig} from './personal-cost-search';
/*skip*/

import View from './View';

// 如果有需要, 打开特定的模块 wrapper
// import {
// } from 'frontend/wrapper/WRAPPER_NAME';

/**
 * 特殊:
 *
 * 请在 routes.js 中加入对应的 entry
 *
 {
     path: '/path',
     getComponent(next, callback) {
         require.ensure([], () => {
             wrapState(
                 callback, require('./{{pageClass}}')
             );
         }, '{{dashCase pageClass}}');
     }
 },
 */

/**
 * !!!!!!!!!!!! 说明 !!!!!!!!!!!!!!
 *
 * 如果遇到不懂的 API 使用, 可以跳转到 SearchPageCompVM/index.js 里看里面对外 变量 & API 的注释说明
 * 未来会出一个更详细的说明文档
 */
import SearchPageVM from '@befe/erp-comps/vm-comps/SearchPageCompVM/index';

/**
 * !!!!!!!!!!!! 说明 !!!!!!!!!!!!!!
 *
 * 如果有查阅需求, 或额外的预置元素, 可以查看
 * src/@befe/erp-comps/vm-comps/SearchPageCompVM/get-preset-items.js
 */
import {presetItem} from "@befe/erp-comps/vm-comps/SearchPageCompVM/preset-item";

/**
 * !!!!!!!!!!!! 说明 !!!!!!!!!!!!!!
 *
 * 记得移除掉实际不用的 import 引用
 */
import {
    getLedgerIdOptions,
    getTaxRateCodeOptions
} from 'frontend/service/api/common-api';

import {pcNormalAgentTheme} from 'frontend/service/agent-theme/pc-normal-agent-theme';

@bind(View)
class /*{{pageClass}}*//*skip*/State/*skip*/ extends BaseModel {

    /*{{#if shouldInjectKey}}

    // 注入到 props.app.{{injectKey}}
    injectKey = '{{injectKey}}';

    {{else}}

    // 注入到 props.app.{{defaultInjectKey}}
    // injectKey = '{{defaultInjectKey}}';
    {{/if}}*/

    // ============= 常量定义 =============

    // ============= 类对外变量定义 =============
    // 请不要预设初始值, 如果有需要加入初始值的话, 在 constructor 里
    // 调用 this.setDefaults({key: defaultValue})

    // ============= 类对外 API 定义 =============
    // 请不要预设初始值, 如果有需要加入初始值的话, 在 constructor 里
    // 调用 this.setDefaults({key: defaultValue})

    // ============= 类成员变量定义 =============
    // 请不要预设初始值, 如果有需要加入初始值的话, 在 constructor 里
    // 调用 this.setDefaults({key: defaultValue})

    @observable searchPageVM;

    /**
     * =================== observable props for SearchPageComp ====================
     * 以下区域为 SearchPageComp 所需的 observable 字段, 如有需要 (不需要), 则反注释 (注释) 即可
     */
    @observable searchConfig;
    @observable itemPropSet;

    @observable tableColumnsOrder;

    @observable createModalFieldsOrder;
    @observable createModalProps;
    @observable createFormProps;

    @observable editModalFieldsOrder;
    @observable editModalProps;
    @observable editFormProps;

    @observable tableProps;
    @observable tableActionColumnProps;

    layout;

    // ============= 类 getter 定义 =============

    // ============= 类 setter 定义 =============

    // ============= UI handlers =============
    /**
     * @return promise
     */
    handleSaveDataItem = (rawData, isCreatingNewItem) => {
        // 进行一些非公用的数据适配
        // 注意!! 如果是公用的数据适配, 请统一写到 API 层

        // 调用 Save 的 API Service, 应 return 一个 promise
        return;
    };

    /**
     * @return undefined | promise
     */
    handleItemSaved = (resp, itemInEdit, isCreatingNewItem, resultList) => {
        if (!isCreatingNewItem) {
            // 如果当前为 "数据编辑" 做一些相应的处理
            // 如, 后端有一些特殊的数据转换, 需要回写到 itemInEdit 里

            return;
        }

        // 如果当前为 "新增编辑" 做一些相应的处理
        // 尤其是 ID 的重新更新回 itemInEdit
        // 如, 后端有一些特殊的数据转换, 需要回写到 itemInEdit 里
    };

    /**
     * @return promise
     */
    handleSearchData = (conditionValues, {pageNum, pageSize}) => {
        // 进行一些非公用的数据适配
        // 注意!! 如果是公用的数据适配, 请统一写到 API 层

        // 调用 Search 的 API Service, 应返回一个 promise
        return;
    };

    // ============= 类成员方法定义 =============

    constructor(initData, syncConfig) {
        super(undefined, syncConfig);
        this.setProps(initData);

        this.initProps();
    }

    @action
    initProps() {
        // 如果有公用的一些 Promise 可以在这里写
        const ledgerOptionsPromise = getLedgerIdOptions(pcNormalAgentTheme);

        const dataConfig = /*plop get{{searchPageVarKey}}DataConfig plop*//*skip*/getPersonalCostDataConfig/*skip*/(this, {
            // 传入一些必要的 promise | 变量 等
            ledgerOptionsPromise,
        });

        const searchConfig = /*plop get{{searchPageVarKey}}SearchConfig plop*//*skip*/getPersonalCostSearchConfig/*skip*/(this, {
            // 传入一些必要的 promise | 变量 等
            ledgerOptionsPromise,
        });

        // 以下部分注释掉的方法, 需要额外实现
        this.searchPageVM = new SearchPageVM({
            shouldShowSearchPanel: true,
            // shouldShowSearchBar: false,
            // shouldSearchAtFirstLoad: false,
            // shouldShowActionPanel: true,

            itemIdKey: 'id',

            onSearchData: this.handleSearchData,

            modalExtra: {
                // onModalShown: this.handleModalShown,

                onSaveItem: this.handleSaveDataItem,
                onItemSaved: this.handleItemSaved,

                // onCreateValueItem,
                // onCloneValueItem,
                // onResetValueItem,
                // onCombineValueToConfig,
                // onChangeValue,
            },

            onRenderColumnActions: () => {
                return [presetItem('edit')];
            },

            onRenderLeftPanel: () => {
                return [presetItem('add', {
                    text: '新增按钮'
                })];
            },
            onRenderRightPanel: () => {
                return [];
            },

            onItemInEditChanged: dataConfig.onItemInEditChanged,

            // paginationOptions: [10, 20, 30, 50],
        })
            .syncFrom(
                this,
                'searchConfig',
                'itemPropSet',

                'tableColumnsOrder',

                // 'createModalFieldsOrder',
                // 'createModalProps',
                // 'createFormProps',

                'editModalFieldsOrder',
                // 'editModalProps',
                // 'editFormProps',

                // 'tableProps',
                'tableActionColumnProps',
            );

        this.setProps({
            searchConfig: searchConfig.searchConfig,

            itemPropSet: dataConfig.itemPropSet,

            tableColumnsOrder: dataConfig.tableColumnsOrder,
            tableActionColumnProps: dataConfig.tableColumnProps,

            editModalFieldsOrder: dataConfig.editModalFieldsOrder
        });
    }

    // Reaction 控制

    /*{{#if (not shouldUseReaction)}}// {{/if}}*/reactions = new ReactionManager();

    prepare(props) {
        this.layout = props.app.layout;
    }

    @action
    init(props) {
        // 在此注册一些状态联动
        // this.reaction.reaction( /* ... */ );
    }

    update(nextProps) {
    }

    exit(props) {
        /*{{#if (not shouldUseReaction)}} // {{/if}}*/ this.reactions.dispose();
    }
}

export default /* {{pageClass}} *//*skip*/State/*skip*/;
