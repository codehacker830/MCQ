import React from "react";
import styled from "styled-components";

import { LanguageButton } from "./LanguageButton";

export type LanguageToggleButtonProps = {
  className?: string;
  popup?: boolean;
  localizationLanguage: "en" | "hi";
  onLocalizationLanguageChange: (language: "en" | "hi") => any;
};

export const LanguageToggleButton = styled(
  ({
    className,
    localizationLanguage,
    onLocalizationLanguageChange,
  }: LanguageToggleButtonProps) => (
    <div className={className}>
      <LanguageButton
        selected={localizationLanguage === "hi"}
        onClick={() => onLocalizationLanguageChange("hi")}
      >
        हिंदी
      </LanguageButton>

      <LanguageButton
        selected={localizationLanguage === "en"}
        onClick={() => onLocalizationLanguageChange("en")}
      >
        English
      </LanguageButton>
    </div>
  ),
)`
  display: flex;

  ${({ popup }) =>
    popup
      ? `
          flex-direction: column;
          padding: 4px;
          background-color: #fff;

          & > *:not(:last-child) {
            margin-bottom: 4px;
          }
        `
      : `
          & > *:not(:last-child) {
            margin-right: 4px;
          }
        `};
`;
