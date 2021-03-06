import {toJS} from 'mobx'

export const BP_ARCHIVE_DATA_KEY = 'BP_ARCHIVE_DATA'
export const BP_ARCHIVE_NAME_KEY = 'BP_ARCHIVE_NAME'
export const BP_AUTHOR_KEY = 'BP_AUTHOR'
export const BUE_WIDTH_KEY = 'BUE_WIDTH'
export const BUE_HEIGHT_KEY = 'BUE_HEIGHT'

export const setStorage = (key, data) => {
  // console.log('save', toJS(data))
  localStorage.setItem(key, JSON.stringify(toJS(data)))
}

export const getStorage = key => {
  return JSON.parse(localStorage.getItem(key))
}
