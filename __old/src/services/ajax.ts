import {API_CONTEXT} from 'src/constants'
import {createAjax} from 'src/utils'

/**
 * 通用 ajax
 */
export const ajax = createAjax({
    baseURL: API_CONTEXT,
    headers: {'X-Requested-With': 'XMLHttpRequest'},
})

// 如有需要，定制其他主题 ajax
// export const ajaxSomeTheme = createAjax({})
