import * as React from 'react'
import {RouteItem} from 'src/layouts'
import {SITE_NODE_WORK_LIST} from './site-map'

const routes: RouteItem[] = [
    {
        key: 'operation-list',
        ...SITE_NODE_WORK_LIST,
        component: React.lazy(() => import('./list/page')),
    },
]

export {routes}
