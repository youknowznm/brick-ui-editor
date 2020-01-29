import {hot} from 'react-hot-loader/root'
import * as React from 'react'

import {start} from 'src/layouts/bootstrap'
import {BasicLayout} from 'src/layouts'

import { ThemeProvider } from '@material-ui/core/styles'
import theme from './theme.js'

import './style.scss'

import Main from './main/View.js'

const App = hot(() => <ThemeProvider theme={theme}>
    <Main/>
</ThemeProvider>)

start(App)
