// tslint:disable-next-line:import-name
import MuiTypography, {
  TypographyProps as MuiTypographyProps,
} from "@material-ui/core/Typography";
import React, { CSSProperties, FC, SFC } from "react";
import styled, { ThemedStyledFunction } from "styled-components";
import { Theme } from "../../theme";

export enum Variant {
  body = "body",
  cardTitle = "cardTitle",
  cardLargeStatText = "cardLargeStatText",
  cardStatCaption = "cardStatCaption",
  tableHeadCell = "tableHeadCell",
  buttonBold = "buttonBold",
  formFieldTitle = "formFieldTitle",

  examDrawerTitle = "examDrawerTitle",
  examDrawerSubtitle = "examDrawerSubtitle",

  examTitle = "examTitle",
  examQuestion = "examQuestion",
}

type StyledMuiTypography = ReturnType<
  ThemedStyledFunction<FC<MuiTypographyProps>, Theme>
>;

// Provide styling overrides for the various typography variants.
const variants: Record<Variant, StyledMuiTypography> = {
  body: styled(MuiTypography).attrs({ variant: "body1" })``,

  cardTitle: styled(MuiTypography)`
    font-size: 18px;
    font-weight: 500;
  `,

  cardLargeStatText: styled(MuiTypography).attrs({ variant: "h4" })``,

  cardStatCaption: styled(MuiTypography).attrs({ variant: "caption" })``,

  tableHeadCell: styled(MuiTypography).attrs({ variant: "body1" })``,

  buttonBold: styled(MuiTypography).attrs({ variant: "body1" })``,

  formFieldTitle: styled(MuiTypography).attrs({ variant: "body1" })`
    color: ${({ theme }) => theme.palette.grey["700"]};
  `,

  examDrawerTitle: styled(MuiTypography).attrs({ variant: "body2" })`
    font-size: 16px;
    font-weight: 500;
  `,

  examDrawerSubtitle: styled(MuiTypography).attrs({ variant: "body2" })`
    font-size: 16px;
  `,

  examTitle: styled(MuiTypography)`
    font-size: 20px;
  `,

  examQuestion: styled(MuiTypography)`
    font-size: 16px;
    font-weight: 500;
  `,
};

export interface TypographyProps {
  className?: string;
  style?: CSSProperties;

  /**
   * The style variant of the typography to use.
   *
   * @default body
   */
  variant?: keyof typeof Variant;

  /**
   * The component to wrap the text in.
   *
   * @default span
   */
  component?: MuiTypographyProps["component"];

  /**
   * Material UI typography prop overrides to apply.
   */
  muiTypographyProps?: MuiTypographyProps;

  /**
   * Add left padding for alignment with Toolbar Button.
   */
  padLeftToolbarButton?: boolean;
}

/**
 * Provides a standard set of text typography to use throughout the application.
 */
export const Typography: SFC<TypographyProps> = props => {
  const {
    children,
    className,
    style,
    component,
    muiTypographyProps,
    variant,
    padLeftToolbarButton,
  } = props;

  const TypographyBase = variants[variant || "body"];

  return (
    <TypographyBase
      className={className}
      component={component || "span"}
      style={{
        ...(padLeftToolbarButton ? { paddingLeft: 32 } : {}),
        ...style,
      }}
      {...(muiTypographyProps as any)}
    >
      {children}
    </TypographyBase>
  );
};
