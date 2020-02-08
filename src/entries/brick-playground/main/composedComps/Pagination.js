import * as React from 'react'

import {Pagination} from '@befe/brick'

export default class ComposedPagination extends React.Component {

    static displayName = 'ComposedPagination'

    static defaultProps = {
        total: 100,
        size: 'sm',
        simple: false,
        disabled: false,
        showTotal: true,
        showSizeOptions: true,
        showJumper: true,
        width: 750,
        // height: 50,
    }

    render() {
        const {
            width,
            // height,
            ...restProps
        } = this.props

        return <div
            className="composed-pagination"
            style={{
                width: `${width}px`,
                height: `${50}px`,
            }}
        >
            <Pagination
                {...restProps}
            />
        </div>
    }
}
