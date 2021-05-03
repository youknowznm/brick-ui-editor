import * as React from 'react'

import {Table, Button} from '@befe/brick'
// import '@befe/brick-comp-table/src/index.scss'
import {toJS} from "mobx";
import {Checkbox} from "@befe/brick-comp-checkbox";

export default class ComposedTable extends React.Component {

  static displayName = 'ComposedTable'

  static defaultProps = {
    data: [],
    columns: [],
    // maxBodyHeight: 1000,
    useCheckbox: false,
    operationsLabelsJoined: "",
    width: 750,
  }

  render() {
    const {
      data,
      columns,
      useCheckbox,
      operationsLabelsJoined,
      // maxBodyHeight,
      width,
      // height,
    } = this.props
    let _data = toJS(data).map((item, index) => {
      return Object.assign({}, item, {
        _index: index + 1
      })
    })
    let _columns = toJS(columns)
    if (useCheckbox === true) {
      if (!_columns.some(item => item.key === '_checkbox')) {
        _columns.unshift({
          key: '_checkbox',
          fixed: 'left',
          thContent: <Checkbox/>,
          align: 'center',
          width: 50,
          tdContent: () => {
            return <div
              style={{
                border: '1px solid transparent'
              }}>
              <Checkbox/>
            </div>
          }
        })
      }
    }
    if (operationsLabelsJoined.length > 0) {
      if (!_columns.some(item => item.key === '_operations')) {
        _columns.push({
          key: '_operations',
          fixed: 'right',
          thContent: '操作',
          align: 'center',
          width: 150,
          tdContent: () => {
            return <div>
              {
                operationsLabelsJoined.trim().split(/\s+/).map((label, index) => {
                  return <Button
                    key={index}
                    size="xs"
                    type="plain"
                    color="primary"
                  >
                    {label}
                  </Button>
                })
              }
            </div>

          },
        })
      }
    }

    return <div
      className="composed-table"
      style={{
        width: `${width}px`,
        // height: `${height}px`,
      }}
    >
      <Table
        rowId="_index"
        data={_data}
        columns={_columns}
        // maxBodyHeight={maxBodyHeight}
      />
    </div>
  }
}
