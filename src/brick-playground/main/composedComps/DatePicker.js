import * as React from 'react'

import {DatePicker} from '../localBrickComps/DatePicker'

export default class ComposedDatePicker extends React.Component {

    static displayName = 'ComposedDatePicker'

    static defaultProps = {
        children: '',
        href: '',
        type: 'normal',
        size: 'sm',
        disabled: false,
        width: 180,
    }

    render() {
        const {
            width,
            ...restProps
        } = this.props

        return <div
            className="composed-date-picker"
            style={{
                width: `${width}px`,
                // height: `${height}px`,
            }}
        >
            <DatePicker
                {...restProps}
            />
        </div>
    }
}
