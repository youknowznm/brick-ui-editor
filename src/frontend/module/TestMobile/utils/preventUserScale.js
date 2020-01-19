/**
 * @file 防止 ios 10 以上 safari 无法禁止缩放的问题
 * @description 工具类
 * @author meijingjing
 */

export const preventUserScale = function () {
    // 阻止双击放大
    let lastTouchEnd = 0;

    document.addEventListener('touchstart', e => {
        if (e.touches.length > 1) {
            e.preventDefault();
        }

    });

    document.addEventListener('touchend', e => {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }

        lastTouchEnd = now;
    });

    // 阻止双指放大
    document.addEventListener('gesturestart', e => {
        e.preventDefault();
    });
};
