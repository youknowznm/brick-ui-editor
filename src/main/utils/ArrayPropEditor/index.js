import * as React from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import TextField from '@material-ui/core/TextField'
import Switch from '@material-ui/core/Switch'

import MaterialTable from 'material-table'

import './style.scss'

export default class ArrayPropEditor extends React.Component {

  static displayName = 'ArrayPropEditor'

  state = {
    visible: false,
    localList: [],
  }

  componentDidMount() {
    this.setLocalListFromProp()
  }

  setLocalListFromProp = () => {
    this.setState({
      localList: this.props.value.map((item, index) => {
        return Object.assign({}, item, {
          _index: index
        })
      })
    })
  }

  resetLocalListIndex = () => {
    this.setState({
      localList: this.state.localList.map((item, index) => {
        return Object.assign({}, item, {
          _index: index
        })
      })
    })
  }

  stringEditor = key => rowData => {
    return <TextField
      fullWidth={true}
      multiline={rowData.isMultiline === true}
      value={rowData[key]}
      onChange={event => {
        const localList = this.state.localList
        localList[rowData._index][key] = event.target.value
        this.setState({localList})
      }}
    />
  }

  boolEditor = key => rowData => {
    return <Switch
      // color="default"
      checked={rowData[key] + '' === 'true'}
      onChange={event => {
        const localList = this.state.localList
        localList[rowData._index][key] = event.target.checked
        this.setState({localList})
      }}
    />
  }

  numberEditor = key => rowData => {
    return <TextField
      type="number"
      fullWidth={true}
      value={rowData[key]}
      onChange={event => {
        const localList = this.state.localList
        localList[rowData._index][key] = event.target.value
        this.setState({localList})
      }}
    />
  }

  get columns() {
    const {
      state,
      props,
      stringEditor,
      boolEditor,
      numberEditor,
    } = this
    const {
      localList,
    } = state
    const editorTypeMap = {
      string: stringEditor,
      bool: boolEditor,
      number: numberEditor,
    }
    // ?????? title, field ??? columnType
    const result = props.columns
      .filter(item => item !== null)
      .map(item => {
        return Object.assign({}, item, {
          render: editorTypeMap[item.columnType](item.field)
        })
      })
    result.push({
      field: "",
      title: "??????",
      render: rowData => {
        const {_index} = rowData
        return <Button
          size="small"
          color="secondary"
          variant="outlined"
          onClick={() => {
            const localList = this.state.localList
            localList.splice(_index, 1)
            this.setState({
              localList
            })
            this.resetLocalListIndex()
          }}
        >
          ??????
        </Button>
      }
    })
    return result
  }

  triggerVisible = tar => {
    this.setState({
      visible: typeof tar === 'boolean' ? tar : !this.state.visible,
    })
  }

  renderEditTable = () => {
    const {columns} = this
    const {
      desc,
    } = this.props
    const {
      localList
    } = this.state
    return <MaterialTable
      data={localList}
      columns={columns}
      options={{
        search: false,
        draggable: false,
        sorting: false,
        paging: false,
        showTitle: false,
        padding: 'dense',
        actionsColumnIndex: columns.length,
      }}
      // title={desc}
      localization={{
        body: {
          emptyDataSourceMessage: '?????????'
        }
      }}
    />
  }

  render() {
    const {
      visible,
      localList,
    } = this.state
    const {
      columns,
      dispatchArray,
      ...restProps
    } = this.props
    return <div className="array-prop-editor">
      <TextField
        onClick={() => {
          this.triggerVisible(true)
        }}
        {...restProps}
        value="????????????"
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
            <div className="actions-tl">
              <Button
                className="add-row"
                color="primary"
                variant="outlined"
                onClick={() => {
                  const localList = this.state.localList
                  const newRowObj = {}
                  columns.forEach(item => {
                    // console.log({item})
                    // ??????????????? null ????????????
                    if (item !== null) {
                      let defaultValue
                      if (item.defaultValue !== undefined) {
                        defaultValue = item.defaultValue
                      } else {
                        switch (item.columnType) {
                          case 'string':
                            defaultValue = ''
                            break
                          case 'bool':
                            defaultValue = false
                            break
                          case 'number':
                            defaultValue = 0
                            break
                        }
                      }
                      newRowObj[item.field] = defaultValue
                    }
                  })
                  localList.push(newRowObj)
                  this.setState({
                    localList
                  })
                  this.resetLocalListIndex()
                }}
              >
                ????????????
              </Button>
            </div>
            <div className="actions-tr">
              <Button
                className="btn-confirm"
                onClick={() => {
                  this.props.dispatchArray(localList)
                  this.triggerVisible(false)
                }}
                // variant="outlined"
                color="default">
                ??????
              </Button>
              <Button
                className="btn-cancel"
                onClick={() => {
                  this.triggerVisible(false)
                  setTimeout(() => {
                    this.setLocalListFromProp()
                  }, 300)
                }}
                // variant="outlined"
                color="default"
              >
                ??????
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  }
}
