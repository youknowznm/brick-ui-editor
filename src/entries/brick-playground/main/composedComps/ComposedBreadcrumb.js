import * as React from 'react'

import {Breadcrumb} from '@befe/brick'

export default class ComposedBreadcrumb extends React.Component {

    static displayName = 'ComposedBreadcrumb'

    static defaultProps = {
        size: 'sm',
        data: [
            {
                label: '标题 1',
                href: '#',
            }
        ],
        divider: '',
        width: 300
    }

    render() {
        const {
            width,
            divider,
            ...restProps
        } = this.props


        return <div
            style={{
                width: `${width}px`,
                display: 'block',
                whiteSpace: 'normal'
            }}
            className="composed-breadcrumb"
        >
            <Breadcrumb
                divider={divider !== '' ? divider : undefined}
                {...restProps}
            />
        </div>
    }
}
