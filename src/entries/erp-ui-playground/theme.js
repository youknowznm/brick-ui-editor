import {createMuiTheme} from '@material-ui/core/styles'
import {green} from '@material-ui/core/colors'

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: green,
        // secondary: lightGreen,
    },
    status: {
        // danger: 'orange',
    },
})

const lightTheme = createMuiTheme({
    palette: {
        type: 'light',
        // primary: purple,
        // secondary: lightGreen,
    },
    status: {
        // danger: 'orange',
    },
})

export {
    darkTheme,
    lightTheme,
}
