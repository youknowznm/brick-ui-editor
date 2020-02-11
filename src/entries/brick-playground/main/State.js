import * as React from 'react'
import {toJS, computed, observable, action} from 'mobx'
import BaseModel from './utils/BaseModel'

import {
    BP_ARCHIVE_DATA_KEY,
    BP_AUTHOR_KEY,
    BP_ARCHIVE_NAME_KEY,
    BP_LAST_MODIFIED_KEY,
    getStorage,
    setStorage
} from "./utils/storage";
import copyToClipboard from "./utils/copyToClipboard";

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
        this.saveArchiveData()
        this.triggerDemoDrawer(false)
    }

    @action removeUsedComp = () => {
        const targetIndex = this.usedCompsDataArray.findIndex(item => {
            return item.id === this.activeComponentId
        })
        this.setProps({
            activeComponentId: ''
        })
        this.usedCompsDataArray.splice(targetIndex, 1)
        this.saveArchiveData()
    }

    @action clearAll = () => {
        this.usedCompsDataArray = []
        this.saveArchiveData()
        this.toast('已清空画布。')
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

    @observable playgroundWidth = 1200
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
                this.saveArchiveData()
            })
        }
    }

    @observable compResizeHandler = null

    @action compDragHandler = deltas => {
        this.activeComponentData.deltaX = deltas.deltaX
        this.activeComponentData.deltaY = deltas.deltaY
        this.saveArchiveData()
    }

    // ##### 上方 控制面板 #####

    @observable archiveName = ''
    @observable author = ''
    @observable lastModified = ''

    // ##### 存储相关 #####

    saveArchiveData = () => {
        setStorage(BP_ARCHIVE_DATA_KEY, this.usedCompsDataArray)
        // this.setProps({
        //     lastModified: new Date().toLocaleString()
        // })
    }
    saveAuthor = () => {
        setStorage(BP_AUTHOR_KEY, this.author)
    }
    saveArchiveName = () => {
        setStorage(BP_ARCHIVE_NAME_KEY, this.archiveName)
    }
    saveLastModified = () => {
        setStorage(BP_LAST_MODIFIED_KEY, this.lastModified)
    }
    loadStorage = () => {
        const archive = getStorage(BP_ARCHIVE_DATA_KEY)
        if (Array.isArray(archive)) {
            this.setProps({
                usedCompsDataArray: archive
            })
            if (archive.length > 0) {
                this.toast('已读取本地存储。')
            }
        } else {
            this.saveArchiveData()
        }
        const author = getStorage(BP_AUTHOR_KEY)
        if (typeof author === 'string') {
            this.setProps({
                author
            })
        } else {
            this.saveAuthor()
        }
        const archiveName = getStorage(BP_ARCHIVE_NAME_KEY)
        if (typeof author === 'string') {
            this.setProps({
                archiveName
            })
        } else {
            this.saveArchiveName()
        }
        // TODO: 更新时间
        // const lastModified = getStorage(BP_LAST_MODIFIED)
        // if (typeof lastModified === 'string') {
        //     this.setProps({
        //         lastModified
        //     })
        // } else {
        //     this.saveLastModified()
        // }
    }
    copyStorageToClipboard = () => {
        const copyTarget = {
            BP_ARCHIVE_NAME: this.archiveName,
            BP_AUTHOR: this.author,
            BP_ARCHIVE_DATA: this.usedCompsDataArray,
        }
        copyToClipboard(JSON.stringify(copyTarget))
        this.toast('已复制到剪贴板。')
    }
    loadFromCopy = archiveJSON => {
        try {
            const copyTarget = JSON.parse(archiveJSON)
            const {
                BP_ARCHIVE_NAME,
                BP_AUTHOR,
                BP_ARCHIVE_DATA,
            } = copyTarget
            if (BP_ARCHIVE_NAME && BP_AUTHOR && BP_ARCHIVE_DATA) {
                this.setProps({
                    usedCompsDataArray: BP_ARCHIVE_DATA,
                    author: BP_AUTHOR,
                    archiveName: BP_ARCHIVE_NAME
                })
                this.saveArchiveName()
                this.saveArchiveData()
                this.saveAuthor()
                this.toast('读取成功。')
            } else {
                this.toast('请使用正确的数据。')
            }
        } catch (e) {
            this.toast('请使用正确的数据。')
        }
    }
}

export default MainState
