import * as React from 'react'
import {render} from 'react-dom'
import {RouteProps} from 'react-router-dom'

export interface RouteItem extends RouteProps {
    key?: string
    label?: string
    path: string
    component?: React.ComponentType | React.LazyExoticComponent<React.ComponentType<any>>
}

export function start(App: React.ComponentType) {
    render(
        React.createElement(App),
        document.getElementById('app')
    )
}
