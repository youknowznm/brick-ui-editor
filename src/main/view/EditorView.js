import * as React from 'react'
import {toJS} from 'mobx'
import {observer} from 'mobx-react'
import PropTypes from 'prop-types'
import {PropTypes as MobxPropTypes} from 'mobx-react'

import EditorCompWrap from '../utils/EditorCompWrap'

import Paper from '@material-ui/core/Paper'

import EditorState from '../states/EditorState'

import '../style/editor.scss'

import {PortalContainerProvider} from "../utils/PortalContainerContext";

@observer
class EditorView extends React.Component {

    static propTypes = {

        // editor 容器宽高
        editorWidth: PropTypes.number.isRequired,
        editorHeight: PropTypes.number.isRequired,

        // 已使用的组件数据数组
        usedCompsDataArray: MobxPropTypes.arrayOrObservableArray.isRequired,

        // 是否打开 demo 列表抽屉
        showDemoDrawer: PropTypes.bool.isRequired,

        // 开关 demo 列表抽屉
        triggerDemoDrawer: PropTypes.func.isRequired,

        // 开关控制面板抽屉
        triggerControlPanelDrawer: PropTypes.func.isRequired,

        // 编辑状态的组件 id
        activeComponentId: PropTypes.string.isRequired,

        // 设置/清空编辑状态的组件 id
        setActiveComponentId: PropTypes.func.isRequired,

        setCompResizeHandler: PropTypes.func,

        compDragHandler: PropTypes.func
    }

    local = {
        editorState: new EditorState(),
    }

    constructor(props) {
        super(props)
        const {local} = this
    }

    renderEditorContent = () => {
        const {local, props} = this
        const {
            editorWidth,
            editorHeight,
            usedCompsDataArray,
            activeComponentId,
            setActiveComponentId,
            triggerDemoDrawer,
            setCompResizeHandler,
            triggerControlPanelDrawer,
            compDragHandler,
        } = props
        return <PortalContainerProvider value=".editor-content">
            <Paper className="editor-content"
                   style={{
                       width: editorWidth,
                       height: editorHeight
                   }}
                   onMouseOver={evt => {
                       // 滑过区域空白处时, 关闭所有抽屉
                       const {className} = evt.target
                       if (className.indexOf && className.indexOf('editor-content') > -1) {
                           props.triggerDemoDrawer(false)
                           props.triggerControlPanelDrawer(false)
                       }
                   }}
                   onClick={evt => {
                       // 点击区域空白处时, 取消组件编辑
                       const {className} = evt.target
                       if (className.indexOf && className.indexOf('editor-content') > -1) {
                           props.setActiveComponentId('')
                       }
                   }}
                   square={true}
            >
                {usedCompsDataArray.map(item => {
                    // console.log('usedCompsData:', toJS(item))
                    // id: "18bv1q9"
                    // originName: "Button"
                    // originProps: {
                    //     type: "intensive"
                    //     children: "加强"
                    //     root: {
                    //             showControlPanelDrawer: false,
                    //             triggerControlPanelDrawer: ƒ,
                    //             triggerDemoDrawer: ƒ,
                    //             setActiveComponentId: ƒ
                    //     }
                    //     className: ""
                    //     color: "normal"
                    //     disabled: false
                    //     loadingDelay: 300
                    // }
                    return <EditorCompWrap
                        key={item.id}
                        id={item.id}
                        originName={item.originName}
                        originProps={toJS(item.originProps)}
                        wrapWidth={item.wrapWidth}
                        wrapHeight={item.wrapHeight}
                        deltaX={item.deltaX}
                        deltaY={item.deltaY}
                        activeComponentId={activeComponentId}
                        triggerDemoDrawer={triggerDemoDrawer}
                        triggerControlPanelDrawer={triggerControlPanelDrawer}
                        editorWidth={editorWidth}
                        editorHeight={editorHeight}
                        setCompResizeHandler={setCompResizeHandler}
                        compDragHandler={compDragHandler}
                        setActiveComponentId={setActiveComponentId}
                    />;
                })}
            </Paper>
        </PortalContainerProvider>
    }

    render() {
        const {props} = this
        const {
            showDemoDrawer,
            // showControlPanelDrawer
        } = props
        // 减去 trigger 宽度
        return <div className="editor-wrap"
            style={{
                marginLeft: `${showDemoDrawer ? 810 : 0}px`, // 830 - 20
                // marginTop: `${showControlPanelDrawer ? 173 : 0}px`, // 193 - 20
            }}
            >
            {this.renderEditorContent()}
        </div>
    }
}

export default EditorView