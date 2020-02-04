import {createMuiTheme} from '@material-ui/core/styles'
import {blue, orange} from '@material-ui/core/colors'

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
        primary: blue,
        secondary: orange,
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
        secondary: orange,
    },
    status: {
        // danger: 'orange',
    },
})

export {
    darkTheme,
    lightTheme,
}
