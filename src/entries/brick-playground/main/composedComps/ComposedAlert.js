import * as React from 'react'

import {Alert} from '@befe/brick'

export default class ComposedAlert extends React.Component {

    static displayName = 'ComposedAlert'

    static defaultProps = {
        type: 'info',
        icon: true,
        headline: '',
        content: '',
        width: 300,
        closable: false,
    }

    render() {
        const {
            width,
            ...restProps
        } = this.props

        return <div
            style={{
                width: `${width}px`,
                display: 'block',
                whiteSpace: 'normal'
            }}
            className="composed-alert"
        >
            <Alert
                {...restProps}
            />
        </div>
    }
}
