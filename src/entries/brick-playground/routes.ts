import * as React from 'react'
import {RouteItem} from 'src/layouts'
import {SITE_NODE_MAIN_LIST} from './site-map'

const routes: RouteItem[] = [
    {
        key: 'operation-list',
        ...SITE_NODE_MAIN_LIST,
        component: React.lazy(() => import('./main/View')),
    },
]

export {routes}
