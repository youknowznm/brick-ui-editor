import {createMuiTheme} from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import purple from '@material-ui/core/colors/purple';

const lightTheme = createMuiTheme({
    palette: {
        type: 'light',
        primary: teal,
        secondary: purple,
    },
});

export {
    lightTheme,
};
