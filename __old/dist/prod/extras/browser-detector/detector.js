/* eslint-disable */

/**
 * 浏览器检测，主要用于探测不支持的浏览器
 * */

/**
 * 主流浏览器支持配置
 * 以下仅是默认配置，项目中根据需求配置，但不要 sync 回 seed
 *
 * lowest: 最低支持版本，低于该版本不启动 app
 * recommended: 弱支持版本，对于能启动 app 的浏览器，如果提供 recommended 版本，低于此版本会在 app 中弹出"升级浏览器"引导弹窗
 *
 * 可以 https://github.com/browserslist/browserslist 作为参考，如
 *   npx browserslist "last 2 version"
 *   npx browserslist ">1% in AS"
 *
 * @todo: 或许可以根据 browserlist 生成默认配置
 * */
window.MAJOR_BROWSER = {
    chrome: {
        lowest: '60'
    },
    firefox: {
        lowest: '50'
    },
    safari: {
        recommended: '12',
        lowest: '10'
    },
    edge: {
        recommended: '17',
        lowest: '16'
    },
    ie: {
        recommended: '11',
        lowest: '10'
    }
};

/**
 * detect-browser 结果，或被 组件库组件/项目layout组件 依赖
 * */
window.BROWSER = null;

/**
 * 推荐使用高级浏览器的提示的 cookie key
 * */
window.BROWSER_RECOMMENDED_MESSAGE_COOKIE_KEY = 'erp_browser_recommended_message_timestamp';

/**
 * 推荐使用高级浏览器的提示信息显示周期
 * 如果希望显示一次后就不再显示，可设为 undefined
 * */
window.BROWSER_RECOMMENDED_MESSAGE_EXPIRED_DAY = 31;

/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
    var registeredInModuleLoader = false;
    if (typeof define === 'function' && define.amd) {
        define(factory);
        registeredInModuleLoader = true;
    }
    if (typeof exports === 'object') {
        module.exports = factory();
        registeredInModuleLoader = true;
    }
    if (!registeredInModuleLoader) {
        var OldCookies = window.Cookies;
        var api = window.Cookies = factory();
        api.noConflict = function () {
            window.Cookies = OldCookies;
            return api;
        };
    }
}(function () {
    function extend () {
        var i = 0;
        var result = {};
        for (; i < arguments.length; i++) {
            var attributes = arguments[ i ];
            for (var key in attributes) {
                result[key] = attributes[key];
            }
        }
        return result;
    }

    function init (converter) {
        function api (key, value, attributes) {
            var result;
            if (typeof document === 'undefined') {
                return;
            }

            // Write

            if (arguments.length > 1) {
                attributes = extend({
                    path: '/'
                }, api.defaults, attributes);

                if (typeof attributes.expires === 'number') {
                    var expires = new Date();
                    expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
                    attributes.expires = expires;
                }

                // We're using "expires" because "max-age" is not supported by IE
                attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

                try {
                    result = JSON.stringify(value);
                    if (/^[\{\[]/.test(result)) {
                        value = result;
                    }
                } catch (e) {}

                if (!converter.write) {
                    value = encodeURIComponent(String(value))
                        .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
                } else {
                    value = converter.write(value, key);
                }

                key = encodeURIComponent(String(key));
                key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
                key = key.replace(/[\(\)]/g, escape);

                var stringifiedAttributes = '';

                for (var attributeName in attributes) {
                    if (!attributes[attributeName]) {
                        continue;
                    }
                    stringifiedAttributes += '; ' + attributeName;
                    if (attributes[attributeName] === true) {
                        continue;
                    }
                    stringifiedAttributes += '=' + attributes[attributeName];
                }
                return (document.cookie = key + '=' + value + stringifiedAttributes);
            }

            // Read

            if (!key) {
                result = {};
            }

            // To prevent the for loop in the first place assign an empty array
            // in case there are no cookies at all. Also prevents odd result when
            // calling "get()"
            var cookies = document.cookie ? document.cookie.split('; ') : [];
            var rdecode = /(%[0-9A-Z]{2})+/g;
            var i = 0;

            for (; i < cookies.length; i++) {
                var parts = cookies[i].split('=');
                var cookie = parts.slice(1).join('=');

                if (!this.json && cookie.charAt(0) === '"') {
                    cookie = cookie.slice(1, -1);
                }

                try {
                    var name = parts[0].replace(rdecode, decodeURIComponent);
                    cookie = converter.read ?
                        converter.read(cookie, name) : converter(cookie, name) ||
                        cookie.replace(rdecode, decodeURIComponent);

                    if (this.json) {
                        try {
                            cookie = JSON.parse(cookie);
                        } catch (e) {}
                    }

                    if (key === name) {
                        result = cookie;
                        break;
                    }

                    if (!key) {
                        result[name] = cookie;
                    }
                } catch (e) {}
            }

            return result;
        }

        api.set = api;
        api.get = function (key) {
            return api.call(api, key);
        };
        api.getJSON = function () {
            return api.apply({
                json: true
            }, [].slice.call(arguments));
        };
        api.defaults = {};

        api.remove = function (key, attributes) {
            api(key, '', extend(attributes, {
                expires: -1
            }));
        };

        api.withConverter = init;

        return api;
    }

    return init(function () {});
}));

(function () {
    var browser = detect();
    // handle the case where we don't detect the browser
    var supportedBrowser = null;

    window.BROWSER = browser;
    if (browser) {
        supportedBrowser = window.MAJOR_BROWSER[browser.name];
    }

    if (supportedBrowser) {
        // 主流浏览器，明确最低支持版本
        if (versionCompare(browser.version, supportedBrowser.lowest) < 0) {
            showRecommendMessage(true);
            makeAppDisabled();
            // console.log('app did not launched, browser: ' + JSON.stringify(browser));
        }
        else if (versionCompare(browser.version, supportedBrowser.recommended) > -1) {
            Cookies.remove(window.BROWSER_RECOMMENDED_MESSAGE_COOKIE_KEY, {path: ''})
        }
        else if (!Cookies.get(window.BROWSER_RECOMMENDED_MESSAGE_COOKIE_KEY)) {
            showRecommendMessage();
            Cookies.set(window.BROWSER_RECOMMENDED_MESSAGE_COOKIE_KEY, new Date().getTime(), {
                expires: window.BROWSER_RECOMMENDED_MESSAGE_EXPIRED_DAY,
                path: ''
            });
        }
    }

    function versionCompare(l, r) {
        var left = l && l.split('.') || ['-1'];
        var right = r && r.split('.') || ['-1'];

        for (var i = 0; i < 3; i++) {
            // l < r
            if (~~left[i] < ~~right[i]) {
                return -1;
            }

            // r > l
            if (~~left[i] > ~~right[i]) {
                return 1;
            }

            // maybe equal continue
        }

        // l is equal to r
        return 0;
    }

    function makeAppDisabled() {
        var $root = document.getElementById('root');
        if ($root) {
            document.body.removeChild($root);
        }
    }

    function showRecommendMessage(isUnsupported) {
        // 或许需要提成配置
        var message = isUnsupported ? [
            '版本过低，请您使用推荐浏览器：Chrome / Firefox / Safari / Edge 最新版'
        ] : [
            '版本稍低，推荐您使用浏览器：Chrome / Firefox / Safari / Edge 最新版，以获得最佳体验'
        ];

        var $msgWrap = document.createElement('div');
        var $msgImg = document.createElement('img');
        var $msgText = document.createElement('div');
        var $msgCloseBtn = document.createElement('a')
        var $style = document.createElement('style')

        $style.innerText = '.browser-recommended-message a:hover { text-decoration: underline; }'

        document.body.style.padding = '0';
        document.body.style.margin = '0';

        $msgWrap.className = 'browser-recommended-message';
        $msgWrap.style.fontFamily = 'PingFang sc, Microsoft YaHei, STXihei, Arial, Helvetica, sans-serif';
        $msgWrap.style.fontSize = '14px';
        $msgWrap.style.textAlign = 'center';
        $msgWrap.style.lineHeight = '1.5';
        $msgWrap.style.position = 'fixed';
        $msgWrap.style.background = 'rgba(255,255,255,.4)';
        $msgWrap.style.top = 0;
        $msgWrap.style.left = 0;
        $msgWrap.style.bottom = 0;
        $msgWrap.style.right = 0;
        $msgWrap.style.zIndex = 99999;  // 上天

        $msgText.style.marginTop = '20px';

        $msgImg.style.marginTop = '20px';
        $msgImg.src = '../extra/browser-detector/unsupported-browser.png';
        $msgImg.onload = function () {
            appendChild($msgWrap, $msgText);
        };

        var $msgLine
        for (var i = 0; i < message.length; i++) {
            $msgLine = document.createElement('div');
            $msgLine.innerText = message[i];
            $msgText.appendChild($msgLine);
            appendChild($msgText, $msgLine);
        }

        if (!isUnsupported) {
            // message 可关闭
            $msgCloseBtn.innerText = 'OK, 继续访问';
            $msgCloseBtn.style.color = '#3795e5';
            $msgCloseBtn.style.cursor = 'pointer';

            $msgCloseBtn.addEventListener('click', function () {
                document.body.removeChild($msgWrap)
            });
            appendChild($msgText, $msgCloseBtn);
        }
        appendChild($msgWrap, $msgImg);

        appendChild(document.head, $style);
        appendChild(document.body, $msgWrap);
    }

    function appendChild(target, elem) {
        target.insertAdjacentElement('beforeend', elem);
    }

    /**
     * detect-browser
     * https://github.com/DamonOehlman/detect-browser
     * version 3.0.1
     * MIT Copyright (c) 2018 Damon Oehlman damon.oehlman@gmail.com
     * */
    function detect() {
        if (typeof navigator !== 'undefined') {
            return parseUserAgent(navigator.userAgent);
        }

        return getNodeVersion();
    }

    function detectOS(userAgentString) {
        var rules = getOperatingSystemRules();
        var detected = rules.filter(function (os) {
            return os.rule && os.rule.test(userAgentString);
        })[0];

        return detected ? detected.name : null;
    }

    function getNodeVersion() {
        var isNode = typeof process !== 'undefined' && process.version;
        return isNode && {
            name: 'node',
            version: process.version.slice(1),
            os: process.platform
        };
    }

    function parseUserAgent(userAgentString) {
        var browsers = getBrowserRules();
        if (!userAgentString) {
            return null;
        }

        var detected = browsers.map(function (browser) {
            var match = browser.rule.exec(userAgentString);
            var version = match && match[1].split(/[._]/).slice(0, 3);

            if (version && version.length < 3) {
                version = version.concat(version.length == 1 ? [0, 0] : [0]);
            }

            return match && {
                name: browser.name,
                version: version.join('.')
            };
        }).filter(Boolean)[0] || null;

        if (detected) {
            detected.os = detectOS(userAgentString);
        }

        if (/alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/i.test(userAgentString)) {
            detected = detected || {};
            detected.bot = true;
        }

        return detected;
    }

    function getBrowserRules() {
        return buildRules([
            ['aol', /AOLShield\/([0-9\._]+)/],
            ['edge', /Edge\/([0-9\._]+)/],
            ['yandexbrowser', /YaBrowser\/([0-9\._]+)/],
            ['vivaldi', /Vivaldi\/([0-9\.]+)/],
            ['kakaotalk', /KAKAOTALK\s([0-9\.]+)/],
            ['samsung', /SamsungBrowser\/([0-9\.]+)/],
            ['chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/],
            ['phantomjs', /PhantomJS\/([0-9\.]+)(:?\s|$)/],
            ['crios', /CriOS\/([0-9\.]+)(:?\s|$)/],
            ['firefox', /Firefox\/([0-9\.]+)(?:\s|$)/],
            ['fxios', /FxiOS\/([0-9\.]+)/],
            ['opera', /Opera\/([0-9\.]+)(?:\s|$)/],
            ['opera', /OPR\/([0-9\.]+)(:?\s|$)$/],
            ['ie', /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/],
            ['ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/],
            ['ie', /MSIE\s(7\.0)/],
            ['bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/],
            ['android', /Android\s([0-9\.]+)/],
            ['ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/],
            ['safari', /Version\/([0-9\._]+).*Safari/],
            ['facebook', /FBAV\/([0-9\.]+)/],
            ['instagram', /Instagram\s([0-9\.]+)/],
            ['ios-webview', /AppleWebKit\/([0-9\.]+).*Mobile/]
        ]);
    }

    function getOperatingSystemRules() {
        return buildRules([
            ['iOS', /iP(hone|od|ad)/],
            ['Android OS', /Android/],
            ['BlackBerry OS', /BlackBerry|BB10/],
            ['Windows Mobile', /IEMobile/],
            ['Amazon OS', /Kindle/],
            ['Windows 3.11', /Win16/],
            ['Windows 95', /(Windows 95)|(Win95)|(Windows_95)/],
            ['Windows 98', /(Windows 98)|(Win98)/],
            ['Windows 2000', /(Windows NT 5.0)|(Windows 2000)/],
            ['Windows XP', /(Windows NT 5.1)|(Windows XP)/],
            ['Windows Server 2003', /(Windows NT 5.2)/],
            ['Windows Vista', /(Windows NT 6.0)/],
            ['Windows 7', /(Windows NT 6.1)/],
            ['Windows 8', /(Windows NT 6.2)/],
            ['Windows 8.1', /(Windows NT 6.3)/],
            ['Windows 10', /(Windows NT 10.0)/],
            ['Windows ME', /Windows ME/],
            ['Open BSD', /OpenBSD/],
            ['Sun OS', /SunOS/],
            ['Linux', /(Linux)|(X11)/],
            ['Mac OS', /(Mac_PowerPC)|(Macintosh)/],
            ['QNX', /QNX/],
            ['BeOS', /BeOS/],
            ['OS/2', /OS\/2/],
            ['Search Bot', /(nuhk)|(Googlebot)|(Yammybot)|(Openbot)|(Slurp)|(MSNBot)|(Ask Jeeves\/Teoma)|(ia_archiver)/]
        ]);
    }

    function buildRules(ruleTuples) {
        return ruleTuples.map(function (tuple) {
            return {
                name: tuple[0],
                rule: tuple[1]
            };
        });
    }

    /** detect-browser end */

})();
