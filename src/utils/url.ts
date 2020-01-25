/**
 * @todo: 待完善与整理，或有重新设计的必要
 */
import {API_CONTEXT, WEB_CONTEXT} from '../constants'
import {StringKeyMap} from './types'
import {codeWarning, isDev} from './coding'


type Href = string
interface UrlUtilsConfig {
    base?: string
    pagePath?: string
    webContext?: string
    apiContext?: string
}

function getBaseFromUrl(url: string) {
    const execResult = /https?:\/\/[^/]+/.exec(url)
    return execResult && execResult[0] || ''
}

function ensureSlashSyntax(path: string) {
    if (path) {
        if (path.substr(0, 1) !== '/') {
            path = '/' + path
        }
        if (path.substr(-1) === '/') {
            path = path.substring(0, -1)
        }
        return path
    }
    return ''
}

function ensureLeadingSlash(path: string) {
    if (path) {
        if (path.substr(0, 1) !== '/') {
            path = '/' + path
        }
        return path
    }
    return ''
}

function getQueryString(query: StringKeyMap) {
    if (!query) {
        return ''
    }

    const queryParts: string[] = []
    for (const key in query) {
        // 如果 query[key] 为 undefined, 则使用 &key& 的形式生成 query string
        if (typeof query[key] === 'undefined') {
            queryParts.push(encodeURIComponent(key))
        }
        else {
            queryParts.push(encodeURIComponent(key) + '=' + encodeURIComponent(query[key]))
        }
    }
    return queryParts.length ? '?' + queryParts.join('&') : ''
}

function resolveQueryString(queryString: string) {
    if (!queryString || typeof queryString !== 'string') {
        return {}
    }

    const queryParts = queryString.split('&')
    const query: StringKeyMap = {}
    queryParts.forEach(
        part => {
            const [rawKey, rawValue] = part.split('=')
            if (typeof rawValue === 'string') {
                query[decodeURIComponent(rawKey)] = decodeURIComponent(rawValue)
            }
        }
    )
    return query
}

function parsePageUrl(url = window.location.href) {
    const urlRgx = new RegExp(
        [
            // base #1
            '(https?:\\/\\/[^/]+)',

            // fullPath #2
            '(.*?)',

            // module #3
            '\\/([^/.]+)\\.html',

            // queryString #4
            '(?:\\?([^#]+))?',

            '(?:#',
            [
                // hashPath #4
                '([^?]+)',

                // hashQueryString #6
                '(?:\\?(.+))?',
            ].join(''),
            ')?',
        ].join('')
    )

    const urlMatch = urlRgx.exec(url)

    let fullMatchString
    let base
    let fullPath
    let queryString
    let entry
    let hashPath
    let hashQueryString


    if (urlMatch) {
        [fullMatchString, base, fullPath, entry, queryString, hashPath, hashQueryString] = urlMatch

        return {
            base,
            fullPath,
            query: resolveQueryString(queryString),
            entry,
            hashPath,
            hashQuery: resolveQueryString(hashQueryString),
        }
    }
    else if (isDev()) {
        console.warn(`UrlUtils: ${url} cannot be resolved against`, urlRgx)
    }

    return null
}

interface PageLinkOption {
    entry?: string
    query?: StringKeyMap
    shouldReturnFullPath?: boolean
}
interface UrlUtils {
    getApiLink: (path: string, query: StringKeyMap) => Href
    getPageLink: (
        hashPath: string,
        hashQuery: StringKeyMap,
        pageLinkOption: PageLinkOption
    ) => Href
    openRaw: (url: string) => void
    pushRaw: (url: string) => void
}

// @todo: @befe/utils
export const createUrlUtils = (
    {
        base,
        pagePath = '',
        webContext = '',
        apiContext = ''
    }: UrlUtilsConfig = {}
): UrlUtils => {
    apiContext = ensureSlashSyntax(apiContext)
    webContext = ensureSlashSyntax(webContext)

    if (!base) {
        base = location.origin || getBaseFromUrl(location.href)
    }

    if (pagePath) {
        pagePath = ensureSlashSyntax(pagePath)
    }
    else {
        const pagePathRgx = new RegExp(
            'https?:\\/\\/[^/]+'
            + webContext
            + '(\\/.*)?'
            + '\\/[^/]+\\.html'
        )
        const pagePathMatch = pagePathRgx.exec(location.href)
        if (pagePathMatch) {
            pagePath = pagePathMatch[1] || ''
        }
        else if (isDev()) {
            console.warn('无法抽取默认的 page path ! 所用的 reg exp 为', pagePathRgx)
        }
    }

    const getApiLink: UrlUtils['getApiLink'] = (path, query) => {
        path = ensureLeadingSlash(path)
        const queryString = getQueryString(query)

        return `${base}${apiContext}${path}${queryString}`
    }

    const getPageLink: UrlUtils['getPageLink'] = (
        hashPath: string,
        hashQuery = {},
        {
            entry,
            query = {},
            shouldReturnFullPath = false
        } = {}
    ) => {
        hashPath = ensureLeadingSlash(hashPath)
        const hashQueryString = getQueryString(hashQuery)
        const queryString = getQueryString(query)

        if (!entry && !queryString && !shouldReturnFullPath) {
            return `#${hashPath}${hashQueryString}`
        }

        const urlInfo = parsePageUrl()
        const entryName = entry || (urlInfo && urlInfo.entry) || ''
        return `${base}${webContext}${pagePath}/${entryName}.html${queryString}#${hashPath}${hashQueryString}`
    }
    const openRaw: UrlUtils['openRaw'] = (url) => {
        return window.open(url);
    }
    const pushRaw: UrlUtils['pushRaw'] = (url) => {
        window.location.href = url;
    };

    return {
        getApiLink,
        getPageLink,
        openRaw,
        pushRaw
    }
}

export const urlUtils = createUrlUtils({
    webContext: WEB_CONTEXT,
    apiContext: API_CONTEXT
})
