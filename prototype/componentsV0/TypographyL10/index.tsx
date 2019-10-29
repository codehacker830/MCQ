import React, { Component } from "react";
import { strings } from "../../features/localization";
import { Typography, TypographyProps } from "../Typography";

type L10LocalizationKey = keyof typeof strings;

export interface TypographyL10Props extends TypographyProps {
  /**
   * A localization string key. It uses the specified key to provide the
   * contents to the underlying Typography component.
   */
  localizationKey: keyof typeof strings;

  /**
   * Values to replace placeholder fields ({0}, {1}, ...) in the localization
   * string.
   */
  replaceValues?: string[];
}

/**
 * Provides a Typography component with the value provided to the children prop
 * replaced by the corresponding localization string.
 */
export class TypographyL10 extends Component<TypographyL10Props> {
  render() {
    const { children, localizationKey, replaceValues, ...rest } = this.props;

    if (children) {
      throw new Error("No children are accepted by this component.");
    }

    if (!isLocalizationKey(localizationKey)) {
      throw new Error(`${localizationKey} is not a valid localization key.`);
    }

    const l10LocalizationKey = localizationKey as L10LocalizationKey;
    let text = strings[l10LocalizationKey] as string;

    if (replaceValues) {
      replaceValues.forEach((r, index) => {
        // tslint:disable-next-line:no-invalid-template-strings prefer-template
        text = text.replace("${" + (index + 1) + "}", r);
      });
    }

    return <Typography {...rest}>{text}</Typography>;
  }
}

/**
 * This is a user defined type guard. It determines whether or not the provided
 * "children" prop is in fact a localization key.
 *
 * @see http://www.typescriptlang.org/docs/handbook/advanced-types.html
 */
const isLocalizationKey = (
  localizationKey: string,
): localizationKey is L10LocalizationKey => {
  if (
    Object.keys(strings).includes(localizationKey) &&
    typeof (strings as Record<string, any>)[localizationKey] === "string"
  ) {
    return true;
  }

  return false;
};
