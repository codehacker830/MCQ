import React, { Component, ComponentPropsWithoutRef, ReactNode } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { State } from "../../../../store";
import { LocalizationStateConsumer } from "../../../localization";
import { actions } from "../../actions";

import { lighten } from "@material-ui/core/styles/colorManipulator";
import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";

import { BlockImage } from "../../../../componentsV0/BlockImage";
import { Typography } from "../../../../componentsV0/Typography";

import { createIndexCardEntryPlaceholders } from "../../placeholders/createIndexCardEntryPlaceholders";

type StateProps = Pick<
  State["landing"],
  "indexCardEntries" | "indexCardEntryCategories" | "indexCardColors"
>;

type DispatchProps = {
  fetchIndexCardEntries: () => any;
};

type OwnProps = {};
export type IndexCardsProps = OwnProps;

type Props = StateProps & DispatchProps & OwnProps;

class IndexCards extends Component<Props> {
  componentDidMount() {
    const {
      indexCardEntries,
      indexCardEntryCategories,
      indexCardColors,
      fetchIndexCardEntries,
    } = this.props;
    if (!indexCardEntries || !indexCardEntryCategories || !indexCardColors) {
      fetchIndexCardEntries();
    }
  }

  render() {
    const {
      indexCardEntries,
      indexCardEntryCategories,
      indexCardColors,
    } = this.props;
    if (!indexCardEntries || !indexCardEntryCategories || !indexCardColors) {
      return null;
    }

    return (
      <Wrapper>
        {indexCardEntries.map((entry, index) => (
          <CardBackgroundColorWrapper
            key={entry.id}
            backgroundColor={indexCardColors[index].blockColor}
          >
            <CardWrapper backgroundColor={indexCardColors[index].blockColor}>
              <EntryLogo
                src={entry.logoUrlByWidth["128"]}
                backgroundColor={indexCardColors[index].logoBackgroundColor}
              />

              <LocalizationStateConsumer>
                {({ localizationLanguage }) => (
                  <TextSectionWrapper>
                    <TitleWrapper>
                      <Typography variant="cardTitle">
                        {entry.title[localizationLanguage] || entry.title.en}
                      </Typography>
                      <Typography>mock test for:</Typography>
                    </TitleWrapper>

                    <CategoryPillWrapper>
                      {indexCardEntryCategories
                        .filter(c => c.entryID === entry.id)
                        .map(c => (
                          <CategoryPill
                            key={c.id}
                            backgroundColor={
                              indexCardColors[index].categoryBackgroundColor
                            }
                            textColor={
                              indexCardColors[index].categoryTitleColor
                            }
                            title={c.title[localizationLanguage] || c.title.en}
                          />
                        ))}
                    </CategoryPillWrapper>
                  </TextSectionWrapper>
                )}
              </LocalizationStateConsumer>
            </CardWrapper>
          </CardBackgroundColorWrapper>
        ))}
      </Wrapper>
    );
  }
}

const indexCardEntryPlaceholders = createIndexCardEntryPlaceholders();

const IndexCardsContainer = connect<StateProps, DispatchProps, OwnProps, State>(
  ({
    landing: { indexCardEntryCategories, indexCardEntries, indexCardColors },
  }) => ({
    indexCardEntries,
    indexCardEntryCategories,
    indexCardColors,
  }),
  {
    fetchIndexCardEntries: () =>
      actions.fetchIndexCardEntriesSuccess(
        indexCardEntryPlaceholders.indexCardEntries,
        indexCardEntryPlaceholders.indexCardEntryCategories,
        indexCardEntryPlaceholders.indexCardColors,
      ),
  },
)(IndexCards);
export { IndexCardsContainer as IndexCards };

const logoSizePixels = 128;
const blockWidthPixels = logoSizePixels + logoSizePixels / 2;
const verticalMargin = 50;
const mobileBreakpoint: Breakpoint = "sm";

const Wrapper = styled.div`
  & > * {
  }
`;
/* margin: ${({ theme }) => theme.spacing.unit}px 0; */

const getLightBg = (color: string) => lighten(color, 0.4);

const CardBackgroundColorWrapper = styled(
  ({
    backgroundColor,
    ...rest
  }: ComponentPropsWithoutRef<"div"> & {
    backgroundColor: string;
  }) => <div {...rest} />,
)`
  padding: ${props => props.theme.spacing(2)}px;
  background-color: ${props => getLightBg(props.backgroundColor)};

  > * {
    max-width: 1280px;
    margin: 0 auto;
  }
`;

const CardWrapper = styled(
  (props: {
    children?: ReactNode;
    className?: string;
    backgroundColor: string;
  }) => <div className={props.className}>{props.children}</div>,
)`
  display: flex;
  padding-left: ${logoSizePixels}px;

  ${({ backgroundColor, theme }) => `
    background-image: linear-gradient(
      to right,
      ${backgroundColor},
      ${backgroundColor} ${blockWidthPixels}px,
      ${getLightBg(backgroundColor)} ${blockWidthPixels}px,
      ${getLightBg(backgroundColor)}
    );

    ${theme.breakpoints.down(mobileBreakpoint)} {
      flex-direction: column;
      align-items: center;
      padding-left: 0;
      padding-top: ${verticalMargin}px;
      background-image: linear-gradient(
        to bottom,
        ${backgroundColor},
        ${backgroundColor} ${verticalMargin + logoSizePixels / 2}px,
        ${getLightBg(backgroundColor)} ${verticalMargin + logoSizePixels / 2}px,
        ${getLightBg(backgroundColor)}
      );
    }
  `};
`;

const EntryLogo = styled(
  ({
    className,
    src,
  }: {
    className?: string;
    src: string;
    backgroundColor: string;
  }) => <BlockImage className={className} src={src} />,
)`
  width: ${logoSizePixels}px;
  height: ${logoSizePixels}px;
  margin: ${verticalMargin}px 0;
  background-color: ${({ backgroundColor }) => `${backgroundColor}`};

  ${({ theme }) => theme.breakpoints.down(mobileBreakpoint)} {
    margin: 0;
  }
`;

const TextSectionWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing(3)}px 0;
  margin-left: ${({ theme }) => theme.spacing(2)}px;

  ${({ theme }) => theme.breakpoints.down(mobileBreakpoint)} {
    margin-left: 0;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: baseline;
  margin-left: 8px;
  margin-bottom: 16px;

  > :first-child {
    margin-right: 8px;
  }

  ${({ theme }) => theme.breakpoints.down(mobileBreakpoint)} {
    flex-direction: column;
    align-items: center;
    margin-left: 0;

    > :first-child {
      margin-right: 0;
    }
  }
`;

const CategoryPillWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const CategoryPill = styled(
  ({
    className,
    title,
  }: {
    className?: string;
    backgroundColor: string;
    textColor: string;
    title: string;
  }) => (
    <div className={className}>
      <Typography>{title}</Typography>
    </div>
  ),
)`
  width: calc(100% / 3 - 16px);
  padding: 8px;
  margin: 8px;
  border-radius: 8px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  text-align: center;

  ${({ theme }) => theme.breakpoints.down(mobileBreakpoint)} {
    width: calc(100% / 2 - 16px);
  }
`;
