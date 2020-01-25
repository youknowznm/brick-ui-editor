import * as React from 'react'
import {RouteItem} from 'src/layouts'
import {SITE_NODE_ARCHIVING_LIST} from './site-map'

const routes: RouteItem[] = [
    {
        key: 'operation-group-list',
        ...SITE_NODE_ARCHIVING_LIST,
        component: React.lazy(() => import('./group-list/page')),
    },
]

export {routes}
