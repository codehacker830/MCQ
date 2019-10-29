import styled from "styled-components";

export enum Variant {
  H1 = "H1",
  H2 = "H2",
  H3 = "H3",
  H4 = "H4",
  H5 = "H5",
  H6 = "H6",
  Subtitle1 = "Subtitle1",
  Subtitle2 = "Subtitle2",
  Body1 = "Body1",
  Body2 = "Body2",
  Button = "Button",
  Caption = "Caption",
  Overline = "Overline",
}

export enum Face {
  Montserrat = "'Montserrat', sans-serif",
  Roboto = "'Roboto', sans-serif",
}

export enum Font {
  Light = "300",
  Regular = "400",
  Medium = "500",
}

export type Size = number;

export type Casing = "sentence" | "all caps";

export type LetterSpacing = number;

export type BaseStyle = [Face, Font, Size, Casing, LetterSpacing];

export type Style = ReturnType<typeof styled.span>;
