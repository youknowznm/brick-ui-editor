import {createMuiTheme} from '@material-ui/core/styles'
import {blue} from '@material-ui/core/colors'

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: blue,
        // secondary: lightGreen,
    },
    status: {
        // danger: 'orange',
    },
})

const lightTheme = createMuiTheme({
    // transitions: {
    //     create: () => 'none'
    // },
    palette: {
        type: 'light',
        primary: blue,
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
