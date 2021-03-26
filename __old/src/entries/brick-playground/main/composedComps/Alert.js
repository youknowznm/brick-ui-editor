import * as React from 'react'

import {Alert} from '@befe/brick'

export default class ComposedAlert extends React.Component {

    static displayName = 'ComposedAlert'

    static defaultProps = {
        type: 'info',
        icon: true,
        headline: '',
        content: '',
        width: 340,
        // height: 340,
        closable: false,
    }

    render() {
        const {
            width,
            height,
            ...restProps
        } = this.props

        return <div
            style={{
                width: `${width}px`,
                // height: `${height}px`,
            }}
            className="composed-alert"
        >
            <Alert
                {...restProps}
            />
        </div>
    }
}
