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
        // componentInEdit
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
        const {componentInEdit} = props
        if (componentInEdit === null) {
            return null
        }
        const originCompData = componentInEdit.props
        // console.log('componentInEdit: ', componentInEdit)
        // console.table('originCompData: ', originCompData)
        const {
            id,
            originDisplayName,
            originCompProps,
            originCompState,
            playgroundTopOffset,
            playgroundLeftOffset,
        } = originCompData

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

        return <div className="attr-editor-content">
            <h3 className="title">
                <span className="code">Button</span>
                <span className="name">按钮</span>
            </h3>
            <Divider />
            <ul className="type-style">
                <TextField
                    key="style-top"
                    value=""
                    label="上边距 top"
                    size="small"
                    style={{
                        width: 150,
                        marginRight: 20,
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment
                            position="end"
                        >
                            px
                        </InputAdornment>
                    }}
                    margin="dense"
                ></TextField>
                <TextField
                    key="style-left"
                    value=""
                    label="左边距 left"
                    size="small"
                    style={{
                        width: 150,
                        marginRight: 20,
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment
                            position="end"
                        >
                            px
                        </InputAdornment>
                    }}
                    margin="dense"
                ></TextField>
                <TextField
                    key="style-width"
                    value=""
                    label="宽度 width"
                    size="small"
                    style={{
                        width: 150,
                        marginRight: 20,
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment
                            position="end"
                        >
                            px
                        </InputAdornment>
                    }}
                    margin="dense"
                ></TextField>
                <TextField
                    key="style-height"
                    value=""
                    label="高度 height"
                    size="small"
                    style={{
                        width: 150,
                        marginRight: 20,
                    }}
                    InputProps={{
                        endAdornment: <InputAdornment
                            position="end"
                        >
                            px
                        </InputAdornment>
                    }}
                    margin="dense"
                ></TextField>
            </ul>
            <Divider />
            <ul className="type-data">
                ...propInputs
            </ul>
            <ul className="type-data">
                ...stateInputs
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
                open={props.componentInEdit !== null}
            >
                {this.renderAttrEditorContent()}
            </Drawer>
        </div>
    }
}
