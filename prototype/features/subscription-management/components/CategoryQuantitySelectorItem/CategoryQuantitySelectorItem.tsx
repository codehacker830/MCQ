import React, { ReactNode, SFC } from "react";
import styled from "styled-components";
import { LocalizedString } from "../../../../types";
import { LocalizationStateConsumer } from "../../../localization";
import { ICategoryQuantitySelectionSettings } from "../../models/ICategoryQuantitySelectionSettings";

import Typography from "@material-ui/core/Typography";

export type CategoryQuantitySelectorItemProps = {
  /**
   * Settings that dictate the quantities of exams offered for each category.
   */
  categoryQuantitySelectionSettings: ICategoryQuantitySelectionSettings;

  /**
   * Name of the entry category.
   *
   * No label is rendered if passed null.
   */
  categoryLabel: LocalizedString | null;

  /**
   * Education label.
   */
  education?: LocalizedString;

  /**
   * Selected quantity or null for no selection.
   */
  selectedQuantityIndex: number | null;
};

export const CategoryQuantitySelectorItem: SFC<
  CategoryQuantitySelectorItemProps
> = props => {
  const { children, categoryLabel, education } = props;

  return (
    <Wrapper>
      <div>
        <LocalizationStateConsumer>
          {({ localizationLanguage }) => (
            <>
              {categoryLabel && (
                <Typography
                  variant="subtitle1"
                  component="span"
                  style={{ fontSize: 14, fontWeight: 500 }}
                >
                  {categoryLabel[localizationLanguage] || categoryLabel.en}
                </Typography>
              )}

              {education && (
                <EducationRequirements>
                  {education[localizationLanguage] || education.en}
                </EducationRequirements>
              )}
            </>
          )}
        </LocalizationStateConsumer>
      </div>

      {children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`;

const EducationRequirements = styled(
  ({ className, children }: { children?: ReactNode; className?: string }) => (
    <Typography className={className} variant="body1">
      {children}
    </Typography>
  ),
)`
  font-weight: 500;
  font-size: 14px;
  color: #4db7f1;
`;
