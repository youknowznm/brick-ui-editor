import * as React from 'react'

import {Checkbox} from '@befe/brick'

export default class ComposedCheckbox extends React.Component {

    static displayName = 'ComposedCheckbox'

    static defaultProps = {
        type: 'normal', // 'plain' | 'card' | 'button-group'
        addable: false,
        size: 'sm',
        CheckboxClassName: '',
        defaultActiveId: '',
        data: [
            {
                label: '',
                disabled: false,
                deletable: false,
                status: 'error',
                content: '',
            }
        ]
    }

    render() {
        return <Checkbox
            className={this.props.CheckboxClassName}
            type={this.props.type}
            size={this.props.size}
            addable={this.props.addable}
            defaultActiveId={this.props.defaultActiveId}
        >
            {
                this.props.data.map((item, index) => <TabPane
                    key={index}
                    id={item.id}
                    label={item.label}
                    disabled={item.disabled}
                    deletable={item.deletable}
                    status={item.status}
                >
                    {item.content}
                </TabPane>)
            }
        </Checkbox>
    }
}
