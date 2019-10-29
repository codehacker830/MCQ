import { LocalizedString } from "../../../types";

/**
 * Provides the quantity options for Entry Categories.
 */
// tslint:disable-next-line: interface-name
export interface ICategoryQuantitySelectionSettings {
  /** Price per exam in (Rs). */
  examPriceRs: number;

  /** Localization keys for the labels for each quantity option.  */
  quantitiesLabels: LocalizedString[];

  /** The number of exams included for each quantity option. */
  quantities: number[];

  /** The indexes of the quantities which are free of charge. */
  quantitiesFreeIndexes: number[];
}
