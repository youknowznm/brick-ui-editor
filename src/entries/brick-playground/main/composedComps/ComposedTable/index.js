import * as React from 'react'

import {DEMO_WRAP_DEFAULT_WIDTH} from '../../config'

import {Table, Button} from '@befe/brick'
import {observable, toJS} from "mobx";
import {Checkbox} from "@befe/brick-comp-checkbox";
import {observer} from "mobx-react";

@observer
class ComposedTable extends React.Component {

    static displayName = 'ComposedTable'

    static defaultProps = {
        data: [],
        columns: [],
        maxBodyHeight: 1000,
        useCheckbox: false,
        operationsLabelsJoined: ""
    }

    render() {
        const {
            data,
            columns,
            useCheckbox,
            operationsLabelsJoined,
            maxBodyHeight
        } = this.props
        let _data = toJS(this.props.data)
        let _columns = toJS(this.props.columns)
        if (useCheckbox === true) {
            if (!_columns.some(item => item.key === '_checkbox')) {
                _columns.unshift({
                    key: '_checkbox',
                    fixed: 'left',
                    thContent: <Checkbox />,
                    align: 'center',
                    width: 50,
                    tdContent: () => {
                        return <div
                            style={{
                                border: '1px solid transparent'
                            }}>
                            <Checkbox />
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

        return <div style={{
            minWidth: DEMO_WRAP_DEFAULT_WIDTH,
            background: '#fff'
        }}>
            <Table
                rowId="_index"
                data={_data}
                columns={_columns}
                maxBodyHeight={maxBodyHeight}
            />
        </div>
    }
}

export default ComposedTable
