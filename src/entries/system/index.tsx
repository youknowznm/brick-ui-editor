import {hot} from 'react-hot-loader/root'
import * as React from 'react'

import {BasicLayout, start} from '../../layouts'
import {routes} from './routes'
import './style.scss'
import {Provider} from 'mobx-react'
import { systemState } from "./AppState";
const App = hot(() => <Provider app={systemState}>
    <BasicLayout routes={routes}/>
</Provider>);
start(App)

