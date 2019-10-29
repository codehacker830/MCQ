import React, { Component, ReactNode } from "react";
import styled from "styled-components";

import { Button, ButtonProps } from "../Button";
import { Typography, TypographyProps } from "../Typography";

import Tooltip, { TooltipProps } from "@material-ui/core/Tooltip";
import withWidth, { isWidthDown } from "@material-ui/core/withWidth";

export interface ResponsiveToolbarTypographyButtonProps extends ButtonProps {
  className?: string;

  /**
   * Icon shown to the left of the description text.
   */
  iconNode: ReactNode;

  /**
   * Tooltip text to display on hover.
   */
  tooltipTitle: TooltipProps["title"];

  /**
   * Dense style. Signifies that the description text should never be visible.
   */
  dense?: boolean;

  /**
   * Button style (flat/raised).
   *
   * @default text
   */
  variant?: ButtonProps["variant"];

  /**
   * Typography style.
   *
   * @default buttonBold
   */
  typographyVariant?: TypographyProps["variant"];

  /**
   * Material UI Typography overrides.
   */
  muiTypographyProps?: TypographyProps["muiTypographyProps"];
}

/**
 * A button for use on app-bars and toolbars. Its purpose is to provide a button
 * which contains an icon and description text. On mobile viewport, the
 * description text is hidden to preserve horizontal space. It provides a
 * tooltip on hover.
 */
export class ResponsiveToolbarTypographyButton extends Component<
  ResponsiveToolbarTypographyButtonProps
> {
  render() {
    const {
      className: outerClassName,
      children,
      iconNode,
      tooltipTitle,
      dense,
      variant = "text",
      typographyVariant = "buttonBold",
      muiTypographyProps,
      ...rest
    } = this.props;

    // TODO: Fix this typing
    // @ts-ignore
    const WidthResponsiveButton = withWidth()(({ width }) => {
      const isMobile = dense || isWidthDown("xs", width);
      const className = `${outerClassName} ${isMobile ? "is-mobile" : ""}`;

      return (
        <Tooltip title={tooltipTitle}>
          <StyledButton className={className} variant={variant} {...rest}>
            {iconNode}
            {!isMobile && (
              <>
                <RightIconPadding />
                <Typography
                  variant={typographyVariant}
                  muiTypographyProps={muiTypographyProps}
                >
                  {children}
                </Typography>
              </>
            )}
          </StyledButton>
        </Tooltip>
      );
    });

    // @ts-ignore
    return <WidthResponsiveButton />;
  }
}

const StyledButton = (styled(Button)`
  min-width: inherit;

  &.is-mobile {
    width: 48px;
    padding: 0;
  }
` as any) as typeof Button;

const RightIconPadding = styled.div`
  width: ${({ theme }) => theme.spacing(1)}px;
`;
