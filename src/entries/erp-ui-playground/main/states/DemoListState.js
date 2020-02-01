import * as React from 'react'
import {default as c} from 'classnames'
import {toJS, computed, observable, action} from 'mobx'
import {observer} from 'mobx-react'
import BaseModel from '../utils/BaseModel'

export default class State extends BaseModel {

    // 编辑中标识
    @observable editingFlag = false

    // 请求中标识
    @observable loadingFlag = false

    @observable expandedDemoPanelLabel = 'Icon'

    setExpandedDemoPanelLabel = key => {
        this.setProps({
            expandedDemoPanelLabel: key
        })
    }

}
