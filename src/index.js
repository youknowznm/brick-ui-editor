import ReactDOM from 'react-dom';
import {lightTheme} from './theme';
import Main from './main/View';
import {ThemeProvider} from '@material-ui/core/styles';

import style from './style.scss';

ReactDOM.render(
    <ThemeProvider theme={lightTheme}>
        <Main style={style}/>
    </ThemeProvider>,
    document.getElementById('root')
);
