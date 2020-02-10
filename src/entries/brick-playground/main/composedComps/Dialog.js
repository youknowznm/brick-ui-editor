import * as React from 'react'

import {Dialog} from '../localBrickComps/Dialog'

export default class ComposedDialog extends React.Component {

    static displayName = 'ComposedDialog'

    static defaultProps = {
        headline: '弹窗标题',
        children: '弹窗内容',
        size: 'sm',
        height: 'sm',
    }

    render() {
        const {
            width,
            height,
            content,
            ...restProps
        } = this.props

        const bodyHeightMap = {
            sm: 160,
            md: 320,
            lg: 480
        }

        return <Dialog
            visible={true}
            bodyHeight={bodyHeightMap[height]}
            {...restProps}
        />
    }
}
