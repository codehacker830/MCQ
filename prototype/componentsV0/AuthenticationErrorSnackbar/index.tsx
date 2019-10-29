import Snackbar from "@material-ui/core/Snackbar";
import React, { Component, ReactElement } from "react";

export interface AuthenticationErrorSnackbarProps {
  /**
   * Error message to display to user.
   */
  error: string | null;

  /**
   * Called when the user requests to close the snackbar.
   */
  onClose: () => void;
}

/**
 * Displays an error message at the top of the screen on authentication errors.
 */
export class AuthenticationErrorSnackbar extends Component<
  AuthenticationErrorSnackbarProps
> {
  render() {
    const { error, onClose } = this.props;
    const isOpen = Boolean(error);
    const messageNode = ((error || "") as any) as ReactElement<any>;

    return (
      <Snackbar
        open={isOpen}
        message={messageNode}
        onClose={onClose}
        autoHideDuration={5000}
        anchorOrigin={{ horizontal: "center", vertical: "top" }}
      />
    );
  }
}
