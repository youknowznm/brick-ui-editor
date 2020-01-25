import {hot} from 'react-hot-loader/root'
import * as React from 'react'

import {start} from 'src/layouts/bootstrap'
import {BasicLayout} from 'src/layouts'

import './style.scss'
import {routes} from './routes'

const App = hot(() => <BasicLayout routes={routes} />)
start(App)
