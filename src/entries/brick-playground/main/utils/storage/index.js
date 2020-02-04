import {toJS, computed, observable, action} from 'mobx'

const LOCAL_STORAGE_KEY = 'BRICK_PLAYGORUND_ARCHIVE'

export const save = data => {
    // console.log('save', toJS(data))
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(toJS(data)))
}

export const load = data => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
}

export const getJSONString = data => {
    return localStorage.getItem(LOCAL_STORAGE_KEY)
}
