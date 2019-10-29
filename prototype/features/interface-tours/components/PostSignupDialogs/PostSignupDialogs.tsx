import React, { Component } from "react";
import { connect } from "react-redux";
import styled, { createGlobalStyle } from "styled-components";
import { State } from "../../../../store";
import { actions } from "../../actions";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import withMobileDialog, {
  InjectedProps as WithMobileDialogProps,
} from "@material-ui/core/withMobileDialog";
import { LogoImage } from "../../../../componentsV0/LogoImage";
import { Typography } from "../../../../componentsV0/Typography";
import { TypographyButton } from "../../../../componentsV0/TypographyButton";

type OwnProps = {};
export type PostSignupDialogsProps = OwnProps;

type DispatchProps = {
  onSubmit: () => any;
};

type PostSignupDialogsState = {
  dialogGetAlertsShown: boolean;
  dialogAddToHomeScreenShown: boolean;
};

type Props = OwnProps & DispatchProps & WithMobileDialogProps;

class PostSignupDialogs extends Component<Props, PostSignupDialogsState> {
  state: PostSignupDialogsState = {
    dialogGetAlertsShown: false,
    dialogAddToHomeScreenShown: false,
  };

  render() {
    const { fullScreen } = this.props;
    const { dialogGetAlertsShown, dialogAddToHomeScreenShown } = this.state;

    const showDialogGetAlerts =
      !dialogGetAlertsShown && !dialogAddToHomeScreenShown;
    const showDialogAddToHomeScreen =
      dialogGetAlertsShown && !dialogAddToHomeScreenShown;

    const dialogs = [
      {
        open: showDialogGetAlerts,
        onAccept: () => this.handleGetAlertsDialogClose("accept"),
        onDecline: () => this.handleGetAlertsDialogClose("decline"),
        title: "Get Alerts",
        text:
          "Get latest updates on free mock tests. You can manage alerts from your browser settings if do not want subsequently.",
        buttonDeclineText: "No Thanks",
        buttonAcceptText: "Allow",
      },
      {
        open: showDialogAddToHomeScreen,
        onAccept: () => this.handleAddToHomeScreenClose("accept"),
        onDecline: () => this.handleAddToHomeScreenClose("decline"),
        title: "Add to Home Screen",
        text: "Add shortcut to your home screen for quick access",
        buttonDeclineText: "No Thanks",
        buttonAcceptText: "Add",
      },
    ];

    return (
      <>
        <PostSignupDialogsGlobalStyleOverride />

        {dialogs.map(d => (
          <Dialog
            key={d.title}
            open={d.open}
            onClose={d.onDecline}
            maxWidth="md"
            fullScreen={fullScreen}
          >
            <DialogContent
              classes={{
                root: "post-signup-dialogs--dialog-content--root",
              }}
            >
              <Wrapper>
                <Logo />
                <TextContentWrapper>
                  <DialogTitleText>{d.title}</DialogTitleText>

                  <DialogTextContent>{d.text}</DialogTextContent>

                  <DialogButtonsWrapper>
                    <TypographyButton variant="outlined" onClick={d.onDecline}>
                      {d.buttonDeclineText}
                    </TypographyButton>
                    <TypographyButton variant="outlined" onClick={d.onAccept}>
                      {d.buttonAcceptText}
                    </TypographyButton>
                  </DialogButtonsWrapper>
                </TextContentWrapper>
                <LogoSpacer />
              </Wrapper>
            </DialogContent>
          </Dialog>
        ))}
      </>
    );
  }

  private handleGetAlertsDialogClose = (_response: "accept" | "decline") => {
    this.setState({ dialogGetAlertsShown: true });
  };

  private handleAddToHomeScreenClose = (_response: "accept" | "decline") => {
    this.setState({ dialogAddToHomeScreenShown: true });
    this.props.onSubmit();
  };
}

const PostSignupDialogsWithMobileDialog = withMobileDialog<Props>()(
  PostSignupDialogs,
);
export { PostSignupDialogsWithMobileDialog as PostSignupDialogs };

export const PostSignupDialogsContainer = connect<
  {},
  DispatchProps,
  OwnProps,
  State
>(
  () => ({}),
  { onSubmit: actions.dismissPostSignupDialogs },
)(PostSignupDialogsWithMobileDialog);

const logoSize = 150;
const fontFamily = "font-family: 'Roboto', sans-serif;";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ${({ theme }) => theme.breakpoints.up("md")} {
    flex-direction: row;
  }
`;

const Logo = styled(({ className }: { className?: string }) => (
  <div className={className}>
    <LogoImage />
  </div>
))`
  margin-left: 32px;

  ${LogoImage} {
    width: ${logoSize}px;
    height: ${logoSize}px;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    display: flex;
    justify-content: center;
    position: relative;
    margin-left: 0;
    margin-bottom: 16px;

    ${LogoImage} {
      position: absolute;
      width: ${logoSize * 0.8}px;
      height: ${logoSize * 0.8}px;
      bottom: 16px;
    }
  }

  ${({ theme }) => theme.breakpoints.down("sm")} and (orientation: landscape) {
    ${LogoImage} {
      display: none;
    }
  }
`;

const LogoSpacer = styled.div`
  flex-shrink: 0;
  width: ${logoSize}px;
  height: ${logoSize}px;
  margin-right: 32px;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    display: none;
  }
`;

const TextContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.breakpoints.up("md")} {
    padding: 32px;
  }
`;

const DialogTitleText = styled(
  ({ children, className }: { children: string; className?: string }) => (
    <Typography className={className} muiTypographyProps={{ variant: "h4" }}>
      {children}
    </Typography>
  ),
)`
  ${fontFamily};

  margin-bottom: 32px;
  font-size: 40px;
  text-align: center;
  color: #000;
`;

const DialogTextContent = styled(
  ({ children, className }: { children: string; className?: string }) => (
    <Typography className={className}>{children}</Typography>
  ),
)`
  ${fontFamily};

  text-align: center;
  font-size: 22px;
  color: #000;
`;

const DialogButtonsWrapper = styled.div`
  margin-top: 32px;
  text-align: center;

  & > *:first-child {
    margin-right: 8px;
  }
`;

const PostSignupDialogsGlobalStyleOverride = createGlobalStyle`
  .post-signup-dialogs--dialog-content--root {
    display: flex;
    align-items: center;
  }
`;
