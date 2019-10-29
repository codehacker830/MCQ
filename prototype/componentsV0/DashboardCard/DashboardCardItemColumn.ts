import { ReactElement, ReactNode } from "react";
export interface DashboardCardItemColumn {
  /**
   * Called when the item is click.
   */
  onClick?: () => any;

  /**
   * Item wrapper element. Column component will be a child of this element.
   *
   * This is used to insert modal components at the location of buttons.
   */
  wrapper?: ReactElement<any>;

  // Single line / Dual line / Button
  primaryText?: string;
  secondaryText?: string;

  // Image
  imgUrl?: string;

  // Switch
  switchChecked?: boolean;
  switchOnChange?: (checked: boolean) => any;
  switchTooltipTitle?: string;

  // Button
  buttonIconNode?: ReactNode;
  buttonTooltipTitle?: string;

  // Profile
  isNewUser?: boolean;
}
