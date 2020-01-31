import {hot} from 'react-hot-loader/root'
import * as React from 'react'

import {start} from 'src/layouts/bootstrap'
import {BasicLayout} from 'src/layouts'

import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/core/styles'
import {lightTheme} from './theme'

import './style.scss'

import Main from './main/View'

const App = hot(() => <ThemeProvider theme={lightTheme}>
    <CssBaseline>
        <Main/>
    </CssBaseline>
</ThemeProvider>)

start(App)
