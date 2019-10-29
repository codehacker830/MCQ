import React from "react";
import styled from "styled-components";
import { LogoImage, LogoImageProps } from "./LogoImage";
import { LogoText, LogoTextProps } from "./LogoText";

type Props = Pick<LogoImageProps, "size"> & LogoTextProps;

/**
 * Site logo.
 */
export const Logo = styled((props: Props) => {
	const { className, size, ...rest } = props;

	return (
		<div className={className}>
			<LogoImage size={size} />
			<LogoText {...rest} />
		</div>
	);
})`
	display: flex;
	flex-shrink: 0;
	align-items: center;

	${LogoImage} {
		margin-right: 16px;
	}
`;
