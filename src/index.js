import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {lightTheme} from "./brick-playground/theme";
import Main from "./brick-playground/main/View";

import {ThemeProvider} from '@material-ui/core/styles'


ReactDOM.render(
  <React.StrictMode>
      <ThemeProvider theme={lightTheme}>
          <Main/>
      </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
