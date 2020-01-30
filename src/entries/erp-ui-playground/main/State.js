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

    @observable showDemoDrawer = false

    @observable demoListWidth = 800

    triggerDemoDrawer = target => {
        const result = typeof target === 'boolean' ? target : !this.showDemoDrawer
        this.setProps({
            showDemoDrawer: result
        })
    }

    @observable usedCompsDataArray = []

    @action pushUsedCompData = data => {
        this.usedCompsDataArray.push(data)
    }

    @observable usedCompsDataArrayPosition = null

    @observable playgroundWidth = 800
    @observable playgroundHeight = 600

    // ##### 中间 实际内容(默认下的全屏) #####

    @observable showDemoDrawer = false

    // ##### 右侧 属性编辑器 #####

    @observable componentInEditId = ''

    @computed get componentInEditData() {
        return this.usedCompsDataArray.find(item => {
            return item.id === this.componentInEditId
        }) || null
    }

    // 1. 编辑某组件 prop 时, 直接修改数组的对应项即可
    @action targetPropsChangeHandler = data => {
        for (let key in data) {
            if (data.hasOwnProperty((key))) {
                this.componentInEditData.originCompProps[key] = data[key]
                console.log('target props changed', key, this.componentInEditData.originCompProps[key])
            }
        }
    }

    // 2. 但 state 只能从内部更改
    // 因此获取到其 setState 的引用, 在修改数组的对应项的同时调用
    @observable setComponentInEditState = null
    @action targetStateChangeHandler = data => {
        const {
            setComponentInEditState,
            componentInEditData
        } = this
        if (typeof setComponentInEditState === 'function') {
            setComponentInEditState(data)
        }
        for (let key in data) {
            if (data.hasOwnProperty((key))) {
                componentInEditData.originCompState[key] = data[key]
                console.log('target state changed', key, componentInEditData.originCompState[key])
            }
        }
    }

}

export default MainState
