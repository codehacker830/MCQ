import Typography, { TypographyProps } from "@material-ui/core/Typography";
import React from "react";
import styled, { css } from "styled-components";

export type LogoTextProps = Pick<TypographyProps, "component"> & {
	className?: string;

	/**
	 * Render logo text using only a single color rather than two.
	 *
	 * @default false
	 */
	singleTone?: boolean;

	/**
	 * Render logo text using only a single color rather than two on mobile.
	 *
	 * @default false
	 */
	singleToneMobile?: boolean;

	/**
	 * Add optional text shadow.
	 *
	 * @default false
	 */
	shadowed?: boolean;

	/**
	 * Hide logo text on mobile.
	 *
	 * @default false
	 */
	hideTextMobile?: boolean;
};

const singleToneCss = css`
	span:nth-child(2) {
		color: inherit;
	}
`;

const singleToneMobileCss = css`
	${({ theme }) => theme.breakpoints.down("sm")} {
		span:nth-child(2) {
			color: inherit;
		}
	}
`;

const hideTextMobileCss = css`
	${({ theme }) => theme.breakpoints.down("xs")} {
		display: none;
	}
`;

function LogoTextImpl(props: LogoTextProps) {
	const { className } = props;

	return (
		<Typography className={className} color="primary">
			<span>Join&nbsp;</span>
			<span>Uniform</span>
		</Typography>
	);
}

export const LogoText = styled(LogoTextImpl)`
	font-size: 22px;
	font-weight: 600;

	span:nth-child(2) {
		color: ${({ theme }) => theme.palette.secondary.main};
	}

	${({ singleTone }) => singleTone && singleToneCss};
	${({ singleToneMobile }) => singleToneMobile && singleToneMobileCss};
	${({ shadowed }) => shadowed && "text-shadow: 1px 1px #000"};
	${({ hideTextMobile }) => hideTextMobile && hideTextMobileCss};
`;
