import * as React from 'react'

import {Switch} from '@befe/brick'

export default class ComposedIconSwitch extends React.Component {

    static displayName = 'ComposedIconSwitch'

    static defaultProps = {
        checked: false,
        disabled: false,
        iconLabel: false,
        loading: false,
        size: 'sm',
    }

    render() {
        return <Switch
            className="composed-Switch"
            {...this.props}
        />
    }
}
