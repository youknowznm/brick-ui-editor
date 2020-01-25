import {StringKeyMap} from '../utils'

declare global {
    // tslint:disable-next-line
    interface Window {
        ENTRY_NAME: string
        WEB_CONTEXT: string
        API_CONTEXT: string
        ERP_HOME_URL: string
        SERVER_EXTRA: StringKeyMap<any>
    }
}

export const ENTRY_NAME = window.ENTRY_NAME
export const WEB_CONTEXT = window.WEB_CONTEXT
export const API_CONTEXT = window.API_CONTEXT
export const ERP_HOME_URL = window.ERP_HOME_URL
export const SERVER_EXTRA = window.SERVER_EXTRA
