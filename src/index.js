import React from 'react';
import ReactDOM from 'react-dom';
import {lightTheme} from "./theme";
import Main from "./main/View";

import {ThemeProvider} from '@material-ui/core/styles'

ReactDOM.render(
    <ThemeProvider theme={lightTheme}>
        <Main/>
    </ThemeProvider>,
    document.getElementById('root')
);
