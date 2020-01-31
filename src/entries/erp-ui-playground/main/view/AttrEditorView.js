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

import AttrEditorState from '../states/AttrEditorState'

import {SvgEdit, SvgGear} from '@befe/brick-icon'
import {Icon} from '@befe/brick'

import {COMP_TYPES} from '../config'
import SvgPropEditor from '../utils/SvgPropEditor'

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
        componentInEditData: PropTypes.object,

        // 编辑 state 和 props
        targetStateChangeHandler: PropTypes.func,
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
            componentInEditData,
            targetPropsChangeHandler,
            targetStateChangeHandler
        } = props
        if (componentInEditData === null) {
            return null
        }
        console.log('componentInEditData: ', toJS(componentInEditData))
        const {
            id,
            originDisplayName,
            originCompProps,
            playgroundTop,
            playgroundLeft,
        } = componentInEditData

        const compTypeData = COMP_TYPES[originDisplayName]
        if (!compTypeData) {
            throw ReferenceError('未定义的组件类型.')
        }
        const {
            cnLabel,
            editableProps
        } = compTypeData
        const propInputPropsGen = {
            size: 'small',
            fullWidth: true,
            margin: 'dense'
        }
        const propInputs = editableProps.map(item => {
            let {
                key,
                type,
                desc,
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
            let value = originCompProps[key]
            // 未显式声明时, 使用 default prop value
            if (value === undefined) {
                value = defaultValue
            }
            console.log('attr editing: ', key, value)
            switch (type) {
                case 'string':
                    return <TextField
                        key={key}
                        label={desc}
                        value={value}
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
                        {...propInputPropsGen}
                    />
                case 'bool':
                case 'enum':
                    return <TextField
                        key={key}
                        label={desc}
                        select
                        value={value}
                        onChange={evt => {
                            targetPropsChangeHandler({
                                [key]: evt.target.value
                            })
                        }}
                        {...propInputPropsGen}
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
                    options = [
                        {
                            value: 'SvgEdit',
                            label: 'SvgEdit',
                        },
                        {
                            value: 'SvgGear',
                            label: 'SvgGear',
                        }
                    ]
                    return <SvgPropEditor
                        key={key}
                        label={desc}
                        value={value}
                        {...propInputPropsGen}
                    />
                default:
                    return <TextField
                        key={key}
                        label={desc}
                        value={value}
                        onChange={evt => {
                            targetPropsChangeHandler({
                                [key]: evt.target.value
                            })
                        }}
                        {...propInputPropsGen}
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
                <Typography className="en" variant="h4">
                    {originDisplayName}
                </Typography>
                <Typography className="cn" variant="h4">
                    {compTypeData.cnLabel}
                </Typography>
            </div>
            <Divider />
            <ul className="type-style">
                <TextField
                    className="type-style-input top"
                    key="style-top"
                    value=""
                    label="上边距 top"
                    {...styleInputOtherProps}
                />
                <TextField
                    className="type-style-input left"
                    key="style-left"
                    value=""
                    label="左边距 left"
                    {...styleInputOtherProps}
                />
                <TextField
                    className="type-style-input width"
                    key="style-width"
                    value=""
                    label="宽度 width"
                    {...styleInputOtherProps}
                />
                <TextField
                    className="type-style-input height"
                    key="style-height"
                    value=""
                    label="高度 height"
                    {...styleInputOtherProps}
                />
            </ul>
            <Divider />
            <ul className="type-props">
                {propInputs}
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
