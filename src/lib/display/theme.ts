import { createMuiTheme, Theme as MuiTheme } from "@material-ui/core/styles";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import { CSSProperties } from "@material-ui/styles";
import montserratLatin300Woff from "typeface-montserrat/files/montserrat-latin-300.woff";
import montserratLatin300Woff2 from "typeface-montserrat/files/montserrat-latin-300.woff2";
import montserratLatin400Woff from "typeface-montserrat/files/montserrat-latin-400.woff";
import montserratLatin400Woff2 from "typeface-montserrat/files/montserrat-latin-400.woff2";
import montserratLatin500Woff from "typeface-montserrat/files/montserrat-latin-500.woff";
import montserratLatin500Woff2 from "typeface-montserrat/files/montserrat-latin-500.woff2";
import montserratLatin700Woff from "typeface-montserrat/files/montserrat-latin-700.woff";
import montserratLatin700Woff2 from "typeface-montserrat/files/montserrat-latin-700.woff2";

// https://material-ui.com/components/typography/#install-with-npm
const montserratVariants: {
	fontWeight: number;
	src: string;
}[] = [
	{
		fontWeight: 300,
		src: `
      local('Montserrat Light '),
      local('Montserrat-Light'),
      url('${montserratLatin300Woff2}') format('woff2'),
      url('${montserratLatin300Woff}') format('woff')
    `,
	},
	{
		fontWeight: 400,
		src: `
      local('Montserrat Regular '),
      local('Montserrat-Regular'),
      url('${montserratLatin400Woff2}') format('woff2'),
      url('${montserratLatin400Woff}') format('woff')
    `,
	},
	{
		fontWeight: 500,
		src: `
      local('Montserrat Medium '),
      local('Montserrat-Medium'),
      url('${montserratLatin500Woff2}') format('woff2'),
      url('${montserratLatin500Woff}') format('woff')
    `,
	},
	{
		fontWeight: 700,
		src: `
      local('Montserrat Bold '),
      local('Montserrat-Bold'),
      url('${montserratLatin700Woff2}') format('woff2'),
      url('${montserratLatin700Woff}') format('woff')
    `,
	},
];

const montserrat = montserratVariants.map(variant => ({
	fontFamily: "Montserrat",
	fontStyle: "normal",
	fontDisplay: "swap",

	...variant,
}));

export type Theme = MuiTheme & {
	app: {
		/**
		 * The Material UI breakpoint to use as the maximum width for the containers
		 * wrapping page contents.
		 */
		maxContentWidthBreakpoint: Breakpoint;

		colors: {
			greenDark: string;
			blueLight: string;
		};
	};
};

export const theme: Theme = {
	...createMuiTheme({
		palette: {
			primary: {
				main: "#f9d017",
			},
			secondary: {
				main: "#00b150",
			},
			background: {
				// Change the default grey background color to white.
				default: "#fff",
			},
		},

		typography: {
			fontFamily: ["Montserrat", "sans-serif"].join(", "),
		},

		overrides: {
			// Remove uppercasing on buttons.
			MuiButton: {
				label: {
					textTransform: "none",
				},
			},

			// Set the font.
			MuiCssBaseline: {
				"@global": {
					// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/35614
					"@font-face": (montserrat as unknown) as CSSProperties,
				},
			},
		},

		props: {
			// Disable ripple effect due to StrictMode warnings.
			MuiButtonBase: {
				disableRipple: true,
			},
		},
	}),
	app: {
		maxContentWidthBreakpoint: "lg",
		colors: {
			greenDark: "#385723",
			blueLight: "#00b0f0",
		},
	},
};
