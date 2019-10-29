import React, { Component, Fragment } from "react";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { IEntry } from "../../models";
import { LocalizationStateConsumer, strings } from "../localization";
import { FormState, Page, PropsWithFormState } from "./types";

import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";

import { Card } from "../../components/Card";
import { CardHeader } from "../../components/CardHeader";
import { RupeeFontSpan } from "../../components/RupeeFontSpan";
import { Typography } from "../../componentsV0/Typography";
import { TypographyButton } from "../../componentsV0/TypographyButton";
import { BottomToolbarDock, routePathFromLocalizationKey } from "../navigation";
import { BottomToolbar } from "./components/BottomToolbar";
import { CategoryQuantitySelector } from "./components/CategoryQuantitySelector";
import { CategorySubscription } from "./components/CategorySubscription";
import { EntrySelect } from "./components/EntrySelect";
import { QuantitySelectionCardHeader } from "./components/QuantitySelectionCardHeader";
import { SelectedEntries } from "./components/SelectedEntries";
import { HackCategorySubscriptionRenewalVisibilityToggle } from "./HackCategorySubscriptionRenewalVisibilityToggle";

export class SubscriptionManagementPage extends Component<PropsWithFormState> {
  componentDidMount() {
    const { loaded, loadPlaceholderData } = this.props;

    if (!loaded) loadPlaceholderData();
  }

  render() {
    const { loaded } = this.props;

    if (!loaded) return null;

    return (
      <BottomToolbarDock
        toolbarNode={this.renderToolbarNode()}
        matchedRoutes={[
          this.getEntryPageRoute(),
          this.getSubscriptionPageRoute(),
        ]}
      >
        {this.renderRedirects()}
        {this.renderPageContents()}
      </BottomToolbarDock>
    );
  }

  private getEntryPageRoute = () => {
    const { isOnboarding } = this.props;

    return routePathFromLocalizationKey(
      isOnboarding
        ? "routes_Dashboard_OnboardingEntriesPage"
        : "routes_Dashboard_MembershipEntriesPage",
    );
  };

  private getSubscriptionPageRoute = () => {
    const { isOnboarding } = this.props;

    return routePathFromLocalizationKey(
      isOnboarding
        ? "routes_Dashboard_OnboardingSubscriptionPage"
        : "routes_Dashboard_MembershipSubscriptionPage",
    );
  };

  private getCurrentPage = (): Page => {
    const { location } = this.props;

    return location.pathname === this.getEntryPageRoute()
      ? "entry-select"
      : "category-select";
  };

  private getMinimumEntriesRequired = () => {
    const { isOnboarding } = this.props;
    return isOnboarding ? 1 : 0;
  };

  private getSelectedQuantityIndex = (categoryID: string): number | null => {
    const { values } = this.props;
    const { selectedQuantities } = values;

    const item = selectedQuantities.find(q => q.categoryID === categoryID);

    return item ? item.quantityIndex : null;
  };

  private setSelectedQuantityIndex = (
    categoryID: string,
    quantityIndex: number | null,
  ) => {
    const { values, setFieldValue } = this.props;
    let selectedQuantities = values.selectedQuantities.slice();

    const item: (typeof selectedQuantities)[0] = selectedQuantities.find(
      q => q.categoryID === categoryID,
    ) || { categoryID, quantityIndex };
    item.quantityIndex = quantityIndex;

    selectedQuantities = selectedQuantities
      .filter(q => q.categoryID !== categoryID)
      .concat(item);

    setFieldValue("selectedQuantities", selectedQuantities);
  };

  private getTotal = (): number => {
    const { values, categoryQuantitySelectionSettings } = this.props;
    const { selectedQuantities } = values;
    const {
      quantities,
      quantitiesFreeIndexes,
      examPriceRs,
    } = categoryQuantitySelectionSettings!;

    const total = selectedQuantities.reduce((accumulator, quantity): number => {
      const quantityIndex = quantity.quantityIndex;

      // If no quantities are selected, just return the current total.
      if (quantityIndex === null) return accumulator;

      const free = quantitiesFreeIndexes.includes(quantityIndex);
      if (free) return accumulator;

      return accumulator + examPriceRs * quantities[quantityIndex];
    }, 0);

    return total;
  };

  private renderRedirects = () => {
    const {
      isOnboarding,
      location: { pathname },
      values: { selectedEntryIDs },
    } = this.props;

    // This is needed so that the swipe layout on mobile will navigate properly.
    if (
      !isOnboarding &&
      pathname ===
        routePathFromLocalizationKey(
          "routes_Dashboard_OnboardingSubscriptionPage",
        )
    ) {
      return (
        <Redirect
          to={routePathFromLocalizationKey(
            "routes_ProgressOverview_ProgressOverviewPage",
          )}
        />
      );
    }

    // User shouldn't be able to pay for 0 subscriptions during onboarding.
    if (
      isOnboarding &&
      pathname !== this.getEntryPageRoute() &&
      selectedEntryIDs.length === 0
    ) {
      return <Redirect to={this.getEntryPageRoute()} />;
    }

    return null;
  };

  private renderPageContents = () => {
    const {
      entries: intermediateEntries,
      values,
      isOnboarding,
      subscriptions,
      categories,
    } = this.props;
    const { selectedEntryIDs } = values;

    const minEntriesRequired = this.getMinimumEntriesRequired();
    const currentPage = this.getCurrentPage();

    // Filter entries by those which still have available categories to
    // subscribe to.
    // FIXME: Very bad performance here. The needs to be memoized.
    const entries = intermediateEntries.filter(entry => {
      const entryCategories = categories.filter(
        category => category.entryID === entry.id,
      );

      const entrySubscriptions = (subscriptions || []).filter(
        subscription =>
          entryCategories.find(
            entryCategory => entryCategory.id === subscription.categoryID,
          ) !== undefined,
      );

      return entryCategories.length !== entrySubscriptions.length;
    });

    return (
      <Grid container spacing={2}>
        {currentPage === "entry-select" ? (
          <Grid item xs={12}>
            <EntrySelect
              entries={entries}
              initialSelectedEntries={selectedEntryIDs}
              minSelectedCount={minEntriesRequired}
              maxSelectedCount={entries.length}
              onSelectionChange={this.handleEntrySelectionChange}
            />
          </Grid>
        ) : (
          <>
            {entries.length > 0 && (
              <Grid item xs={12}>
                <Card>
                  <CardHeader
                    title={
                      isOnboarding
                        ? "Your Selected Entries"
                        : "Subscribe New Categories"
                    }
                  />
                  <CardContent>
                    <SelectedEntries
                      entries={entries}
                      minEntriesCount={minEntriesRequired}
                      maxEntriesCount={entries.length}
                      selectedEntryIDs={selectedEntryIDs}
                      onEntryRemoveButtonClick={
                        this.handleEntryRemoveButtonClick
                      }
                      onAddMoreButtonClick={this.handleAddMoreButtonClick}
                    />
                  </CardContent>
                </Card>
              </Grid>
            )}

            {this.renderQuantitySelectionCards()}

            {this.renderCurrentSubscriptions()}
          </>
        )}
      </Grid>
    );
  };

  private renderCurrentSubscriptions = () => {
    const {
      subscriptions,
      categories,
      categoryQuantitySelectionSettings,
    } = this.props;

    if (!subscriptions) return null;

    const getCategoryLabel = (subscription: typeof subscriptions[0]) =>
      categories.find(c => c.id === subscription.categoryID)!.title;

    return (
      <Grid item xs={12}>
        <Card>
          <CardHeader title="Present Subscription" />

          <CardContent>
            {subscriptions.map((s, index) => (
              <Fragment key={`${s.subscriptionID}-${s.categoryID}`}>
                <HackCategorySubscriptionRenewalVisibilityToggle>
                  {({ revealed, toggleReveal }) => (
                    <>
                      <CategorySubscription
                        categoryLabel={getCategoryLabel(s)}
                        categoryQuantitySelectionSettings={
                          categoryQuantitySelectionSettings!
                        }
                        selectedQuantityIndex={s.quantityIndex}
                        onRenewButtonClick={toggleReveal}
                      />
                      {revealed && (
                        <CategoryQuantitySelector
                          categoryLabel={null}
                          categoryQuantitySelectionSettings={
                            categoryQuantitySelectionSettings!
                          }
                          selectedQuantityIndex={0}
                          onChange={() => {
                            alert("Update subscription totals");
                          }}
                        />
                      )}
                    </>
                  )}
                </HackCategorySubscriptionRenewalVisibilityToggle>
                {index < subscriptions.length - 1 && (
                  <Divider style={{ marginBottom: 16 }} />
                )}
              </Fragment>
            ))}
          </CardContent>
        </Card>
      </Grid>
    );
  };

  private renderQuantitySelectionCards = () => {
    const { entries, categoryQuantitySelectionSettings, values } = this.props;
    const { selectedEntryIDs } = values;

    const selectedEntries = entries.filter(e =>
      selectedEntryIDs.includes(e.id),
    );

    return (
      <LocalizationStateConsumer>
        {({ localizationLanguage }) =>
          selectedEntries.map(e => (
            <Grid key={e.id} item xs={12}>
              <Card>
                <QuantitySelectionCardHeader
                  // Entry title.
                  title={e.title[localizationLanguage] || e.title.en}
                  pricePerExamRs={
                    categoryQuantitySelectionSettings!.examPriceRs
                  }
                  // Entry logo image.
                  imageUrl={e.logoUrlByWidth["48"]}
                />

                {this.renderQuantitySelectionCardContents(e)}
              </Card>
            </Grid>
          ))
        }
      </LocalizationStateConsumer>
    );
  };

  private renderQuantitySelectionCardContents = (entry: IEntry) => {
    const { categoryQuantitySelectionSettings, subscriptions } = this.props;

    const categories = this.props.categories
      .filter(c => c.entryID === entry.id)
      // Filter out any categories which are already subscribed to.
      .filter(c => !(subscriptions || []).find(s => s.categoryID === c.id));

    return (
      <CardContent>
        {categories.map((c, index) => (
          <Fragment key={c.id}>
            <CategoryQuantitySelector
              categoryLabel={c.title}
              education={
                c.education || { en: "(Placeholder education requirements)" }
              }
              categoryQuantitySelectionSettings={
                categoryQuantitySelectionSettings!
              }
              selectedQuantityIndex={this.getSelectedQuantityIndex(c.id)}
              onChange={quantityIndex => {
                this.setSelectedQuantityIndex(c.id, quantityIndex);
              }}
            />
            {index < categories.length - 1 && (
              <Hidden mdUp>
                <StyledDivider />
              </Hidden>
            )}
          </Fragment>
        ))}
      </CardContent>
    );
  };

  private renderToolbarNode = () => {
    const { values, submitForm } = this.props;
    const page = this.getCurrentPage();

    const isNextButtonDisabled =
      values.selectedEntryIDs.length < this.getMinimumEntriesRequired();

    const isPayButtonDisabled =
      values.selectedQuantities.find(
        quantity => quantity.quantityIndex !== null,
      ) === undefined;

    const total = this.getTotal();

    return (
      <BottomToolbar>
        {page === "entry-select" ? (
          <>
            <FlexSpacer />
            <TypographyButton
              color="primary"
              filled
              disabled={isNextButtonDisabled}
              onClick={this.handleNextButtonClick}
            >
              {strings.common_NextButtonText}
            </TypographyButton>
          </>
        ) : (
          <>
            <Hidden xsDown>
              <Typography variant="cardTitle">Subscribe Exam Pack</Typography>
            </Hidden>

            <RightToolbarGroup>
              <Typography variant="cardTitle" style={{ fontWeight: 600 }}>
                Total&nbsp;
                <RupeeFontSpan>R</RupeeFontSpan>
                &nbsp; {total}
              </Typography>

              <TypographyButton
                color="yellow"
                filled
                onClick={submitForm}
                disabled={isPayButtonDisabled}
              >
                {strings.dashboard_OnboardingSubscriptionPage_PayButtonText}
              </TypographyButton>
            </RightToolbarGroup>
          </>
        )}
      </BottomToolbar>
    );
  };

  private handleEntrySelectionChange = (selectedEntryIDs: string[]) => {
    const { categories, values, setFieldValue } = this.props;
    const currentSelectedQuantities = values.selectedQuantities.slice();

    const selectedCategories = categories.filter(c =>
      selectedEntryIDs.includes(c.entryID),
    );

    const selectedQuantities: FormState["selectedQuantities"] = Array.from(
      { length: selectedCategories.length },
      (_, index): FormState["selectedQuantities"][0] => {
        return (
          currentSelectedQuantities.find(
            q => q.categoryID === selectedCategories[index].id,
          ) || { categoryID: selectedCategories[index].id, quantityIndex: null }
        );
      },
    );

    setFieldValue("selectedQuantities", selectedQuantities);
    setFieldValue("selectedEntryIDs", selectedEntryIDs);
  };

  private handleEntryRemoveButtonClick = (entryID: string) => {
    const { values } = this.props;

    const selectedEntryIDs = values.selectedEntryIDs.filter(e => e !== entryID);

    this.handleEntrySelectionChange(selectedEntryIDs);
  };

  private handleNextButtonClick = () => {
    const { history } = this.props;

    history.push(this.getSubscriptionPageRoute());
  };

  private handleAddMoreButtonClick = () => {
    const { history } = this.props;

    history.push(this.getEntryPageRoute());
  };
}

const FlexSpacer = styled.div`
  flex: 1;
`;

const StyledDivider = styled(Divider)`
  margin: ${({ theme }) => theme.spacing(2)}px;
`;

const RightToolbarGroup = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: flex-end;

  > *:first-child {
    margin-right: ${({ theme }) => theme.spacing(4)}px;
  }
`;
