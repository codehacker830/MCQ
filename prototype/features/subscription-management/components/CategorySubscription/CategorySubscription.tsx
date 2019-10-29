import React, { ReactNode, SFC } from "react";
import styled from "styled-components";
import { LocalizedString } from "../../../../types";
import { LocalizationStateConsumer } from "../../../localization";

import Typography from "@material-ui/core/Typography";
import { TypographyButton } from "../../../../componentsV0/TypographyButton";

import {
  CategoryQuantitySelectorItem,
  CategoryQuantitySelectorItemProps,
} from "../CategoryQuantitySelectorItem";

export type CategorySubscriptionProps = CategoryQuantitySelectorItemProps & {
  categoryLabel: LocalizedString;

  /**
   * Called when the renew button is clicked. If it is not provided, the renew
   * button is not displayed.
   */
  onRenewButtonClick?: () => void;
};

export const CategorySubscription: SFC<CategorySubscriptionProps> = props => {
  const {
    categoryQuantitySelectionSettings,
    selectedQuantityIndex,
    onRenewButtonClick,
  } = props;

  // TODO: Filter this upstream from this component. In progress support of
  // de-selecting quantities during onboarding.
  if (selectedQuantityIndex === null) {
    throw new Error(
      "Unfiltered subscription was passed. It has a quantity index of null",
    );
  }

  const quantityLabel =
    categoryQuantitySelectionSettings.quantitiesLabels[selectedQuantityIndex];

  return (
    <LocalizationStateConsumer>
      {({ localizationLanguage }) => (
        <CategoryQuantitySelectorItem {...props}>
          <TextGroupWrapper>
            <Typography>
              {quantityLabel[localizationLanguage] || quantityLabel.en}
            </Typography>

            <div />

            <TypographyRed>Expiring on 3 Jul 2018</TypographyRed>

            <RenewButton onClick={onRenewButtonClick}>Renew</RenewButton>
          </TextGroupWrapper>
        </CategoryQuantitySelectorItem>
      )}
    </LocalizationStateConsumer>
  );
};

const TextGroupWrapper = styled.div`
  display: flex;
  flex-grow: 1;

  > *:nth-child(2) {
    flex: 1;
  }

  > *:last-child {
    width: 100px;
  }

  ${({ theme }) => theme.breakpoints.down("xs")} {
    flex-wrap: wrap;

    > *:not(button) {
      width: 100% !important;
    }
  }
`;

const TypographyRed = styled(Typography)`
  color: ${({ theme }) => theme.palette.error.main};
`;

const RenewButton = styled(
  ({
    className,
    children,
    onClick,
  }: {
    children?: ReactNode;
    className?: string;
    onClick?: () => void;
  }) => (
    <TypographyButton
      className={className}
      variant="contained"
      color="primary"
      filled
      size="small"
      style={{ visibility: onClick ? undefined : "hidden" }}
      onClick={onClick}
    >
      {children}
    </TypographyButton>
  ),
)`
  width: initial;
  min-width: initial;
  padding: 4px 20px;

  margin-top: 8px;

  ${({ theme }) => theme.breakpoints.up("sm")} {
    margin-top: 0;
    margin-left: 16px;
  }

  ${({ theme }) => theme.breakpoints.down("xs")} {
    margin-left: auto;
    margin-top: 24px;
    margin-right: 8px;
  }
`;
