import {hot} from 'react-hot-loader/root'
import * as React from 'react'

import {start} from 'src/layouts/bootstrap'
import {BasicLayout} from 'src/layouts'

import './style.scss'

import Main from './main/View.js'

const App = hot(() => <Main/>)
start(App)
