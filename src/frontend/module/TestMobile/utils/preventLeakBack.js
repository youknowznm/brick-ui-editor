/**
 * @file 防止滚动时露出浏览器底部 utils
 * @description 工具类
 * @author meijingjing
 */

import {getEndPos, slipDirection} from './slipDirection';

export const IGNORE_PREVENT_DEFAULT = 'ignore-prevent-default';

// 模拟jquery 的closest方法
export const closest = (elem, selector) => {
    const mSelector = `.${selector}`;
    const matchesSelector = elem.matches
    || elem.webkitMatchesSelector
    || elem.mozMatchesSelector
    || elem.msMatchesSelector;

    while (elem) {
        if (matchesSelector.call(elem, mSelector)) {
            break;
        }

        elem = elem.parentElement;
    }
    return elem;
};

export const preventLeakBack = () => {
    const oversScroll = function (elem) {
        const pos = {};
        let top;
        let totalScroll;
        let offsetHeight;
        let ignoreElem;

        elem.addEventListener('touchstart', e => {
            ignoreElem = closest(e.target, IGNORE_PREVENT_DEFAULT);

            const touch = e.targetTouches[0] || e.changedTouches[0];
            pos.x = touch.pageX;
            pos.y = touch.pageY;

            if (ignoreElem) {
                top = ignoreElem.scrollTop;
                totalScroll = ignoreElem.scrollHeight;
                offsetHeight = ignoreElem.offsetHeight;
            }
            else {
                top = undefined;
                totalScroll = undefined;
                offsetHeight = undefined;
                ignoreElem = undefined;
            }
        });

        elem.addEventListener('touchmove', function (e) {
            const direction = slipDirection(e, getEndPos(e, pos));
            if (ignoreElem) {
                if ((direction === 'down' && top === 0)
                    || (direction === 'up' && top === totalScroll - offsetHeight)) {
                    e.preventDefault();
                }
            }
            else if (direction === 'up' || direction === 'down') {
                e.preventDefault();
            }

        }, {
            passive: false
        });
    };

    const elem = window.document.body;

    oversScroll(elem);
};
