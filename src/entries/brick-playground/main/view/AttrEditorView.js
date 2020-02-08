import * as React from 'react'
import {default as c} from 'classnames'
import {toJS, computed, observable, action} from 'mobx'
import {inject, observer} from 'mobx-react'

import PropTypes from 'prop-types'
import {PropTypes as MobxPropTypes} from 'mobx-react'

import Typography from '@material-ui/core/Typography'
import Switch from '@material-ui/core/Switch';

import {withStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContentText from '@material-ui/core/DialogContentText';

import {COMP_TYPES} from '../config'
import SvgPropEditor from '../utils/SvgPropEditor'

import ArrayPropEditor from "../utils/ArrayPropEditor";

import AttrEditorState from '../states/AttrEditorState'
import '../style/attr-editor.scss'

@observer
export default class AttrEditorView extends React.Component {

    static propTypes = {

        // 编辑状态的组件数据
        //
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
        //     loadingDelayInMS: 300
        // }
        activeComponentData: PropTypes.object,

        targetPropsChangeHandler: PropTypes.func,
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
        const {
            activeComponentData,
            targetPropsChangeHandler,
        } = props
        const {
            showRemoveConfirmFlag,
            triggerConfirmFlag
        } = local.attrEditorState
        if (activeComponentData === null) {
            return null
        }
        // console.log('activeComponentData: ', toJS(activeComponentData))
        const {
            id,
            originName,
            originProps,
            playgroundTop,
            playgroundLeft,
            wrapWidth,
            wrapHeight,
            deltaX,
            deltaY
        } = activeComponentData

        const compTypeData = COMP_TYPES[originName]
        let {
            editableProps,
            enLabel,
            cnLabel,
            widthEditable,
            heightEditable
        } = compTypeData

        const propInputs = editableProps.map(item => {
            let {
                key,
                type,
                desc,
                columns,
                options = [
                    {
                        value: true,
                        label: '是',
                    },
                    {
                        value: false,
                        label: '否',
                    }
                ],
                defaultValue
            } = item
            const generalInputProps = {
                key: key,
                label: `${desc} ${key}`,
                value: originProps[key],
                size: 'small',
                fullWidth: true,
                margin: 'dense'
            }
            // console.log('attr editing: ', key, value)
            switch (type) {
                case 'number':
                case 'string':
                    return <TextField
                        // multiline
                        onChange={evt => {
                            targetPropsChangeHandler({
                                [key]: evt.target.value
                            })
                        }}
                        // onBlur={evt => {
                        //     targetPropsChangeHandler({
                        //         [key]: evt.target.value.trim()
                        //     })
                        // }}
                        {...generalInputProps}
                    />
                case 'enum':
                    return <TextField
                        select
                        onChange={evt => {
                            targetPropsChangeHandler({
                                [key]: evt.target.value
                            })
                        }}
                        {...generalInputProps}
                    >
                        {
                            options.map(option => {
                                return <MenuItem
                                    key={option.value}
                                    value={option.value}
                                    dense={true}
                                >
                                    {
                                        option.label
                                            ? `${option.label} ${option.value}`
                                            : option.value
                                    }
                                </MenuItem>
                            })
                        }
                    </TextField>
                case 'bool':
                    return <TextField
                        select
                        onChange={evt => {
                            targetPropsChangeHandler({
                                [key]: evt.target.value
                            })
                        }}
                        {...generalInputProps}
                    >
                        {
                            options.map(option => {
                                return <MenuItem
                                    key={option.value}
                                    value={option.value}
                                    dense={true}
                                >
                                    {option.label}
                                </MenuItem>
                            })
                        }
                    </TextField>
                case 'svg':
                    return <SvgPropEditor
                        dispatchSelectedIcon={iconName => {
                            targetPropsChangeHandler({
                                [key]: iconName
                            })
                        }}
                        {...generalInputProps}
                    />
                case 'array':
                    return <ArrayPropEditor
                        columns={columns}
                        dispatchArray={array => {
                            targetPropsChangeHandler({
                                [key]: array
                            })
                        }}
                        {...generalInputProps}
                    />
                default:
                    return <TextField
                        onChange={evt => {
                            targetPropsChangeHandler({
                                [key]: evt.target.value
                            })
                        }}
                        {...generalInputProps}
                    />
            }
        })

        const inputAdornmentPx = {
            endAdornment: <InputAdornment position="end">px</InputAdornment>
        }

        const styleInputOtherProps = {
            InputProps: inputAdornmentPx,
            size: 'small',
            margin: 'dense'
        }

        return <div className="attr-editor-content">
            <div className="label">
                <Typography
                    className="label-text"
                    variant="h5"
                    title={enLabel}
                >
                    {enLabel} {cnLabel}
                </Typography>
            </div>
            <Divider />
            <div className="type-style">
                <TextField
                    className="type-style-input left"
                    key="style-left"
                    value={deltaX}
                    label="左边距 left"
                    disabled={true}
                    {...styleInputOtherProps}
                />
                <TextField
                    className="type-style-input top"
                    key="style-top"
                    value={deltaY}
                    label="上边距 top"
                    disabled={true}
                    {...styleInputOtherProps}
                />
                <TextField
                    className="type-style-input width"
                    key="style-width"
                    type="number"
                    value={parseInt(wrapWidth, 10)}
                    disabled={widthEditable !== true}
                    onChange={evt => {
                        targetPropsChangeHandler({
                            width: evt.target.value
                        })
                    }}
                    label="宽度 width"
                    {...styleInputOtherProps}
                />
                <TextField
                    className="type-style-input height"
                    key="style-height"
                    type="number"
                    value={parseInt(wrapHeight, 10)}
                    disabled={heightEditable !== true}
                    onChange={evt => {
                        targetPropsChangeHandler({
                            height: evt.target.value
                        })
                    }}
                    label="高度 height"
                    {...styleInputOtherProps}
                />
            </div>
            <Divider />
            <ul className="type-props">
                {propInputs}
            </ul>
            <div className="remove-button-wrap">
                <Divider />
                <Button
                    className="remove-button"
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => {
                        triggerConfirmFlag(true)
                    }}
                >
                    移除
                </Button>
                <Dialog
                    open={showRemoveConfirmFlag}
                    onClose={() => {
                        triggerConfirmFlag(false)
                    }}
                >
                    <DialogTitle>确认移除？</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            移除的组件无法还原。
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() => {
                                triggerConfirmFlag(false)
                                props.removeUsedComp()
                            }}
                            color="primary">
                            确认
                        </Button>
                        <Button
                            onClick={() => {
                                triggerConfirmFlag(false)
                            }}
                            color="primary"
                            autoFocus
                        >
                            取消
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    }

    render() {
        const {local, props} = this
        return <div className="attr-editor">
            <Drawer
                className="attr-editor-drawer"
                anchor="right"
                variant="persistent"
                open={props.activeComponentData !== null}
            >
                {this.renderAttrEditorContent()}
            </Drawer>
        </div>
    }
}
