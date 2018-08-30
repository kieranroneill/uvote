import { createMuiTheme } from '@material-ui/core/styles';

// Styles.
import palette from './palette';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: palette.brand.purple500,
        },
        secondary: {
            main: palette.brand.green500,
        },
    },
});
