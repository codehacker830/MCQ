import AppBar from "@material-ui/core/AppBar";
import DialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import ArrowBack from "@material-ui/icons/ArrowBack";
import Close from "@material-ui/icons/Close";
import React, { ReactNode, SFC } from "react";
import styled from "styled-components";
import { Typography } from "../Typography";

export type DialogAppBarProps = {
  title: string;

  /**
   * Icon to use for the close button.
   *
   * @default close
   */
  closeIcon?: "back" | "close";

  /** Called when the close button is clicked. */
  onCloseButtonClick: () => void;
};

export const DialogAppBar: SFC<DialogAppBarProps> = props => {
  const { title, closeIcon = "close", onCloseButtonClick } = props;
  const CloseIconComponent = closeIcon === "close" ? Close : ArrowBack;

  return (
    <StyledDialogTitle>
      <AppBar color="inherit" position="static">
        <Toolbar>
          <CloseButton onClick={onCloseButtonClick}>
            <CloseIconComponent />
          </CloseButton>

          <Typography variant="Subtitle2">{title}</Typography>
        </Toolbar>
      </AppBar>
    </StyledDialogTitle>
  );
};

const StyledDialogTitle = styled(
  ({ children, className }: { children?: ReactNode; className?: string }) => (
    <DialogTitle className={className} disableTypography>
      {children}
    </DialogTitle>
  ),
)`
  padding: 0;
  z-index: ${({ theme }) => theme.zIndex.appBar};
`;

const CloseButton = styled(
  (props: {
    children?: ReactNode;
    className?: string;
    onClick: () => void;
  }) => (
    <IconButton
      className={props.className}
      color="inherit"
      onClick={props.onClick}
    >
      {props.children}
    </IconButton>
  ),
)`
  margin-left: -12px;
  margin-right: 20px;
`;
