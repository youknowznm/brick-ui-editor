import {createMuiTheme} from '@material-ui/core/styles'
import Teal from '@material-ui/core/colors/Teal'
import Purple from '@material-ui/core/colors/Purple'

const lightTheme = createMuiTheme({
    // transitions: {
    //     create: () => 'none'
    // },
    palette: {
        type: 'light',
        primary: Teal,
        secondary: Purple,
    },
})

export {
    lightTheme,
}
