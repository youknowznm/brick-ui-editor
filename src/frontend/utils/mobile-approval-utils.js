import {deprecatedWarning} from '@befe/utils/dev-related/index';
import _ from 'lodash';

if (__DEVELOPMENT__) {
    deprecatedWarning({
        module: 'mobile-approve-utils.js',
        since: '2018-10-26',
        next: '待定',
        message: '由梁冬统一进行基础层面上的考量, 进行底层的抽象隔离'
    });
}

let inited = false;
let mobileApproval = {};
let BdHiJs = {};

let heightSyncingTimer;

// window.APPROVAL_PROXY_URL 接口人 : 郭超超 (移动审批后端负责人) 配的
const URL_PREFIX = window.APPROVAL_PROXY_URL + window.DEPLOY_URLS.serverUrl;

let isHiJSSDKReady = false;

const ua = window.navigator.userAgent.toLowerCase();
const ISBDHI = !!ua.match(/baiduhi/i);
const hiReadyQueue = [];
let hasBoundHiReadyCallback = false;

/**
 * 需要在所有 mobileApproval 适配的方法第一行调用
 *
 * @def: function
 */
function checkIfInited() {
    if (!inited) {
        alert('移动审批程序没有正确加载, 请稍后重试或联系系统管理员.');
        throw new Error('Mobile approval is not initialized, please call mobileApprovalUtils.init( mobileApproval ) '
            + 'prior to using it.');
    }
}

const mobileApprovalUtils = {
    // ========== 移动审批 =========
    init(injectedMobileApproval) {
        mobileApproval = injectedMobileApproval;

        if (injectedMobileApproval) {
            inited = true;
        }

    },

    /**
     * @def: opts => undefined
     *  opts: {}
     *      // 如果需要, 传入一个获取根内容节点的方法, 用于适配不同的场景
     *      getContentElem: () => Elem | undefined
     */
    syncHeight(opts = {}) {
        checkIfInited();

        if (!heightSyncingTimer) {
            let pageHeight = 0;

            heightSyncingTimer = setInterval(
                () => {
                    const contentElem = opts.getContentElem ? opts.getContentElem() : document.querySelector('#root');
                    const currentPageHeight = contentElem.clientHeight;

                    if (currentPageHeight !== pageHeight) {
                        mobileApproval.init.windowResize(contentElem.clientWidth, currentPageHeight);
                        pageHeight = currentPageHeight;
                    }

                },
                500
            );
        }

    },

    parseInitData() {
        const initData = JSON.parse(window.INIT_DATA);

        // @todo:temp 移除这里的 console.log
        console.log('initData = ', Object.assign({}, initData));

        return initData;
    },

    /**
     * @def: opts => undefined?
     *  opts: {}
     *      url: string
     *      key: string
     *      listener: (key, msg) => undefined?
     */
    newPage(opts) {
        checkIfInited();

        mobileApproval.bdHiJs.newPage(opts);
    },

    getProxyAbsoluteUrl(url = '') {
        if (url.substr(0, 1) === '/') {
            url = url.substr(1);
        }

        return URL_PREFIX + url;
    },

    getBPMProxyUrl() {
        return window.APPROVAL_PROXY_URL;
    },

    /**
     * @def: operation, method => undefined
     *  operation: 'complete': 确认 | 'reject': 拒绝 >
     *      | 'question': 请求 | 'reassign': 转发 >
     *      | 'reply': 回复 | 'giveBack': 回退
     *  method: () => operationResult
     *      operationResult: {}
     *          isValid: boolean
     *          message: string
     *
     *          // key：value形式，请勿传递嵌套object
     *          data: {}
     */
    setOperation(operation, method) {
        checkIfInited();

        mobileApproval.operation[operation] = method;
    },

    // ============= BDHiJSSDK ==============

    /**
     * 请注意这个调用必须在任何异步调用之前!!!
     * 否则, hi ready callback 可能压根不会触发!!!
     *
     * @def: () => promise
     */
    ensureHiJSSDK() {
        if (!ISBDHI) {
            isHiJSSDKReady = true;
        }

        if (isHiJSSDKReady) {
            return Promise.resolve(mobileApprovalUtils);
        }

        if (!hasBoundHiReadyCallback) {
            hasBoundHiReadyCallback = true;

            // console.log('before ensured', hiReadyQueue);

            window.onBdHiJsReady = () => {
                isHiJSSDKReady = true;
                BdHiJs = window.BdHiJs;

                hiReadyQueue.forEach(
                    resolve => resolve(mobileApprovalUtils.hi)
                );
            };
        }

        return new Promise(resolve => {
            hiReadyQueue.push(resolve);
        });
    },

    hi: {},

    /**
     * 请查阅: http://wiki.baidu.com/pages/viewpage.action?pageId=393976043
     * 如果有需要用到的 hijssdk 接口, 请在这里按规范加入
     *
     * @def: config => undefined
     *  config: {adaptedAPIMethodName: apiPathAtJSSDK}
     *      // 最后注入到 hi 里的方法
     *      adaptedAPIMethodName: string
     *
     *      // 如 baidu.appnative.menu.setButton => 'appnative.menu.setButton'
     *      // 使用 _.get 来获取得到
     *      apiPathAtJSSDK: string
     */
    wrapHiJSSDKActions(config) {
        for (let key in config) {
            if (!config.hasOwnProperty(key)) {
                continue;
            }

            const apiPath = config[key];

            /**
             * @def: adaptedAPIMethod: options => promise
             *  // 对标 BdHiJsSdk 中的接口
             *  options: {data, onsuccess, onerror, listener}
             *
             *  promise: Promise
             *      then: (success, fail) => Promise
             *          success: #@.hi => undefined
             *          fail: () => undefined
             *      catch: (#@.fail) => Promise
             */
            this.hi[key] = (options = {}) => {

                // 如果是开发模式, 做本地适配 (为了让流程能跑下去)
                if (__DEVELOPMENT__) {
                    if (!ISBDHI) {
                        return mobileApprovalUtils.ensureHiJSSDK()
                            .then(() => {
                                console.log('invoked', apiPath, options);
                                return mobileApprovalUtils.hi;
                            });
                    }
                }

                return mobileApprovalUtils.ensureHiJSSDK()
                    .then(() => new Promise((resolve, reject) => {
                        const apiMethod = _.get(BdHiJs, apiPath);
                        let originSuccess;
                        let originFail;

                        // 保留原始的 onsuccess / onfail 回调逻辑
                        if (options.onsuccess) {
                            originSuccess = options.onsuccess;
                        }

                        if (options.onfail) {
                            originFail = options.onfail;
                        }

                        // 注入 resolve / reject
                        options.onsuccess = (...args) => {
                            // console.log('success ', apiPath);

                            originSuccess && originSuccess.apply(options, args);
                            resolve(mobileApprovalUtils.hi);
                        };

                        options.onfail = (...args) => {
                            originFail && originFail.appy(options, args);
                            reject.apply(null, args);
                        };

                        // 如果是开发模式, 弹出出错提醒
                        if (__DEVELOPMENT__) {
                            if (!apiMethod) {
                                alert(`${apiPath} doesn't exist.`);
                            }
                        }

                        // console.log('invoked : ', apiMethod);
                        apiMethod.call(null, options);
                    }));
            };
        }
    }
};

mobileApprovalUtils.wrapHiJSSDKActions(
    {
        setMenuButton: 'appnative.menu.setButton',
        addWebViewMsgKey: 'appnative.webview.addMsgKey',
        sendWebViewMessage: 'appnative.webview.msgSend',
        quit: 'appnative.app.quit'
    }
);

export default mobileApprovalUtils;
