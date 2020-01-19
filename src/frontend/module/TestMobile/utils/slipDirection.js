/**
 * @file slipDirection.js
 *
 */

// 左滑
export const EVENT_LEFT_SLIP = 'left';

// 右滑
export const EVENT_RIGHT_SLIP = 'right';

// 上滑
export const EVENT_UP_SLIP = 'up';

// 下滑
export const EVENT_DOWN_SLIP = 'down';

// 点击
export const EVENT_TAP = 'tap';

// 长按
export const EVENT_LONG_TAP = 'long-tap';

export const slipDirection = (e, data) => {
    let type = '';

    if (e.touches && e.touches.length > 1 || !data) {
        return '';
    }

    if (Math.abs(data.y) < 10
        && Math.abs(data.x) < 10) {
        if (e.type === 'touchend') {
            type = Number(data.duration) < 300
                ? EVENT_TAP
                : EVENT_LONG_TAP;
        }
    }
    else {
        type = Math.abs(data.y) > Math.abs(data.x)
            ? (data.y > 0 ? EVENT_DOWN_SLIP : EVENT_UP_SLIP)
            : (data.x > 0 ? EVENT_RIGHT_SLIP : EVENT_LEFT_SLIP);
    }

    return type;
};

export const getEndPos = (e, pos) => {
    let touch = e.targetTouches[0] || e.changedTouches[0];
    return {
        x: touch.pageX - pos.x,
        y: touch.pageY - pos.y
    };
};
