import * as React from 'react'
import {default as c} from 'classnames'
import {toJS, computed, observable, action} from 'mobx'
import {inject, observer} from 'mobx-react'

import PropTypes from 'prop-types'
import {PropTypes as MobxPropTypes} from 'mobx-react'

import Typography from '@material-ui/core/Typography'

import {withStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'

import AttrEditorState from '../states/AttrEditorState'

import '../style/attr-editor.scss'

@observer
export default class AttrEditorView extends React.Component {

    static propTypes = {

        // 编辑状态的组件数据
        //
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
        // originCompState: {
        //     asyncLoading: false
        //     showLoading: false
        // }
        //
        componentInEditData: PropTypes.object
    }

    local = {
        attrEditorState: new AttrEditorState(),
    }

    constructor(props) {
        super(props)
        const {local} = this
    }

    componentDidMount() {
    }

    componentDidUpdate() {}

    renderAttrEditorContent = () => {
        const {local, props} = this
        const {componentInEditData} = props
        if (componentInEditData === null) {
            return null
        }
        console.log('componentInEditData: ', toJS(componentInEditData))
        const {
            id,
            originDisplayName,
            originCompProps,
            originCompState,
            playgroundTop,
            playgroundLeft,
        } = componentInEditData

        const propInputs = []
        for (let key in originCompProps) {
            propInputs.push(<TextField
                key={key}
                value={originCompProps[key]}
                label={key}
                fullWidth={true}
                margin="dense"
            ></TextField>)
        }

        const stateInputs = []
        for (let key in originCompState) {
            stateInputs.push(<TextField
                key={key}
                value={originCompState[key]}
                label={key}
                fullWidth={true}
                margin="dense"
            ></TextField>)
        }

        const inputAdornmentPx = {
            endAdornment: <InputAdornment position="end">px</InputAdornment>
        }

        const styleInputOtherProps = {
            InputProps: inputAdornmentPx,
            size: 'small',
            margin: 'dense'
        }

        return <div className="attr-editor-content">
            <h3 className="title">
                <span className="code">Button</span>
                <span className="name">按钮</span>
            </h3>
            <Divider />
            <ul className="type-style">
                <TextField
                    className="type-style-input top"
                    key="style-top"
                    value=""
                    label="上边距 top"
                    {...styleInputOtherProps}
                ></TextField>
                <TextField
                    className="type-style-input left"
                    key="style-left"
                    value=""
                    label="左边距 left"
                    {...styleInputOtherProps}
                ></TextField>
                <TextField
                    className="type-style-input width"
                    key="style-width"
                    value=""
                    label="宽度 width"
                    {...styleInputOtherProps}
                ></TextField>
                <TextField
                    className="type-style-input height"
                    key="style-height"
                    value=""
                    label="高度 height"
                    {...styleInputOtherProps}
                ></TextField>
            </ul>
            <Divider />
            <ul className="type-data">
                {propInputs}
            {/*</ul>*/}
            {/*<ul className="type-data">*/}
                {stateInputs}
            </ul>
        </div>
    }

    render() {
        const {local, props} = this
        const {attrEditorState} = local
        return <div className="attr-editor">
            <Drawer
                className="attr-editor-drawer"
                anchor="right"
                variant="persistent"
                open={props.componentInEditData !== null}
            >
                {this.renderAttrEditorContent()}
            </Drawer>
        </div>
    }
}
