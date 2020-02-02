import * as React from 'react'

import {toJS} from "mobx"

import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import TextField from "@material-ui/core/TextField"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import MenuList from "@material-ui/core/MenuList"
import Switch from "@material-ui/core/Switch"

import MaterialTable from 'material-table'

import './style.scss'

export default class ArrayPropEditor extends React.Component {

    static displayName = 'ArrayPropEditor'

    state = {
        visible: false,
        data: [],
        rowInEditIndex: -1,
    }

    componentDidMount() {
        this.resetLocalArray()
    }

    stringEditor = key => rowData => {
        const {
            rowInEditIndex
        } = this.state
        if (rowData._index === rowInEditIndex) {
            return <TextField
                fullWidth={true}
                value={rowData[key]}
                onChange={event => {
                    const data = this.state.data
                    data[rowData._index][key] = event.target.value
                    this.setState({ data })
                }}
            />
        }
        return rowData[key]
    }

    boolEditor = key => rowData => {
        const {
            rowInEditIndex
        } = this.state
        if (rowData._index === rowInEditIndex) {
            return <Switch
                // color="normal"
                checked={rowData[key] + '' === 'true'}
                onChange={event => {
                    const data = this.state.data
                    data[rowData._index][key] = event.target.checked
                    this.setState({ data })
                }}
            />
        }
        return rowData[key] === true ? '是' : '否'
    }

    get columns() {
        const {
            state,
            props,
            stringEditor,
            boolEditor,
        } = this
        const {
            data,
            rowInEditIndex
        } = state
        const {columns} = props
        const editorTypeMap = {
            string: stringEditor,
            bool: boolEditor
        }
        // 用到 title, field 和 columnType
        const result = toJS(columns).map(item => {
            return Object.assign({}, item, {
                render: editorTypeMap[item.columnType](item.field)
            })
        })
        result.push({
            field: "",
            title: "操作",
            render: rowData => {
                const {_index} = rowData
                const isInEdit = rowData._index === rowInEditIndex
                return isInEdit
                    ? <div>
                        <Button
                            size="small"
                            color="primary"
                            // variant="outlined"
                            onClick={() => {
                                this.setState({
                                    rowInEditIndex: -1
                                })
                                this.props.dispatchArray(data)
                            }}
                        >
                            保存
                        </Button>
                        <Button
                            size="small"
                            color="primary"
                            // variant="outlined"
                            onClick={() => {
                                this.setState({
                                    rowInEditIndex: -1
                                })
                                this.resetLocalArray()
                            }}
                        >
                            取消
                        </Button>
                    </div>
                    : <div>
                        <Button
                            size="small"
                            color="primary"
                            // variant="outlined"
                            // disabled={isInEdit}
                            onClick={() => {
                                this.setState({
                                    rowInEditIndex: rowData._index
                                })
                            }}
                        >
                            编辑
                        </Button>
                        <Button
                            size="small"
                            color="primary"
                            // variant="outlined"
                            // disabled={isInEdit}
                            onClick={() => {
                                let data = toJS(this.state.data)
                                data.splice(_index, 1)
                                this.setState({
                                    data
                                })
                                this.props.dispatchArray(data)
                                setTimeout(() => {
                                    this.resetLocalArray()
                                })
                            }}
                        >
                            删除
                        </Button>
                    </div>
            }
        })
        return result
    }

    resetLocalArray = () => {
        this.setState({
            data: this.props.value.map((item, index) => {
                return Object.assign({}, item, {
                    _index: index
                })
            })
        })
    }

    triggerVisible = tar => {
        this.setState({
            visible: typeof tar === 'boolean' ? tar : !this.state.visible,
            rowInEditIndex: tar === false ? -1 : this.state.rowInEditIndex,
        })
    }

    renderEditTable = () => {
        const {columns} = this
        const {
            value,
            ...restProps
        } = this.props
        const {
            data
        } = this.state
        return <MaterialTable
            data={data}
            columns={columns}
            options={{
                search: false,
                draggable: false,
                sorting: false,
                paging: false,
                padding: 'dense',
                actionsColumnIndex: columns.length,
            }}
            title="内容编辑"
            localization={{
                body: {
                    emptyDataSourceMessage: '无内容'
                }
            }}
        />
    }

    render() {
        const {
            visible,
        } = this.state
        const {
            value,
            ...restProps
        } = this.props
        return <div className="array-prop-editor">
            <TextField
                value="点击编辑"
                onClick={() => {
                    this.triggerVisible(true)
                }}
                {...restProps}
            />
            <Dialog
                className="array-editor-dialog"
                onClose={() => {
                    this.triggerVisible(false)
                }}
                maxWidth="md"
                open={visible}
            >
                <DialogContent dividers>
                    <div className="array-table-wrap">
                        {this.renderEditTable()}
                        <Button
                            className="add-row"
                            color="primary"
                            size="small"
                            variant="contained"
                            onClick={() => {
                                // const
                            }}
                        >
                            新增一行
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    }
}
