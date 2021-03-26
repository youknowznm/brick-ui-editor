import * as React from 'react'

import {FileList} from '@befe/brick'

export default class ComposedFileList extends React.Component {

    static displayName = 'ComposedFileList'

    static defaultProps = {
        layout: 'vertical',
        useRemove: false,
        data: [],
        width: 500,
    }

    render() {
        const {
            width,
            ...restProps
        } = this.props

        return <div
            className="composed-file-list"
            style={{
                width: `${width}px`
            }}
        >
            <FileList
                {...restProps}
            />
        </div>
    }
}
