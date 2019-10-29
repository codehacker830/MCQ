/**
 * This module provides overrides to the default theme of Material UI.
 *
 * @see https://material-ui-next.com/customization/default-theme/
 */
import createMuiTheme, {
  ThemeOptions,
} from "@material-ui/core/styles/createMuiTheme";
import { Theme as CustomTheme } from "../../lib/display/theme";

const theme: ThemeOptions = {
  palette: {
    background: {
      // default: "#fff",
    },
    primary: {
      main: "#2f8d2b", // green
    },
    secondary: {
      main: "#f9d017", // yellow
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
};

export const lightTheme = createMuiTheme({
  ...theme,
});

export const darkTheme = createMuiTheme({
  ...theme,
  palette: {
    ...theme.palette,
    type: "dark",
  },
});

export const adminAppDrawerTheme = createMuiTheme({
  ...theme,
  palette: {
    ...theme.palette,
    background: { default: "#4f4f4f" },
    type: "dark",
  },
});

export const userAppDrawerTheme = createMuiTheme({
  ...theme,
  palette: {
    ...theme.palette,
    background: { default: "#03285b" },
    type: "dark",
  },
  // Make portaled bottom navigation app bars have the same background color
  // as the bottom navigation swipe interface.
  overrides: {
    MuiAppBar: {
      root: {
        backgroundColor: "#03285b !important",
      },
    },
  },
});

export type Theme = CustomTheme;
