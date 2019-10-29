import React, { CSSProperties, ReactNode, SFC } from "react";
import styled from "styled-components";

import { BlockImage } from "../../componentsV0/BlockImage";
import { Typography, TypographyProps } from "../Typography";

export type CardHeaderProps = {
  /** Card title. */
  title: ReactNode;

  titleStyle?: CSSProperties;

  /** Subheader contents. */
  subheader?: ReactNode;

  /**
   * Subheader color.
   *
   * @default textSecondary
   */
  subheaderColor?: NonNullable<TypographyProps["color"]>;

  /** Image url. */
  imageUrl?: string;

  /**
   * Image size.
   *
   * @default 80
   */
  imageSize?: 48 | 80;

  /** Overline contents. */
  overline?: string;
};

export const CardHeader: SFC<CardHeaderProps> = props => {
  const {
    title,
    titleStyle,
    subheader,
    imageUrl,
    imageSize = 80,
    overline,
    subheaderColor = "textSecondary",
  } = props;

  return (
    <Wrapper>
      {imageUrl && <Image src={imageUrl} size={imageSize} />}

      <div>
        {overline && <Overline>{overline}</Overline>}

        <Title style={titleStyle}>{title}</Title>

        <Subheader color={subheaderColor}>{subheader}</Subheader>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)}px;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    padding: ${({ theme }) => theme.spacing(2)}px
      ${({ theme }) => theme.spacing(3)}px;
  }
`;

const Image = styled(
  (props: { className?: string; src: string; size: number }) => (
    <BlockImage className={props.className} src={props.src} />
  ),
)`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  margin-right: ${({ theme }) => theme.spacing(2)}px;
`;

const Overline = styled(
  ({ className, children }: { children?: ReactNode; className?: string }) => (
    <Typography className={className} variant="Overline" gutterBottom>
      {children}
    </Typography>
  ),
)`
  font-weight: 500;
`;

const Title = styled(
  ({
    children,
    className,
    style,
  }: {
    children?: ReactNode;
    className?: string;
    style?: CSSProperties;
  }) => (
    <Typography className={className} variant="H5" paragraph style={style}>
      {children}
    </Typography>
  ),
)`
  margin-bottom: 8px;
`;

const Subheader = styled(
  ({
    children,
    className,
    color,
  }: {
    children?: ReactNode;
    className?: string;
    color: NonNullable<CardHeaderProps["subheaderColor"]>;
  }) => (
    <Typography
      className={className}
      variant="Subtitle2"
      gutterBottom
      color={color}
    >
      {children}
    </Typography>
  ),
)``;
