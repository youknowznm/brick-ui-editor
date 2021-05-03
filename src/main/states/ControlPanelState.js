import * as React from 'react'
import {observable} from 'mobx'
import BaseModel from '../utils/BaseModel'

export default class State extends BaseModel {

  @observable showClearConfirmFlag = false

  triggerConfirmFlag = target => {
    const result = typeof target === 'boolean' ? target : !this.showClearConfirmFlag
    this.setProps({
      showClearConfirmFlag: result
    })
  }

  @observable showLoadArchiveConfirmFLag = false

  triggerLoadArchiveConfirmFLag = target => {
    const result = typeof target === 'boolean' ? target : !this.showLoadArchiveConfirmFLag
    this.setProps({
      showLoadArchiveConfirmFLag: result,
      archiveJSON: target === false ? '' : this.archiveJSON
    })
  }

  @observable archiveJSON = ''
}
