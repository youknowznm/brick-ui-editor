/**
 * @file tool utils
 * @description 工具类
 * @author meijingjing
 */


const joinParams = params => {
    let queryStr = [];
    if (params) {
        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                const keyStr = encodeURI(encodeURI(params[key] || ''));
                queryStr.push(`${key}=${keyStr}`);
            }
        }
    }
    return queryStr.join('&');
};

export const decodeParams = params => {
    const query = {};
    if (params) {
        for (let key in params) {
            try {
                query[key] = JSON.parse(decodeURI(params[key]));
            }
            catch (e) {
                query[key] = decodeURI(params[key]);
            }

        }
    }

    return query;
};

// 是否function
export const isFunc = name => {
    return typeof name === 'function';
};

// 页面替换
export const replacePage = (opts = {
    params: {},
    title: '',
    url: ''
}) => {
    const {params, title, url} = opts;
    const query = joinParams(params);
    const href = query ? `#/${url}?${query}` : `#/${url}`;

    window.location.replace(href);
};

// 页面跳转
export const jumpPage = (opts = {
    params: {},
    title: '',
    url: ''
}) => {
    const {params, title, url} = opts;

    const query = joinParams(params);
    const href = query ? `#/${url}?${query}` : `#/${url}`;

    window.location.href = href;
};


// 替换路径
export const replaceUrlParam = (url, params) => {
    const p = url.match(/\{(.+?)\}/g);

    if (p === null) {
        return url;
    }

    let formatUrl = url;
    p.forEach(d => {
        const name = d.replace(/^\{+|\}+$/g, '');
        formatUrl = formatUrl.replace(d, params[name]);
    });

    return formatUrl;
};


// filter: blur 的属性操作
export const filterBlur = (elem, shouldBlur) => {
    if (elem) {
        if (shouldBlur) {
            elem.classList.add('gaussian-blur');
        }
        else {
            elem.classList.remove('gaussian-blur');
        }
    }
};

// 秒处理成mm:ss
export const mSToMMSS = ms => {
    if (isNaN(ms)) {
        return '';
    }

    let s;
    let m;

    s = Math.floor(ms / 1000) % 60;
    s = s < 10 ? `0${s}` : s;

    m = Math.floor(ms / (1000 * 60));
    m = m < 10 ? `0${m}` : m;

    return `${m}:${s}`;
};
