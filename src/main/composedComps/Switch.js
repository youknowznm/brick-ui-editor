import * as React from 'react'

import {Switch} from '@befe/brick'
// import '@befe/brick-comp-switch/src/index.scss'

export class ComposedIconSwitch extends React.Component {

    static displayName = 'ComposedIconSwitch'

    static defaultProps = {
        checked: false,
        disabled: false,
        loading: false,
    }

    render() {
        return <Switch
            className="composed-switch"
            {...this.props}
            size="md"
            iconLabel={true}
        />
    }
}

export class ComposedTextSwitch extends React.Component {

    static displayName = 'ComposedTextSwitch'

    static defaultProps = {
        checked: false,
        disabled: false,
        loading: false,
        size: 'sm',
    }

    render() {
        return <Switch
            className="composed-switch"
            {...this.props}
            iconLabel={false}
        />
    }
}
