import React from "react";
import styled from "styled-components";
import robotoLatin500Woff from "typeface-roboto/files/roboto-latin-500.woff";
import robotoLatin500Woff2 from "typeface-roboto/files/roboto-latin-500.woff2";
import { AuthenticationFormGoogleButtonIcon } from "./AuthenticationFormGoogleButtonIcon";
import Button, { ButtonProps } from "@material-ui/core/Button";
import { FormikConsumer } from "formik";

interface Props
	extends OmitStrict<
		ButtonProps,
		"children" | "variant" | "fullWidth" | "disabled"
	> {
	children: string;
}

/**
 * Google signin/signup button which attempts to adhere to Google's branding
 * standards.
 *
 * @see https://developers.google.com/identity/branding-guidelines
 */
export function AuthenticationFormGoogleButton(props: Props) {
	const { children, ...rest } = props;

	return (
		<FormikConsumer>
			{form => (
				<StyledButton
					variant="contained"
					fullWidth
					disabled={form.isSubmitting}
					{...rest}
				>
					{/* Pass along the "disabled" prop to render alternate SVG. */}
					<StyledAuthenticationFormGoogleButtonIcon
						disabled={form.isSubmitting}
					/>
					<StyledSpan>{children}</StyledSpan>
				</StyledButton>
			)}
		</FormikConsumer>
	);
}

const iconWidth = 38;

const StyledAuthenticationFormGoogleButtonIcon = styled(
	AuthenticationFormGoogleButtonIcon,
)`
	width: ${iconWidth}px;
	height: ${iconWidth}px;
	border-top-left-radius: 4px;
	border-bottom-left-radius: 4px;

	/* Zoom in the Google logo ("G") and adjust its position. */
	g {
		transform: scale(1.2) translate(-7%, -7%);
	}
`;

const StyledSpan = styled.span`
	flex: 1;
	padding-right: ${iconWidth / 2}px;
	font-family: "Roboto", sans-serif;
	font-size: 14px;
`;

const StyledButton = styled(Button)`
	@font-face {
		font-family: 'Roboto';
		font-style: normal;
		font-display: swap;
		font-weight: 500;
		src:
			local('Roboto Medium '),
			local('Roboto-Medium'),
			url('${robotoLatin500Woff2}') format('woff2'),
			url('${robotoLatin500Woff}') format('woff');
	}

	justify-content: space-between;
	padding: 1px;
	color: #fff;
	background-color: #4285f4;
	cursor: pointer;

	${StyledAuthenticationFormGoogleButtonIcon} {
		background-color: #fff;
	}

	&.Mui-disabled ${StyledAuthenticationFormGoogleButtonIcon} {
		background-color: transparent;
	}

	&.Mui-disabled ${StyledAuthenticationFormGoogleButtonIcon} path {
		fill: ${({ theme }) => theme.palette.action.disabled};
	}

	/* Reset on touch devices, it doesn't add specificity. */
	:hover {
		background-color: #3367d6;
	}
	@media (hover: none) {
		background-color: #4285f4;
	}
`;
