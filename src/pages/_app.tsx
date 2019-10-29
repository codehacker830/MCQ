import App, { Container } from "next/app";
import React, { StrictMode } from "react";
import { StagingEnvironmentBanner } from "../components";
import { ThemeProvider } from "../lib/display";

/**
 * Custom Next.js App component. It removes the server side rendered CSS from
 * the DOM so that the client side modified CSS can take over. It also applies
 * the theme.
 */
class CustomApp extends App {
	componentDidMount() {
		// Remove the server-side injected CSS.
		const jssStyles = document.querySelector("#jss-server-side");
		if (jssStyles) {
			jssStyles.parentNode!.removeChild(jssStyles);
		}
	}

	render() {
		const { Component, pageProps } = this.props;

		return (
			<Container>
				<StrictMode>
					<ThemeProvider>
						<Component {...pageProps} />
						{/* <StagingEnvironmentBanner /> */}
					</ThemeProvider>
				</StrictMode>
			</Container>
		);
	}
}

export default CustomApp;
