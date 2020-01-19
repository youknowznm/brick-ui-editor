/**
 * @file MobileApproveModuleModule app 顶层状态, 本类会用来包含一些关键的 app 状态
 *                      以及 injectKey 注入进来的 page / layout 的 VM 实例
 * @author lzheng
 * @date 2018-08-02
 */

import {
    BaseModel,
    bindView as bind,
    observable,
    action
} from '@befe/utils/dev-pattern-vm/index-mobile';

import {
    urlUtils,
    mobileApprovalUtils
} from '../../../../wrapper/mobile';

import AppView from './AppView';

/**
 * @def: PageVM
 *  url: (text, limit)
 *      text: string
 *      limit: string | undefined (50)
 */

@bind(AppView)
class AppState extends BaseModel {
    moduleClassName = 'information-edit';

    @observable text = '';
    @observable wordingLimit = 50;

    @action
    handleTextChange = e => {
        this.text = e.target.value;
    };

    @action
    initData({text, limit}) {
        limit = ~~limit;
        if (limit) {
            this.wordingLimit = limit;
        }

        if (text) {
            this.text = text;
        }
    }

    setupMessageSaveCallback() {
        mobileApprovalUtils
            .hi
            .addWebViewMsgKey({
                data: 'information-edit-page'
            })
            .then(hi => hi.setMenuButton({
                data: {
                    name: '完成',
                    value: 'save'
                },
                listener: () => {
                    hi.sendWebViewMessage({
                        data: {
                            key: 'mobileApproval',
                            host: window.location.host,
                            msg: {
                                text: this.text
                            }
                        },
                        onsuccess() {
                            hi.quit();
                        }
                    });
                }
            }));
    }

    constructor(...args) {
        super(args);

        let search = window.location.search;
        if (/^\??url=/.test(search)) {
            search = search
                .replace(
                    /^\??url=[^?]+/, ''
            )
                .replace(/\?([^&]+)(&|$)/,
                    (_whole, firstParam, tailingPart) => {
                        return `?${decodeURIComponent(firstParam)}${tailingPart}`;
                    }
            );
        }

        const query = urlUtils.parseQuery(search);

        console.log(query, window.location.search, search);

        this.initData(query);
        this.setupMessageSaveCallback();
    }
}

export default AppState;
