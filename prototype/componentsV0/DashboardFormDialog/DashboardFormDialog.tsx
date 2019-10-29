import { Formik, FormikConfig } from "formik";
import React, { cloneElement, Component, ReactElement } from "react";
import styled from "styled-components";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";
import { WithWidth } from "@material-ui/core/withWidth";

import { DashboardFormDialogFieldConfig } from "./DashboardFormDialogFieldConfig";
import { DashboardFormDialogFormInput } from "./DashboardFormDialogFormInput";

export type DashboardFormDialogFieldConfigs<Values extends object> = {
  [key in keyof Values]: DashboardFormDialogFieldConfig;
};

export interface DashboardFormDialogProps<Values extends object>
  extends Partial<WithWidth>,
    FormikConfig<Values> {
  /**
   * Child element that accepts an "onClick" handler.
   */
  children?: ReactElement<{ onClick: () => any }>;

  /**
   * Field settings.
   */
  fieldConfigs: DashboardFormDialogFieldConfigs<Values>;

  /**
   * Injected by the Material UI utility "withMobileDialog". It controls whether
   * or not the dialog is displayed full screen or not. This is used to provide
   * a full screen input form on mobile.
   */
  fullScreen?: boolean;

  /**
   * Form dialog title.
   */
  title: string;
}

interface DashboardFormDialogState {
  open: boolean;
}

class DashboardFormDialogBase<Values extends object> extends Component<
  DashboardFormDialogProps<Values>,
  DashboardFormDialogState
> {
  state: DashboardFormDialogState = {
    open: false,
  };

  render() {
    const {
      children,
      fieldConfigs,
      fullScreen,
      onSubmit,
      title,
      ...rest
    } = this.props;
    const { open } = this.state;

    const buttonWithOnClickHandler = children
      ? cloneElement(children as any, {
          onClick: this.handleClickOpen,
        })
      : children;

    return (
      <>
        {buttonWithOnClickHandler}

        <Formik<Values>
          {...rest}
          onSubmit={this.handleSubmit}
          render={api => (
            <DialogSized fullScreen={fullScreen} open={open}>
              <FormFullContainerSize onSubmit={api.handleSubmit}>
                <DialogTitle>{title}</DialogTitle>

                <DialogContent>
                  {(Object.keys(api.values) as (Extract<
                    keyof Values,
                    string
                  >)[]).map((key, index) => (
                    <DashboardFormDialogFormInput
                      key={key}
                      api={api}
                      fieldKey={key}
                      fieldConfig={fieldConfigs[key]}
                      autoFocus={index === 0}
                    />
                  ))}
                </DialogContent>

                <DialogActions>
                  <Button
                    disabled={api.isSubmitting}
                    onClick={() => this.handleCancel(api.resetForm)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={api.isSubmitting}>
                    Submit
                  </Button>
                </DialogActions>
              </FormFullContainerSize>
            </DialogSized>
          )}
        />
      </>
    );
  }

  private handleClickOpen = () => this.setState({ open: true });

  private handleSubmit: FormikConfig<Values>["onSubmit"] = async (
    values,
    formikActions,
  ) => {
    try {
      // TODO: Not sure why this was originally awaited. Maybe there's an error
      // in the type definition or there was a change between versions.
      // tslint:disable-next-line: await-promise
      await this.props.onSubmit(values, formikActions);

      formikActions.setSubmitting(false);
      formikActions.resetForm();
      this.setState({ open: false });
    } catch (e) {
      /* tslint:disable-next-line:no-console */
      console.log("Submission error:", e);
    }
  };

  private handleCancel = (resetForm: () => any) => {
    this.setState({ open: false });
    resetForm();
  };
}

const DialogSized = styled(Dialog).attrs({ classes: { paper: "paper" } })`
  .paper {
    width: 100%;
  }
`;

const FormFullContainerSize = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

// Wrap the base class in the responsiveness utility from Material UI and make
// use of the typing information for the values.
export const DashboardFormDialog = <Values extends object>(
  props: DashboardFormDialogProps<Values>,
) => {
  const Composed = withMobileDialog<DashboardFormDialogProps<Values>>()(
    // TODO: Fix this typing issue.
    DashboardFormDialogBase as any,
  );

  return <Composed {...props} />;
};
