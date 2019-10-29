// tslint:disable-next-line:import-name
import MuiButton, {
  ButtonProps as MuiButtonProps,
} from "@material-ui/core/Button";
import {
  darken,
  fade,
  // lighten,
} from "@material-ui/core/styles/colorManipulator";
import React from "react";
import styled, { css } from "styled-components";
import { styleTable } from "../Typography";

const createCustomColorCss = (colorName: string, color: string) => {
  // From:
  // https://github.com/mui-org/material-ui/blob/master/packages/material-ui/src/styles/createPalette.js
  // function addLightOrDark(..)
  const tonalOffset = 0.2;
  // const colorLight = lighten(color, tonalOffset);
  const colorDark = darken(color, tonalOffset * 1.5);

  return css`
    &.color-${colorName} {
      color: ${color};
    }

    /* Styles applied to the root element if variant="text". */
    &.variant-text.color-${colorName} {
      &:hover {
        background-color: ${({ theme }) =>
          fade(color, theme.palette.action.hoverOpacity)};

        /* Reset on touch devices, it doesn't add specificity */
        @media (hover: none) {
          background-color: transparent;
        }
      }
    }

    /* Styles applied to the root element if variant="outlined" */
    &.variant-outlined.color-${colorName} {
      border: 1px solid ${fade(color, 0.5)};

      &:hover {
        border: 1px solid ${color};
      }
    }

    /* Styles applied to the root element if variant="[contained | fab]". */
    &.variant-contained.color-${colorName},
      &.variant-fab.color-${colorName},
      &.variant-extendedFab.color-${colorName} {
      ${({ theme }) => `
      color: ${theme.palette.getContrastText(color)};
      background-color: ${color};
      box-shadow: ${theme.shadows[2]};

      &.focusVisible {
        box-shadow: ${theme.shadows[6]};
      }

      &:active {
        box-shadow: ${theme.shadows[8]};
      }

      &.disabled {
        color: ${theme.palette.action.disabled};
        background-color: ${theme.palette.action.disabledBackground};
        box-shadow: ${theme.shadows[0]};
      }

      &:hover {
        background-color: ${colorDark};

        /* Reset on touch devices, it doesn't add specificity */
        @media (hover: none) {
          background-color: ${color};
        }
      }
    `};
    }
  `;
};

const buttonColors = {
  primary: createCustomColorCss("primary", "#2f8d2b"),
  orange: createCustomColorCss("orange", "#f2994a"),
  red: createCustomColorCss("red", "#910f0f"),
  blue: createCustomColorCss("blue", "#2d9cdb"),
  yellow: createCustomColorCss("yellow", "#ecd100"),
  lightGreen: createCustomColorCss("lightGreen", "#4fef48"),
};

export const colors: NonNullable<ButtonProps["color"]>[] = [
  "default",
  "inherit",
  ...(Object.keys(buttonColors) as NonNullable<ButtonProps["color"]>[]),
];

const buttonColorsCss = Object.values(buttonColors).reduce(
  (accumulator, color) => {
    return [...accumulator, ...color];
  },
  [],
);

const [typeface, font, size, casing, spacing] = styleTable.Button;
if (casing) {
  //
}

const typographyCss = css`
  font-family: ${typeface};
  font-weight: ${font};
  font-size: ${size / 16}rem;
  letter-spacing: ${spacing / size}rem;
  text-transform: none;
`;

export type ButtonProps<D extends React.ElementType = "button"> = OmitStrict<
  MuiButtonProps<D>,
  "classes" | "color" | "variant"
> & {
  classes?: Omit<
    NonNullable<MuiButtonProps["classes"]>,
    "disabled" | "focusVisible"
  >;
  color?: keyof typeof buttonColors | "default" | "inherit";
  variant?: "text" | "outlined" | "contained" | "fab" | "extendedFab";
};

export const Button = styled(
  // TODO: Fix this generic for the component prop:
  <D extends React.ElementType = "button">(props: ButtonProps<D>) => {
    const {
      className,
      classes: parentClasses = {},
      color = "default",
      variant = "text",
      ...rest
    } = props;

    const classNames: string[] = [];
    if (className) classNames.push(className);
    classNames.push(`variant-${variant}`);

    if (color !== "default" && color !== "inherit") {
      classNames.push(`color-${color}`);
    }

    const classes: MuiButtonProps["classes"] = {
      ...parentClasses,
      disabled: "disabled",
      focusVisible: "focusVisible",
    };

    return (
      <MuiButton
        className={classNames.join(" ")}
        classes={classes}
        color={color === "inherit" ? "inherit" : "default"}
        variant={variant}
        {...rest}
      />
    );
  },
)`
  ${typographyCss};
  ${buttonColorsCss};
`;
