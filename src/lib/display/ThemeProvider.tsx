import { ThemeProvider as MaterialUIThemeProvider } from "@material-ui/styles";
import React, { ReactNode } from "react";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import { theme } from "./theme";
import { StylesProvider as MaterialUIStylesProvider } from "@material-ui/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

type Props = {
	children?: ReactNode;
};

export function ThemeProvider(props: Props) {
	return (
		<MaterialUIStylesProvider injectFirst>
			<MaterialUIThemeProvider theme={theme}>
				<StyledComponentsThemeProvider theme={theme}>
					<>
						<CssBaseline />

						{props.children}
					</>
				</StyledComponentsThemeProvider>
			</MaterialUIThemeProvider>
		</MaterialUIStylesProvider>
	);
}
