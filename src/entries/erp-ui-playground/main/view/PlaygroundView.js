import * as React from 'react'
import {default as c} from 'classnames'
import {toJS, computed, observable, action} from 'mobx'
import {inject, observer} from 'mobx-react'

import PropTypes from 'prop-types'
import {PropTypes as MobxPropTypes} from 'mobx-react'

import PlaygroundCompWrap from '../utils/PlaygroundCompWrap'

import Paper from '@material-ui/core/Paper'

import PlaygroundState from '../states/PlaygroundState'

import '../style/playground.scss'

import transferSvgStringToElement from '../utils/transferSvgStringToElement'

@observer
export default class PlaygroundView extends React.Component {

    static propTypes = {

        // playground 内容宽高
        playgroundWidth: PropTypes.number.isRequired,
        playgroundHeight: PropTypes.number.isRequired,

        // demo 列表抽屉宽度
        demoListWidth: PropTypes.number.isRequired,

        // 已使用的组件数据数组
        usedCompsDataArray: MobxPropTypes.arrayOrObservableArray.isRequired,

        // 是否按下了 meta key
        metaKeyPressing: PropTypes.bool.isRequired,

        // 是否打开 demo 列表抽屉
        showDemoDrawer: PropTypes.bool.isRequired,

        // 开关 demo 列表抽屉
        triggerDemoDrawer: PropTypes.func.isRequired,

        // 开关控制面板抽屉
        triggerControlPanelDrawer: PropTypes.func.isRequired,

        // 编辑状态的组件 id
        componentInEditId: PropTypes.string.isRequired,

        // 设置/清空编辑状态的组件 id
        setComponentInEditId: PropTypes.func.isRequired,
    }

    local = {
        playgroundState: new PlaygroundState(),
    }

    constructor(props) {
        super(props)
        const {local} = this
    }

    processOriginCompProps = originCompProps => {
        console.log('?', originCompProps.icon)
        if (originCompProps.icon) {
            originCompProps.icon = transferSvgStringToElement(originCompProps.icon)
        }
        return originCompProps
    }

    renderPlaygroundContent = () => {
        const {local, props} = this
        const {
            playgroundWidth,
            playgroundHeight,
            usedCompsDataArray,
            metaKeyPressing,
            componentInEditId,
            setComponentInEditId,
            triggerDemoDrawer,
            triggerControlPanelDrawer
        } = props
        return <Paper className="playground-content"
            style={{
                width: playgroundWidth,
                height: playgroundHeight
            }}
            onMouseOver={evt => {
                // 滑过区域空白处时, 关闭 demo 列表抽屉
                const {className} = evt.target
                if (className.indexOf && className.indexOf('playground-content') > -1) {
                    props.triggerDemoDrawer(false)
                }
            }}
            onClick={evt => {
                // 点击区域空白处时, 取消组件编辑
                const {className} = evt.target
                if (className.indexOf && className.indexOf('playground-content') > -1) {
                    props.setComponentInEditId('')
                }
            }}
            square={true}
        >
            {usedCompsDataArray.map(item => {
                // console.log('usedCompsData:', toJS(item))
                // id: "18bv1q9"
                // originDisplayName: "Button"
                // originCompProps: {
                //     type: "intensive"
                //     children: "加强"
                //     root: {
                //         metaKeyPressing: true,
                //             showControlPanelDrawer: false,
                //             triggerControlPanelDrawer: ƒ,
                //             triggerDemoDrawer: ƒ,
                //             setComponentInEditId: ƒ
                //     }
                //     className: ""
                //     color: "normal"
                //     disabled: false
                //     loadingDelayInMS: 300
                // }
                return <PlaygroundCompWrap
                    key={item.id}
                    id={item.id}
                    originDisplayName={item.originDisplayName}
                    originCompProps={item.originCompProps}
                    metaKeyPressing={metaKeyPressing}
                    componentInEditId={componentInEditId}
                    setComponentInEditId={setComponentInEditId}
                    triggerDemoDrawer={triggerDemoDrawer}
                    triggerControlPanelDrawer={triggerControlPanelDrawer}
                    playgroundWidth={playgroundWidth}
                    playgroundHeight={playgroundHeight}
                />;
            })}
        </Paper>
    }

    render() {
        const {local, props} = this
        const {demoListState} = local
        const {
            demoListWidth,
            showDemoDrawer
        } = props
        // 减去 trigger 宽度
        const offSet = demoListWidth - 20
        return <div className="playground-wrap"
            style={{
                marginLeft: `${showDemoDrawer ? offSet : 0}px`,
                right: `${showDemoDrawer ? -offSet : 0}px`,
            }}
            // square={true}
            >
            {this.renderPlaygroundContent()}
        </div>
    }
}
