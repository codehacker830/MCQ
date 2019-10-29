import React, { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { entryImages } from "../../common/structures/entryImages";
import { State } from "../../store";
import { routePathFromLocalizationKey } from "../navigation";
import { actions } from "./actions";

import CardActions from "@material-ui/core/CardActions";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { CardContent } from "../../components/CardContent";
import { CardHeader } from "../../components/CardHeader";
import { Dialog } from "../../components/Dialog";
import { DialogAppBar } from "../../components/DialogAppBar";
import { DialogContent } from "../../components/DialogContent";
import { Typography } from "../../components/Typography";
import { freeExamCardBackgroundColor } from "../../css";

type StateProps = {
  loading: boolean;
  loaded: boolean;
};

type DispatchProps = {
  fetchExamReviewData: () => any;
};

type OwnProps = {};

type Props = StateProps & DispatchProps & OwnProps;

type ExamBoardPageState = {
  selectedSubscription: number | null;
  dialogOpen: boolean;
};

class ExamBoardPage extends Component<Props, ExamBoardPageState> {
  state: ExamBoardPageState = {
    selectedSubscription: null,
    dialogOpen: false,
  };

  componentDidMount() {
    const { /* loading, */ loaded, fetchExamReviewData } = this.props;

    // if (loading || loaded) return;
    if (loaded) return;

    fetchExamReviewData();
  }

  render() {
    const { loaded } = this.props;
    const { selectedSubscription, dialogOpen } = this.state;

    if (!loaded) return <div>Loading...</div>;

    // prettier-ignore
    const subscriptions: {
      placeholderImagesKey: keyof typeof entryImages;
      title: string;
      isFreeExam: boolean;
      isExpired: boolean;
    }[] = [
      { placeholderImagesKey: "Officer", title: "NDA/ ACC", isFreeExam: false, isExpired: false },
      { placeholderImagesKey: "Army", title: "Soldier Tradesman", isFreeExam: true, isExpired: false },
      { placeholderImagesKey: "AirForce", title: "Group 'X' & 'Y': Med Asst Trade", isFreeExam: false, isExpired: true },
    ];

    const subscriptionCards = subscriptions.map((subscription, index) => (
      <Card
        key={subscription.placeholderImagesKey}
        style={{
          width: "100%",
          backgroundColor: subscription.isFreeExam
            ? freeExamCardBackgroundColor
            : undefined,
        }}
      >
        <CardHeader
          imageUrl={entryImages[subscription.placeholderImagesKey]}
          title={subscription.title}
          subheader={
            subscription.isExpired ? "Expired" : "Validity 31st Jan 2019"
          }
          subheaderColor={subscription.isExpired ? "error" : undefined}
          overline={
            subscription.isFreeExam ? "1 Free Test" : "10 Mock Tests Set"
          }
        />
        <CardContent>
          <Grid container spacing={8}>
            {!subscription.isFreeExam && (
              <>
                <SubscriptionCardRow
                  leftNode={
                    <Typography variant="Subtitle2">Attempted</Typography>
                  }
                  rightNode={
                    <Button
                      // component={(props: any) => (
                      //   <Link
                      //     to={routePathFromLocalizationKey(
                      //       "routes_ExamReview_ExamReviewPage",
                      //     )}
                      //     {...props}
                      //   />
                      // )}
                      variant="contained"
                      size="small"
                      fullWidth
                      onClick={() => this.handleSubscriptionClick(index)}
                      // disabled={index > 1}
                    >
                      02 Tests (Revise)
                    </Button>
                  }
                />
                <SubscriptionCardRow
                  leftNode={
                    <Typography variant="Subtitle2">Remaining</Typography>
                  }
                  rightNode={
                    <Button
                      variant="contained"
                      size="small"
                      color="primary"
                      fullWidth
                      disabled={index === 1}
                      onClick={() => this.handleSubscriptionClick(index)}
                    >
                      08 Tests (Attempt)
                    </Button>
                  }
                />
              </>
            )}

            {subscription.isFreeExam && (
              <SubscriptionCardRow
                leftNode={null}
                rightNode={
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    fullWidth
                    disabled={index !== 1}
                    onClick={() => this.handleSubscriptionClick(index)}
                  >
                    Attempt
                  </Button>
                }
              />
            )}
          </Grid>
        </CardContent>
      </Card>
    ));

    const cardStats = {
      Attempts: "2345 Users",
      Score: "75/200",
      Rank: "733/ Out 2345",
    };

    const testCards =
      selectedSubscription === null
        ? null
        : Array.from({ length: 10 }, (_, index) => {
            const subscription = subscriptions[selectedSubscription];
            const title = `${subscription.title} Test ${index + 1}`;

            return (
              <Card key={`${subscription.placeholderImagesKey}-${index}`}>
                <CardHeader
                  title={title}
                  subheader="Validity 31st Jan 2019"
                  imageUrl={entryImages[subscription.placeholderImagesKey]}
                />
                <CardContent>
                  {Object.entries(cardStats).map(([key, value]) => (
                    <StatRow key={key}>
                      <Typography variant="Subtitle2">{key}</Typography>
                      <Typography variant="Subtitle2">{value}</Typography>
                    </StatRow>
                  ))}
                </CardContent>
                <CardActions>
                  <div style={{ flex: 1 }} />
                  {index === 0 && (
                    <>
                      <Button
                        variant="outlined"
                        color="blue"
                        style={{ marginRight: 8 }}
                        onClick={this.createDialogCloseHandlerWrapper(() =>
                          alert(`Reattempt: ${title}`),
                        )}
                      >
                        Reattempt Now
                      </Button>
                      <Button
                        variant="contained"
                        color="blue"
                        component={(props: any) => (
                          <Link
                            to={routePathFromLocalizationKey(
                              "routes_ExamReview_ExamReviewPage",
                            )}
                            {...props}
                          />
                        )}
                      >
                        View Answer Key
                      </Button>
                    </>
                  )}
                  {index === 1 && (
                    <Button
                      variant="outlined"
                      onClick={this.createDialogCloseHandlerWrapper(() =>
                        alert(`Attempt: ${title}`),
                      )}
                    >
                      Attempt Now
                    </Button>
                  )}
                  {index > 1 && (
                    <Button variant="outlined" disabled>
                      Expired
                    </Button>
                  )}
                </CardActions>
              </Card>
            );
          });

    return (
      <>
        <Grid container spacing={2}>
          <Grid item xs md={6}>
            <Grid container spacing={2}>
              {subscriptionCards.map((subscriptionCard, index) => (
                <Grid key={index} item xs={12}>
                  {subscriptionCard}
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Hidden smDown>
            <Grid item md={6}>
              <Grid container spacing={2}>
                {testCards &&
                  testCards.map((testCard, index) => (
                    <Grid key={index} item xs={12}>
                      {testCard}
                    </Grid>
                  ))}
              </Grid>
            </Grid>
          </Hidden>
        </Grid>

        {selectedSubscription !== null && (
          <Dialog variant="fullScreenMobileHidden" open={dialogOpen}>
            <DialogAppBar
              title={subscriptions[selectedSubscription].title}
              onCloseButtonClick={this.handleDialogClose}
            />

            <DialogContent>{testCards}</DialogContent>
          </Dialog>
        )}
      </>
    );
  }

  private handleSubscriptionClick = (subscriptionIndex: number) => {
    this.setState({
      selectedSubscription: subscriptionIndex,
      dialogOpen: true,
    });
  };

  private handleDialogClose = () => {
    this.setState({
      dialogOpen: false,
    });
  };

  private createDialogCloseHandlerWrapper = (fn: () => any) => {
    return () => {
      this.handleDialogClose();
      return fn();
    };
  };
}

const ExamBoardPageContainer = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  State
>(
  ({ examBoard: { loaded, loading } }: State) => ({ loaded, loading }),
  {
    fetchExamReviewData: actions.loadPlaceholderData,
  },
)(ExamBoardPage);
export { ExamBoardPageContainer as ExamBoardPage };

const SubscriptionCardRow = (props: {
  leftNode: ReactNode;
  rightNode: ReactNode;
}) => (
  <Grid item xs={12}>
    <Grid container alignItems="center">
      <Grid item xs={6}>
        {props.leftNode}
      </Grid>
      <Grid item xs={6}>
        <Grid container justify="flex-end">
          <Grid item style={{ minWidth: 184 }}>
            {props.rightNode}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);

const StatRow = styled.div`
  display: flex;

  > *:first-child {
    width: 50%;
  }

  > *:not(:last-child) {
    margin-bottom: ${({ theme }) => theme.spacing(1)}px;
  }
`;
