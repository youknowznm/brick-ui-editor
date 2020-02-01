import {toJS, computed, observable, action} from 'mobx'

const LOCAL_STORAGE_KEY = 'EUP_PROFILE'

export const save = data => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toJS(data)))
}

export const load = data => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
}

export const getJSONString = data => {
    return localStorage.getItem(LOCAL_STORAGE_KEY)
}

