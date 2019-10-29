import React, { Component } from "react";
import { connect } from "react-redux";
import { State } from "../../../../store";
import { LightTheme } from "../../../../theme";
import { actions as localizationActions } from "../../actions";

import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@material-ui/core/Popover";
import Language from "@material-ui/icons/Language";

import { LanguageToggleButton } from "./LanguageToggleButton";

type StateProps = {
  localizationLanguage: "en" | "hi";
};

type DispatchProps = {
  onLocalizationLanguageChange: (language: "en" | "hi") => any;
};

type OwnProps = {};
export type LanguageToggleButtonProps = OwnProps;

type LanguageToggleButtonContainerProps = StateProps & DispatchProps & OwnProps;

type LanguageToggleButtonContainerState = {
  anchorElement: HTMLElement | null;
};

class LanguageToggleButtonContainer extends Component<
  LanguageToggleButtonContainerProps,
  LanguageToggleButtonContainerState
> {
  state: LanguageToggleButtonContainerState = {
    anchorElement: null,
  };

  componentDidUpdate(prevProps: LanguageToggleButtonContainerProps) {
    if (prevProps.localizationLanguage !== this.props.localizationLanguage) {
      this.handleClose();
    }
  }

  render() {
    return (
      <>
        <Hidden xsDown>
          <LanguageToggleButton {...this.props} />
        </Hidden>

        <Hidden smUp>
          <IconButton onClick={this.handleLanguageButtonClick}>
            <Language />
          </IconButton>

          <Popover
            open={Boolean(this.state.anchorElement)}
            anchorEl={this.state.anchorElement || undefined}
            onClose={this.handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <LightTheme>
              <LanguageToggleButton {...this.props} popup />
            </LightTheme>
          </Popover>
        </Hidden>
      </>
    );
  }

  handleLanguageButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    this.setState({
      anchorElement: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({ anchorElement: null });
  };
}

const LanguageToggleButtonContainerWithStore = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  State
>(
  ({ localization }) => ({
    localizationLanguage: localization.localizationLanguage,
  }),
  { onLocalizationLanguageChange: localizationActions.setLocalizationLanguage },
)(LanguageToggleButtonContainer);
export { LanguageToggleButtonContainerWithStore as LanguageToggleButton };
