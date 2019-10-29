import React, { SFC } from "react";
import styled from "styled-components";
import { styleTable } from "./styleTable";
import { Style, Variant } from "./types";

// tslint:disable-next-line:import-name
import MuiTypography, {
  TypographyProps as MuiTypographyProps,
} from "@material-ui/core/Typography";

export { Variant as TypographyVariant };

type BaseSharedProps =
  | "align"
  | "color"
  | "gutterBottom"
  | "noWrap"
  | "paragraph";

export type TypographyProps = Pick<MuiTypographyProps, BaseSharedProps> & {
  /**
   * CSS classname for extensibility.
   */
  className?: string;

  /**
   * Manual style overrides for extensibility.
   */
  style?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  >["style"];

  /**
   * Style variant. One of:
   * - H1
   * - H2
   * - H3
   * - H4
   * - H5
   * - H6
   * - Subtitle1
   * - Subtitle2
   * - Body1
   * - Body2
   * - Button
   * - Caption
   * - Overline
   */
  variant?: keyof typeof Variant;

  /**
   * Set the root component.
   *
   * Example: "h1"
   */
  component?: keyof JSX.IntrinsicElements;
};

/**
 * Typography component based on the second iteration of the Material Design
 * specifications.
 *
 * @see https://material.io/design/typography/the-type-system.html
 */
export const Typography: SFC<TypographyProps> = props => {
  const { variant = Variant.Body1, component, ...rest } = props;

  const componentVariant = styles[variant];
  const TypographyComponent = component
    ? componentVariant.withComponent(component)
    : componentVariant;

  return (
    <MuiTypography
      component={({ className, style, children }) => (
        <TypographyComponent className={className} style={style}>
          {children}
        </TypographyComponent>
      )}
      {...rest}
    />
  );
};

const styles: Record<Variant, Style> = Object.entries(styleTable).reduce(
  (accumulator, [variantKey, [typeface, font, size, casing, spacing]]) => {
    const variant = variantKey as Variant;

    accumulator[variant] = styled.span`
      font-family: ${typeface};
      font-weight: ${font};
      font-size: ${size / 16}rem;
      ${casing === "all caps" && "text-transform: uppercase"};
      letter-spacing: ${spacing / size}rem;
      line-height: initial;
      line-height: unset;
    `;

    return accumulator;
  },
  // tslint:disable-next-line:no-object-literal-type-assertion
  {} as Record<Variant, Style>,
);
