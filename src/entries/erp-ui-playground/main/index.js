/**
 * @author zhangenming
 */

import * as React from 'react';
import {c} from 'classnames';
import {toJS, computed, observable, action} from 'mobx';
import {observer} from 'mobx-react';

import View from './View';
import moment from 'moment';

class IndexPageVM {

    static injectKey = 'root';

    @action
    setProps = action(obj => {
        for (let key in obj) {
            if (this[key] !== undefined) {
                this[key] = obj.key;
            }
        }
    })

    // ##### 全局 #####

    @observable loadingFlag = false;

    triggerLoading = bool => {
        this.setProps({
            loadingFlag: bool
        });
    }

    @observable frameWindowRef = null;

    @observable metaKeyPressing = false;

    // ##### 头部操作卡片 #####

    @observable showControlPanelDrawer = false;

    triggerControlPanelDrawer = target => {
        const result = typeof target === 'boolean' ? target : !this.showControlPanelDrawer;
        this.setProps({
            showControlPanelDrawer: result
        });
    }

    // ##### 左侧 demo 容器 #####

    @observable componentLibName = 'erp-comps';

    @observable demoPageSrc = 'http://localhost:3008/main/components/button?embedded-in-eup=true';
    @observable demoPageWidth = 1160;
    // @observable demoPageSrc = 'http://localhost:18988/pages/ui-demo-shared.html?embedded-in-eup=true#/button';
    // @observable demoPageWidth = 1075;

    @observable showDemoPageDrawer = false;

    triggerDemoDrawer = target => {
        const result = typeof target === 'boolean' ? target : !this.showDemoPageDrawer;
        this.setProps({
            showDemoPageDrawer: result
        });
    }

    // @observable visibleDrawerName = ''; // DEMO_PAGE | CONTROL_PANEL | ATTR_EDITOR

    // @computed get demoPageVisible() {
    //     return this.visibleDrawerName === 'DEMO_PAGE';
    // }
    // @computed get controlPanelVisible() {
    //     return this.visibleDrawerName === 'CONTROL_PANEL';
    // }
    // @computed get attrEditorVisible() {
    //     return this.visibleDrawerName === 'ATTR_EDITOR';
    // }

    @observable componentsUsed = [];

    @action appendDemoComponent = comp => {
        this.componentsUsed.push(comp);
    }

    @observable componentsUsedPosition = null;
    @observable playgroundWidth = 0;
    @observable playgroundHeight = 0;

    // ##### 中间 实际内容(默认下的全屏) #####

    @observable showDemoPageDrawer = false;

    // ##### 右侧 属性编辑器 #####

    @observable componentInEditId = '';

    setEditingComponentId = id => {
        this.setProps({
            componentInEditId: id
        });
    }

    @computed get componentInEdit() {
        return this.componentsUsed.find(item => {
            return item.props.id === this.componentInEditId;
        }) || null;
    }
}

export default IndexPageVM;
