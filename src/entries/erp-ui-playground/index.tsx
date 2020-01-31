import {hot} from 'react-hot-loader/root'
import * as React from 'react'

import {start} from 'src/layouts/bootstrap'
import {BasicLayout} from 'src/layouts'

import {ThemeProvider} from '@material-ui/core/styles'
import {darkTheme} from './theme.js'

import './style.scss'

import Main from './main/View.js'

const App = hot(() => <ThemeProvider theme={darkTheme}>
    <Main/>
</ThemeProvider>)

start(App)
