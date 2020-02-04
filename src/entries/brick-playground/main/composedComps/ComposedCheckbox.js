import * as React from 'react'

import {Checkbox} from '@befe/brick'

export default class ComposedCheckbox extends React.Component {

    static displayName = 'ComposedCheckbox'

    static defaultProps = {
        type: 'normal',
        size: 'sm',
        options: [
            {
                value: '',
                label: '',
                indeterminate: false,
                disabled: false,
                checked: false,
            }
        ]
    }

    render() {
        const {
            type,
            defaultValue,
            size,
            options
        } = this.props
        return <div className="composed-checkbox">
            {
                options.map((item, index) => {
                    return <Checkbox
                        key={index}
                        type={type}
                        size={size}
                        disabled={item.disabled}
                        indeterminate={item.indeterminate}
                        checked={item.checked}
                    >
                        {item.label}
                    </Checkbox>

                })
            }
        </div>
    }
}
