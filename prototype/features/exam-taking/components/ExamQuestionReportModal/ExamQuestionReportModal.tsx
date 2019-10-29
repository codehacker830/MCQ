import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import { Formik } from "formik";
import React, { Component } from "react";
import { Button } from "../../../../components/Button";

export type ExamQuestionReportModalProps = {};

type State = {
  open: boolean;
};

enum IssueType {
  incorrectQuestion = "incorrectQuestion",
  incorrectAnswer = "incorrectAnswer",
  incorrectSolution = "incorrectSolution",
  incompleteSolution = "incompleteSolution",
}

const initialValues = {
  issueType: undefined as IssueType | undefined,
  furtherExplanation: "",
};

type Values = typeof initialValues;

export class ExamQuestionReportModal extends Component<
  ExamQuestionReportModalProps,
  State
> {
  state = { open: false };

  render() {
    return (
      <Formik<Values>
        initialValues={initialValues}
        onSubmit={this.handleSubmit}
      >
        {formik => (
          <Dialog fullWidth open={this.state.open} onClose={this.handleClose}>
            <DialogTitle>Report Question</DialogTitle>
            <DialogContent>
              <RadioGroup
                name="issueType"
                value={formik.values.issueType}
                onChange={formik.handleChange}
              >
                {[
                  [IssueType.incorrectQuestion, "Incorrect Question"],
                  [IssueType.incorrectAnswer, "Incorrect Answer"],
                  [IssueType.incorrectSolution, "Incorrect Solution"],
                  [IssueType.incompleteSolution, "Incomplete Solution"],
                ].map(([issueType, label]) => (
                  <FormControlLabel
                    key={issueType}
                    value={issueType}
                    control={<Radio color="primary" />}
                    label={label}
                  />
                ))}
              </RadioGroup>

              <TextField
                margin="dense"
                name="furtherExplanation"
                label="Further Explanation"
                fullWidth
                value={formik.values.furtherExplanation}
                onChange={formik.handleChange}
              />
            </DialogContent>

            <DialogActions>
              <Button onClick={this.handleClose}>Cancel</Button>
              <Button
                onClick={this.handleClose}
                variant="contained"
                color="red"
              >
                Report
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Formik>
    );
  }

  /**
   * Open modal and request user's input.
   */
  openModal = () => {
    this.setState({ open: true });
  };

  private handleClose = () => {
    this.setState({ open: false });
  };

  private handleSubmit = (values: Values) => {
    alert(JSON.stringify(values, null, 2));
  };
}
