import * as React from 'react'
import {observable} from 'mobx'
import BaseModel from '../utils/BaseModel'

export default class State extends BaseModel {

  @observable showRemoveConfirmFlag = false

  triggerConfirmFlag = target => {
    const result = typeof target === 'boolean' ? target : !this.showRemoveConfirmFlag
    this.setProps({
      showRemoveConfirmFlag: result
    })
  }
}
