import React, { SFC } from "react";
import styled from "styled-components";
import { LocalizationStateConsumer, strings } from "../../../localization";

import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Hidden from "@material-ui/core/Hidden";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Typography from "@material-ui/core/Typography";

export type LanguageSelectProps = {};

/**
 * Provides language selection to visitors of the landing page.
 */
export const LanguageSelect: SFC<LanguageSelectProps> = () => {
  return (
    <Wrapper>
      <SideWrapper>
        <FormLabel component="legend">
          <Hidden smUp>
            <Heading>{strings.landing_LanguageSelect_ShortText}</Heading>
          </Hidden>
          <Hidden xsDown>
            <Heading>{strings.landing_LanguageSelect_Text}</Heading>
          </Hidden>
        </FormLabel>
      </SideWrapper>

      <SideWrapper>
        <LocalizationStateConsumer>
          {({ localizationLanguage, setLocalizationLanguage }) => (
            <RadioGroup
              aria-label={strings.landing_LanguageSelect_Text}
              row
              value={localizationLanguage}
              onChange={e => setLocalizationLanguage((e.target as any).value)}
            >
              <StyledFormControlLabel
                value="en"
                control={<StyledRadio />}
                label={strings.landing_LanguageSelect_English}
              />

              <StyledFormControlLabel
                value="hi"
                control={<StyledRadio />}
                label={strings.landing_LanguageSelect_Hindi}
              />
            </RadioGroup>
          )}
        </LocalizationStateConsumer>
      </SideWrapper>
    </Wrapper>
  );
};

const Wrapper = styled((({ children, className }) => (
  <FormControl className={className} component="div">
    {children}
  </FormControl>
)) as SFC<{ className?: string }>)`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
`;

const SideWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Heading = styled(Typography).attrs({ variant: "subtitle1" })`
  margin-right: ${props => props.theme.spacing(2)}px;
  white-space: nowrap;
  color: ${({ theme }) => theme.palette.primary.main};
`;

const StyledFormControlLabel = styled(FormControlLabel).attrs({
  classes: { label: "language-select-form-control-label" },
})`
  .language-select-form-control-label {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;

const StyledRadio = styled(Radio)`
  color: ${({ theme }) => theme.palette.primary.main};
`;
