import {createMuiTheme} from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import purple from '@material-ui/core/colors/purple'
import orange from '@material-ui/core/colors/orange'

// const darkTheme = createMuiTheme({
//     palette: {
//         type: 'dark',
//         primary: {
//             main: '#1976d2'
//         },
//         secondary: {
//             main: '#f57c00'
//         },
//     },
//     status: {
//         // danger: 'orange',
//     },
// })

const lightTheme = createMuiTheme({
    // transitions: {
    //     create: () => 'none'
    // },
    palette: {
        type: 'light',
        // primary: blue,
        primary: purple,
        secondary: orange,
    },
    status: {
        // danger: 'orange',
    },
})

export {
    // darkTheme,
    lightTheme,
}
