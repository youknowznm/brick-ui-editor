import * as React from 'react'

import {Radio} from '@befe/brick'

export default class ComposedRadioGroup extends React.Component {

    static displayName = 'ComposedRadioGroup'

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
        return <div className="composed-radio-group">
            {
                options.map((item, index) => {
                    return <Radio
                        key={index}
                        type={type}
                        size={size}
                        disabled={item.disabled}
                        indeterminate={item.indeterminate}
                        checked={item.checked}
                    >
                        {item.label}
                    </Radio>

                })
            }
        </div>
    }
}
