import * as React from 'react'

import {Dialog} from '../localBrickComps/Dialog'

export default class ComposedDialog extends React.Component {

    static displayName = 'ComposedDialog'

    static defaultProps = {
        headline: '弹窗标题',
        children: '弹窗内容',
        size: 'sm',
        height: 350,
    }

    render() {
        const {
            width,
            height,
            content,
            ...restProps
        } = this.props

        return <Dialog
            visible={true}
            height={+height}
            {...restProps}
        />
    }
}
