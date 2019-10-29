import { ComponentPropsWithoutRef } from "react";
import styled from "styled-components";
import logoImage48 from "./__assets__/logo48.png";
import logoImage64 from "./__assets__/logo64.png";

type LogoImageSizeProp = {
	/**
	 * Logo image dimensions.
	 *
	 * @default 48
	 */
	size?: 48 | 64;
};

export type LogoImageProps = ComponentPropsWithoutRef<"img"> &
	LogoImageSizeProp;

/**
 * Logo image.
 */
export const LogoImage = styled.img.attrs(
	({ size }: LogoImageSizeProp): LogoImageProps => ({
		src: size === 48 ? logoImage48 : logoImage64,
		alt: "",
	}),
)<LogoImageSizeProp>`
	width: ${({ size }) => size}px;
	height: ${({ size }) => size}px;
`;
