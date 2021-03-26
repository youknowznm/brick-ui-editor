import {default as axios, AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios'
import {StringKeyMap, tuple} from 'src/utils/types'
import {urlUtils} from './url'
import {toast} from "@befe/brick";
// @todo: 待确定规范
const tupleResponseStatus = tuple(
    'ok',
    'fail',
    'warning',
    'need-login',
    'need-logout',
    'no-auth',
    'invalid-response-json',
    'request-failed'
)

interface ResponseJSON {
    status?: (typeof tupleResponseStatus)[number]
    code?: number | string
    data?: StringKeyMap<any>
    message?: string
    response?: AxiosResponse<ResponseJSON>
    error?: AxiosError | Error
}

const defaultRes = (response: any) => {
    console.log(response, 'mmm')
        const {data = {}} = response;
        if (
            !data
            || typeof data !== 'object'
            || !Object.keys(data).length
            || (data.status && !tupleResponseStatus.includes(data.status))
        ) {
            return {
                status: 'invalid-response-json',
                response,
            }
        }
        return {
            ...data,
            response,
        }
    }



const relogin = (resp: any) => {
    const {data = {}} = resp;
    if (data.code && '' + data.code === '600204' && typeof data.url === 'string') {
        urlUtils.pushRaw(urlUtils.getApiLink(data.url, {}));
    }
    return resp;
};

const error = (resp: any) => {
    const {data = {}} = resp;
    if (data.code && data.code !== 200) {
        toast.error(data.message || '出错了')
    }
    return resp;
}



// @todo: @befe/utils
export function createAjax(config?: AxiosRequestConfig) {
    const decoratedAjax = axios.create(config)
    // decoratedAjax.interceptors.response.use(jungede);
    // decoratedAjax.interceptors.request.use(res => {
    //     console.log(111, res)
    //     return res;
    // });
    // decoratedAjax.interceptors.response.use(res => {
    //     console.log(222, res)
    //     return res;
    // });
    decoratedAjax.interceptors.response.use(relogin);
    decoratedAjax.interceptors.response.use(error);
    decoratedAjax.interceptors.response.use(defaultRes);
    return decoratedAjax
}

// export function createAjax(config?: AxiosRequestConfig) {
//     const decoratedAjax = axios.create(config)
//     decoratedAjax.interceptors.response.use(
//         response => {
//             const {data = {}} = response
//             if (
//                 !data
//                 || typeof data !== 'object'
//                 || !Object.keys(data).length
//                 || (data.status && !tupleResponseStatus.includes(data.status))
//             ) {
//                 return {
//                     status: 'invalid-response-json',
//                     response,
//                 }
//             }
//
//             return {
//                 ...data,
//                 response,
//             }
//         },
//         error => {
//             return {
//                 status: 'request-failed',
//                 error,
//             }
//         })
//
//     return decoratedAjax
// }
