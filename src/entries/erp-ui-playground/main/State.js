/**
 * @author zhangenming
 */

import * as React from 'react'
import {default as c} from 'classnames'
import {toJS, computed, observable, action} from 'mobx'
import {observer} from 'mobx-react'
import BaseModel from './utils/BaseModel'
import {COMP_TYPES} from "./config";
import transferSvgStringToElement from "./utils/transferSvgStringToElement";

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

    @observable demoListWidth = 820

    triggerDemoDrawer = target => {
        const result = typeof target === 'boolean' ? target : !this.showDemoDrawer
        this.setProps({
            showDemoDrawer: result
        })
    }

    @observable usedCompsDataArray = []

    @action pushUsedCompData = data => {
        console.log('rcv used comp:',data)
        let {
            originName,
            originProps
        } = data
        const compTypeData = COMP_TYPES[originName]
        for (let propType of compTypeData.editableProps) {
            const {
                key,
                type,
                defaultValue = '' // svg, children
            } = propType
            // 未显式声明时, 使用 default prop value
            if (originProps[key] === undefined) {
                originProps[key] = defaultValue
            }
        }
        data.originProps = originProps
        this.usedCompsDataArray.push(data)
    }

    @observable playgroundWidth = 800
    @observable playgroundHeight = 600

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
            })
        }
    }

    @observable compResizeHandler = null

    @action compDragHandler = deltas => {
        this.activeComponentData.deltaX = deltas.deltaX
        this.activeComponentData.deltaY = deltas.deltaY
    }
}

export default MainState
