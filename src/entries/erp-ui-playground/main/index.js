/**
 * @author zhangenming
 */

import * as React from 'react'
import {default as c} from 'classnames'
import {toJS, computed, observable, action} from 'mobx'
import {observer} from 'mobx-react'
import BaseModel from './components/BaseModel'

import View from './View'
import moment from 'moment'

class IndexPageVM extends BaseModel {

    // ##### 全局 #####

    @observable loadingFlag = false

    triggerLoading = bool => {
        this.setProps({
            loadingFlag: bool
        })
    }

    @observable frameWindowRef = null

    @observable metaKeyPressing = false

    // ##### 头部 控制面板 #####

    @observable showControlPanelDrawer = false

    triggerControlPanelDrawer = target => {
        const result = typeof target === 'boolean' ? target : !this.showControlPanelDrawer
        this.setProps({
            showControlPanelDrawer: result
        })
    }

    // ##### 左侧 demo 容器 #####

    @observable componentLibName = 'erp-comps'

    @observable demoPageSrc = 'http://localhost:3008/main/components/button?embedded-in-eup=true'
    @observable demoPageWidth = 1160

    @observable showDemoPageDrawer = false

    triggerDemoDrawer = target => {
        const result = typeof target === 'boolean' ? target : !this.showDemoPageDrawer
        this.setProps({
            showDemoPageDrawer: result
        })
    }

    @observable componentsUsedDataArray = []

    @action pushUsedCompData = data => {
        this.componentsUsedDataArray.push(data)
    }

    @observable componentsUsedDataArrayPosition = null
    @observable playgroundWidth = 0
    @observable playgroundHeight = 0

    // ##### 中间 实际内容(默认下的全屏) #####

    @observable showDemoPageDrawer = false

    // ##### 右侧 属性编辑器 #####

    @observable componentInEditId = ''

    setEditingComponentId = id => {
        this.setProps({
            componentInEditId: id
        })
    }

    @computed get componentInEdit() {
        return this.componentsUsedDataArray.find(item => {
            return item.id === this.componentInEditId
        }) || null
    }
}

export default IndexPageVM
