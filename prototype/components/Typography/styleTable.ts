import { BaseStyle, Face, Font, Variant } from "./types";

export const styleTable: Record<Variant, BaseStyle> = {
  [Variant.H1]: [Face.Montserrat, Font.Light, 96, "sentence", -1.5],
  [Variant.H2]: [Face.Montserrat, Font.Light, 60, "sentence", -0.5],
  [Variant.H3]: [Face.Montserrat, Font.Regular, 48, "sentence", 0],
  [Variant.H4]: [Face.Montserrat, Font.Regular, 34, "sentence", 0.25],
  [Variant.H5]: [Face.Montserrat, Font.Regular, 24, "sentence", 0],
  [Variant.H6]: [Face.Montserrat, Font.Medium, 20, "sentence", 0.15],
  [Variant.Subtitle1]: [Face.Montserrat, Font.Regular, 16, "sentence", 0.15],
  [Variant.Subtitle2]: [Face.Montserrat, Font.Medium, 14, "sentence", 0.1],
  [Variant.Body1]: [Face.Montserrat, Font.Regular, 16, "sentence", 0.5],
  [Variant.Body2]: [Face.Montserrat, Font.Regular, 14, "sentence", 0.25],
  [Variant.Button]: [Face.Montserrat, Font.Medium, 14, "all caps", 0.75],
  [Variant.Caption]: [Face.Montserrat, Font.Regular, 12, "sentence", 0.4],
  [Variant.Overline]: [Face.Montserrat, Font.Regular, 10, "all caps", 1.5],
};
