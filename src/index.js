import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {lightTheme} from "./brick-playground/theme";
import Main from "./brick-playground/main/View";

import {ThemeProvider} from '@material-ui/core/styles'

ReactDOM.render(
  <ThemeProvider theme={lightTheme}>
      <Main/>
  </ThemeProvider>,
  document.getElementById('root')
);
