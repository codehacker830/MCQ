import React from "react";
import SvgIcon, { SvgIconProps } from "@material-ui/core/SvgIcon";

interface Props extends OmitStrict<SvgIconProps, "viewBox"> {
	/**
	 * Renders the disabled variant of the icon when `true`.
	 */
	disabled?: boolean;
}

/**
 * Google signin/signup icon with alternate `disabled` variant.
 *
 * The `path` elements were taken/adjusted from the official branding files.
 *
 * @see https://developers.google.com/identity/branding-guidelines
 */
export function AuthenticationFormGoogleButtonIcon(props: Props) {
	const { disabled, ...rest } = props;

	return (
		<SvgIcon {...rest} viewBox="0 0 46 46">
			<g fill="none" fillRule="evenodd">
				{!disabled ? (
					<>
						<path
							d="M31.64 23.205c0-.639-.057-1.252-.164-1.841H23v3.481h4.844a4.14 4.14 0 0 1-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
							fill="#4285f4"
						/>
						<path
							d="M23 32c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711h-3.007v2.332A8.997 8.997 0 0 0 23 32z"
							fill="#34a853"
						/>
						<path
							d="M17.964 24.71a5.41 5.41 0 0 1-.282-1.71c0-.593.102-1.17.282-1.71v-2.332h-3.007A8.996 8.996 0 0 0 14 23c0 1.452.348 2.827.957 4.042l3.007-2.332z"
							fill="#fbbc05"
						/>
						<path
							d="M23 17.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C27.463 14.891 25.426 14 23 14a8.997 8.997 0 0 0-8.043 4.958l3.007 2.332c.708-2.127 2.692-3.71 5.036-3.71z"
							fill="#ea4335"
						/>
					</>
				) : (
					<path
						d="M24.001,25.71 L24.001,22.362 L32.425,22.362 C32.551,22.929 32.65,23.46 32.65,24.207 C32.65,29.346 29.203,33 24.01,33 C19.042,33 15.01,28.968 15.01,24 C15.01,19.032 19.042,15 24.01,15 C26.44,15 28.474,15.891 30.031,17.349 L27.475,19.833 C26.827,19.221 25.693,18.501 24.01,18.501 C21.031,18.501 18.601,20.976 18.601,24.009 C18.601,27.042 21.031,29.517 24.01,29.517 C27.457,29.517 28.726,27.132 28.96,25.719 L24.001,25.719 L24.001,25.71 Z"
						fillOpacity="0.4"
						fill="#000000"
					/>
				)}
			</g>
		</SvgIcon>
	);
}
