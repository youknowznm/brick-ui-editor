/**
 * @author zhangenming
 */

import * as React from 'react'
import {default as c} from 'classnames'
import {toJS, computed, observable, action} from 'mobx'
import {observer} from 'mobx-react'
import BaseModel from './utils/BaseModel'
import {
    COMP_TYPES,
} from "./config";
import getSvgByName from "./utils/getSvgByName";

import {load, save} from "./utils/storage";

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

    triggerDemoDrawer = target => {
        const result = typeof target === 'boolean' ? target : !this.showDemoDrawer
        this.setProps({
            showDemoDrawer: result
        })
    }

    @observable usedCompsDataArray = []

    @action pushUsedCompData = data => {
        console.log('using demo comp:', data)
        let {
            originName,
            originProps
        } = data
        // const compTypeData = COMP_TYPES[originName]
        // for (let propType of compTypeData.editableProps) {
        //     const {
        //         key,
        //         type,
        //         defaultValue = '' // svg, children
        //     } = propType
        //     // 未显式声明时, 使用 default prop value
        //     if (originProps[key] === undefined) {
        //         originProps[key] = defaultValue
        //     }
        // }
        data.originProps = originProps
        data.deltaX = 0
        data.deltaY = 0
        this.usedCompsDataArray.push(data)
        this.saveUsedCompData()
    }

    @action removeUsedComp = () => {
        const targetIndex = this.usedCompsDataArray.findIndex(item => {
            return item.id === this.activeComponentId
        })
        this.setProps({
            activeComponentId: ''
        })
        this.usedCompsDataArray.splice(targetIndex, 1)
        this.saveUsedCompData()
    }

    @action clearAll = () => {
        this.usedCompsDataArray = []
        this.saveUsedCompData()
        this.toast('已清空画布。')
    }

    loadUsedCompData = () => {
        const profile = load()
        if (profile) {
            this.setProps({
                usedCompsDataArray: profile
            })
            if (profile.length > 0) {
                this.toast('已读取本地存储。')
            }
        }
    }

    @observable msgToToast = ''
    @observable toastFlag = false
    toast = (msgToToast, duration = 5000) => {
        this.setProps({
            msgToToast,
            toastFlag: true
        })
        setTimeout(() => {
            this.setProps({
                msgToToast: '',
                toastFlag: false
            })
        }, duration)
    }

    saveUsedCompData = () => {
        save(this.usedCompsDataArray)
    }

    @observable playgroundWidth = 1000
    @observable playgroundHeight = 800

    // ##### 中间 实际内容(默认下的全屏) #####

    // ##### 右侧 属性编辑器 #####

    @observable activeComponentId = ''

    @computed get activeComponentData() {
        return this.usedCompsDataArray.find(item => {
            return item.id === this.activeComponentId
        }) || null
    }

    @action targetPropsChangeHandler = data => {
        const {
            activeComponentData,
            compResizeHandler
        } = this
        for (let key in data) {
            activeComponentData.originProps[key] = data[key]
            // console.log('target props changed', key, this.activeComponentData.originProps[key])
        }
        if (typeof compResizeHandler === 'function') {
            // 待重绘完成, 下次事件循环时, 读 wrap 宽高并存储
            setTimeout(() => {
                const {
                    wrapWidth,
                    wrapHeight
                } = compResizeHandler()
                activeComponentData.wrapWidth = wrapWidth
                activeComponentData.wrapHeight = wrapHeight
                this.saveUsedCompData()
            })
        }
    }

    @observable compResizeHandler = null

    @action compDragHandler = deltas => {
        this.activeComponentData.deltaX = deltas.deltaX
        this.activeComponentData.deltaY = deltas.deltaY
        this.saveUsedCompData()
    }

    // ##### 上方 控制面板 #####

    @observable archiveName = ''

}

export default MainState
