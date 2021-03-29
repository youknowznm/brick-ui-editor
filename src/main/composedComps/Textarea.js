import * as React from 'react'

import {Textarea} from '@befe/brick'
// import '@befe/brick-comp-textarea/src/index.scss'

export default class ComposedTextarea extends React.Component {

    static displayName = 'ComposedTextarea'

    static defaultProps = {
        value: '',
        placeholder: '占位符',
        width: 240,
        maxLength: 10,
        size: 'sm',
        rows: 3,
        disabled: false,
        // allowOverflow: false, // 这里的这个 prop 没有意义
        status: 'normal',
    }

    render() {
        const {
            width,
            ...restProps
        } = this.props

        return <div
            className="composed-textarea"
            style={{
                width: `${width}px`
            }}
        >
            <Textarea
                {...restProps}
            />
        </div>

    }
}
