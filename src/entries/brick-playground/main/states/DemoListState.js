import * as React from 'react'
import {observable} from 'mobx'
import BaseModel from '../utils/BaseModel'

export default class State extends BaseModel {

    @observable expandedDemoPanelLabel = ''

    setExpandedDemoPanelLabel = key => {
        this.setProps({
            expandedDemoPanelLabel: key
        })
    }

}
