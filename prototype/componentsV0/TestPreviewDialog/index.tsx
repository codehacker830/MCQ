import React, {
  cloneElement,
  Component,
  Fragment,
  ReactElement,
  ReactNode,
} from "react";
import styled from "styled-components";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import withMobileDialog, {
  InjectedProps,
} from "@material-ui/core/withMobileDialog";
import { WithWidth } from "@material-ui/core/withWidth";

import { Typography } from "../Typography";
import { TypographyButton } from "../TypographyButton";

export interface TestPreviewFieldsSectionSubjectTopic {
  topicName: string;
  topicTotalQuestions: string;
}

export interface TestPreviewFieldsSectionSubject {
  subjectName: string;

  subjectTopics: TestPreviewFieldsSectionSubjectTopic[];
}

export interface TestPreviewFieldsSection {
  sectionName: string;
  sectionTotalMarks: string;
  sectionPassingMarks: string;
  sectionDifficultyPercentageEasy: string;
  sectionDifficultyPercentageMedium: string;
  sectionDifficultyPercentageHard: string;

  sectionSubjects: TestPreviewFieldsSectionSubject[];
}

export interface TestPreviewFields {
  testName: string;
  testTotalMarks: string;
  testPassingMarks: string;
  testMarksCorrectAnswer: string;
  testMarksIncorrectAnswer: string;
  testDuration: string;

  testSections: TestPreviewFieldsSection[];
}

export interface TestPreviewDialogProps {
  /**
   * React element to attach an onClick handler. When the provided element is
   * clicked, the test preview dialog will be displayed.
   */
  children?: ReactElement<{ onClick: () => any }>;

  /**
   * Fields to display in test preview.
   */
  fields: TestPreviewFields;
}

interface TestPreviewDialogState {
  open: boolean;
}

/**
 * For use in the Admin Dashboard. Displays a preview of an existing test or one
 * being developed.
 */
class TestPreviewDialog extends Component<
  TestPreviewDialogProps & InjectedProps & Partial<WithWidth>,
  TestPreviewDialogState
> {
  state: TestPreviewDialogState = {
    open: false,
  };

  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });

  render() {
    const { children, fields, fullScreen } = this.props;
    const { open } = this.state;

    const childWithOnClickEvent = children
      ? cloneElement(children as any, {
          onClick: this.handleOpen,
        })
      : null;

    return (
      <>
        {childWithOnClickEvent}

        <Dialog
          fullScreen={fullScreen}
          fullWidth
          maxWidth="md"
          open={open}
          onClose={this.handleClose}
        >
          <DialogTitle>
            <Typography variant="cardTitle">Test Preview</Typography>
          </DialogTitle>
          <DialogContent>
            {singleField(fields, "Test Name", "testName")}
            {singleField(fields, "Total Marks", "testTotalMarks")}
            {threeColumnFieldRow(
              fields,
              ["Passing marks", "+ marks", "- marks"],
              [
                "testPassingMarks",
                "testMarksCorrectAnswer",
                "testMarksIncorrectAnswer",
              ],
            )}
            {singleField(fields, "Duration", "testDuration")}

            {fields.testSections.map((section, sectionIndex) => (
              <Fragment key={section.sectionName}>
                <DividerWithBottomMargin />

                {singleField(
                  section,
                  `Section ${sectionIndex + 1}`,
                  "sectionName",
                )}
                {singleField(section, "Total Marks", "sectionTotalMarks")}
                {singleField(section, "Passing Marks", "sectionPassingMarks")}
                {threeColumnFieldRow(
                  section,
                  ["Easy", "Medium", "Hard"],
                  [
                    "sectionDifficultyPercentageEasy",
                    "sectionDifficultyPercentageMedium",
                    "sectionDifficultyPercentageHard",
                  ],
                )}

                {section.sectionSubjects.map(subject => (
                  <Fragment key={subject.subjectName}>
                    {singleField(subject, "Subject", "subjectName")}

                    {subject.subjectTopics.map(topic => (
                      <Fragment
                        key={`${subject.subjectName}-${topic.topicName}`}
                      >
                        {threeColumnFieldRow(
                          topic,
                          ["Topic", "Topic"],
                          ["topicName", "topicTotalQuestions"],
                        )}
                      </Fragment>
                    ))}
                  </Fragment>
                ))}
              </Fragment>
            ))}
          </DialogContent>

          <DialogActions>
            <TypographyButton onClick={this.handleClose}>
              Done with Preview
            </TypographyButton>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

const TestPreviewDialogWithResponsive = withMobileDialog<
  TestPreviewDialogProps
>()(TestPreviewDialog);

export { TestPreviewDialogWithResponsive as TestPreviewDialog };

function singleField<T extends object>(
  fields: T,
  title: string,
  fieldName: keyof T,
): ReactNode {
  return (
    <FieldRow>
      <FieldLabelValuePairContainer>
        <FieldLabel>{title}:</FieldLabel>
        <FieldValue>{(fields as any)[fieldName]}</FieldValue>
      </FieldLabelValuePairContainer>
    </FieldRow>
  );
}

function threeColumnFieldRow<T extends object>(
  fields: T,
  titles: string[],
  fieldNames: (Extract<keyof T, string>)[],
): ReactNode {
  const labelValuePairs = titles.map((title, index) => (
    <FieldLabelValuePairContainer key={fieldNames[index]}>
      <FieldLabel>{title}:</FieldLabel>
      <FieldValue>{(fields as any)[fieldNames[index]]}</FieldValue>
    </FieldLabelValuePairContainer>
  ));
  if (labelValuePairs.length === 2) {
    labelValuePairs.unshift(<FieldLabelValuePairContainer key="spacer" />);
  }

  return <FieldRow>{labelValuePairs}</FieldRow>;
}

const FieldRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`;

const FieldLabelValuePairContainer = styled.div`
  display: flex;
  min-width: 33%;
`;

const FieldLabel = styled(Typography)`
  font-weight: 500;
`;

const FieldValue = styled(Typography)`
  margin-left: ${({ theme }) => theme.spacing(1)}px;
`;

const DividerWithBottomMargin = styled(Divider)`
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`;
