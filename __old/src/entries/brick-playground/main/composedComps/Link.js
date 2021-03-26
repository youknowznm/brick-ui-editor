import * as React from 'react'

import {Link, Button, Icon} from '@befe/brick'

export default class ComposedLink extends React.Component {

    static displayName = 'ComposedLink'

    static defaultProps = {
        children: '',
        href: '',
        type: 'normal',
        size: 'sm',
        disabled: false,
    }

    render() {
        const {
            width,
            ...restProps
        } = this.props

        return <Link
            className="composed-link"
            {...restProps}
        />
    }
}
