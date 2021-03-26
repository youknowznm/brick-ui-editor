import {hot} from 'react-hot-loader/root'
import * as React from 'react'

import {start} from 'src/layouts/bootstrap'

import {ThemeProvider} from '@material-ui/core/styles'
import {lightTheme} from './theme'

import './style.scss'

import Main from './main/View'

const App = hot(() => <ThemeProvider theme={lightTheme}>
    <Main/>
</ThemeProvider>)

start(App)
