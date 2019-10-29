import { ComponentType, ReactElement } from "react";
import { LocalizationKey } from "../../../types";

/**
 * Represents a navigation link for use in the side drawer and bottom navigation
 * components.
 */
// tslint:disable-next-line: interface-name
export interface INavigationLink {
  /** Link title's localization key. */
  titleLocalizationKey: LocalizationKey;

  /** The location to link to. */
  to: string;

  /**
   * Alternate matched routes. These are paths to other pages which should also
   * act as matched paths. This is used in situations where multiple pages
   * correspond to the same navigation link.
   *
   * Example:
   * /membership/subscriptions
   * /membership/subscriptions/add
   */
  alternateMatchPaths?: string[];

  /** Page component. */
  component: ComponentType<any>;

  /** Optional icon to provide for navigation drawers and bottom navs. */
  iconElement?: ReactElement<any>;

  /** Whether the link is disabled or not. */
  disabled?: boolean;
}
