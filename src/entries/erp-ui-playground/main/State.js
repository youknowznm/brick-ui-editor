/**
 * @author zhangenming
 */

import * as React from 'react'
import {default as c} from 'classnames'
import {toJS, computed, observable, action} from 'mobx'
import {observer} from 'mobx-react'
import BaseModel from './utils/BaseModel'

class MainState extends BaseModel {

    // ##### 全局 #####

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

    @observable showDemoListDrawer = false

    @observable demoListWidth = 800

    triggerDemoDrawer = target => {
        const result = typeof target === 'boolean' ? target : !this.showDemoListDrawer
        this.setProps({
            showDemoListDrawer: result
        })
    }

    @observable usedCompsDataArray = []

    @action pushUsedCompData = data => {
        this.usedCompsDataArray.push(data)
    }

    @observable usedCompsDataArrayPosition = null
    @observable playgroundWidth = 0
    @observable playgroundHeight = 0

    // ##### 中间 实际内容(默认下的全屏) #####

    @observable showDemoListDrawer = false

    // ##### 右侧 属性编辑器 #####

    @observable componentInEditId = ''

    setEditingComponentId = id => {
        this.setProps({
            componentInEditId: id
        })
    }

    @computed get componentInEdit() {
        return this.usedCompsDataArray.find(item => {
            return item.id === this.componentInEditId
        }) || null
    }
}

export default MainState
