import { LocalizedString } from "../types";

/**
 * An Entry (Army, AirForce, Officer).
 */
// tslint:disable-next-line: interface-name
export interface IEntry {
  id: string;

  /**
   * Path from the root of the public url from which the entry logo can be
   * found.
   *
   * Example: /images/entry/airforce.svg
   */
  logoUrlByWidth: {
    "48": string;
    "64": string;
    "128": string;
    "256": string;
  };

  /**
   * Entry title.
   *
   * Example: Officer
   */
  title: LocalizedString;

  /**
   * Entry subtitle.
   *
   * Additional information like education requirements or entry explanation.
   */
  subtitle?: LocalizedString;
}
