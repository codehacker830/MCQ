import React, { SFC } from "react";
import styled, { css } from "styled-components";
import { fromMobileFlatBorder } from "../../../../css";
import { IEntry } from "../../../../models";

import Typography from "@material-ui/core/Typography";

import { BlockImage } from "../../../../componentsV0/BlockImage";
import { Button, ButtonProps } from "../../../../componentsV0/Button";
import { CheckmarkableCircle } from "../../../../componentsV0/CheckmarkableCircle";

export type EntrySelectItemProps = {
  /**
   * An available Entry to subscribe to.
   */
  entry: IEntry;

  /**
   * Whether item is selected.
   */
  selected: boolean;

  /**
   * Called when item is clicked.
   */
  onClick: () => void;
};

/**
 * Entry (military branch) selection item.
 */
export const EntrySelectItem: SFC<EntrySelectItemProps> = props => {
  const { entry, selected, onClick } = props;

  return (
    <StyledButton selected={selected} onClick={onClick}>
      <StyledBlockImage src={entry.logoUrlByWidth["48"]} />

      <TextWrapper>
        {/* TODO: Use localization utility to select current language. */}
        <Label>{entry.title.en}</Label>

        {entry.subtitle && (
          <AdditionalDescriptionText>
            {/* TODO: Use localization utility to select current language. */}
            {entry.subtitle.en}
          </AdditionalDescriptionText>
        )}
      </TextWrapper>

      <CheckmarkableCircle color="secondary" checked={selected} />
    </StyledButton>
  );
};

const StyledButton = styled(
  ({ selected, ...rest }: ButtonProps & { selected: boolean }) => (
    <Button
      {...rest}
      classes={{
        label: "entry-select-item-button-label",
      }}
    />
  ),
)`
  ${fromMobileFlatBorder()};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 64px;
  padding: ${props => props.theme.spacing(1)}px !important;
  padding-right: ${props => props.theme.spacing(2)}px !important;
  background-color: #fff !important;
  text-transform: none;

  .entry-select-item-button-label {
    width: 100%;
  }

  &:hover {
    background-color: #f9f9f9;
  }

  &:active {
    box-shadow: ${({ theme }) => theme.shadows[4]};
  }

  ${props =>
    props.selected
      ? `
          border: 1px solid ${props.theme.palette.secondary.main} !important;
        `
      : ""}
`;

const StyledBlockImage = styled(BlockImage)`
  width: 48px;
  height: 48px;
  margin-right: ${({ theme }) => theme.spacing(1)}px;
`;

const textWrapperSizeAdjustment =
    48 /* entry logo width */ +
    8 /* entry logo right margin */ +
    24 /* selection circle width */;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - ${textWrapperSizeAdjustment}px);
`;

const truncate = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Label = styled(Typography).attrs({
  variant: "body1",
})`
  flex: 1;
  font-size: 16px;
  text-align: left;
  ${truncate};
`;

const AdditionalDescriptionText = styled(Label)`
  font-weight: 500;
  font-size: 14px;
  color: #4db7f1;
  ${truncate};
`;
