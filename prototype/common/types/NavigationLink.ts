import { ComponentType, ReactElement } from "react";
import { LocalizationKey } from "../../types";

/**
 * Represents a navigation link for use in a drawer or bottom navigation.
 */
export interface NavigationLink {
  /**
   * Link title as a LocalizationKey.
   */
  titleLocalizationKey: LocalizationKey;

  /**
   * The location to link to.
   */
  to: string;

  /**
   * Page component.
   */
  component: ComponentType<any>;

  /**
   * Optional icon to provide for drawer links and bottom navigation components.
   */
  iconElement?: ReactElement<any>;
}
