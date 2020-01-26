import * as React from 'react'
import {default as c} from 'classnames'
import {toJS, computed, observable, action} from 'mobx'
import {observer} from 'mobx-react'

export default class State {

    // 编辑中标识
    @observable editingFlag = false

    // 请求中标识
    @observable loadingFlag = false
}
