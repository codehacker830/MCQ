import { Formik } from "formik";
import React, { Component, ReactNode, SFC } from "react";
import styled from "styled-components";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import Add from "@material-ui/icons/Add";
import RemoveCircleOutline from "@material-ui/icons/RemoveCircleOutline";

import { DashboardSecondaryToolbar } from "../../componentsV0/DashboardSecondaryToolbar";
import { FormikCheckbox } from "../../componentsV0/FormikCheckbox";
import { FormikTextField } from "../../componentsV0/FormikTextField";
import { FormikTextFieldTypeAhead } from "../../componentsV0/FormikTextFieldTypeAhead";
import { ResponsiveToolbarTypographyButton } from "../../componentsV0/ResponsiveToolbarTypographyButton";
import { TestPreviewDialog } from "../../componentsV0/TestPreviewDialog";
import { createPlaceholderTestPreviewFieldsProp } from "../../componentsV0/TestPreviewDialog/createPlaceholderTestPreviewFieldsProp";
import { Typography } from "../../componentsV0/Typography";
import { TypographyButton } from "../../componentsV0/TypographyButton";

import { AdminDashboardTemplateContainer } from "../../containers/AdminDashboardTemplateContainer";

// tslint:disable-next-line:no-empty-interface
export interface AdminTestManagerNewTemplateProps {}

export class AdminTestManagerNewTemplate extends Component<
  AdminTestManagerNewTemplateProps
> {
  render() {
    const testPreviewDialogFields = createPlaceholderTestPreviewFieldsProp();

    const initialValues = {
      entry: "AirForce",
      category: "Soldier GD",

      paperName: "",
      validity: "",

      questionsTotal: 100,
      durationMinutes: 30,

      marksTotal: 100,
      marksRequiredToPass: "" as number | string,

      marksCorrectAnswer: 3,
      marksDeductedWrongAnswer: "" as number | string,

      partsCount: 1,
      partsAllRequiredOneSitting: false,

      parts: [
        {
          name: "General Knowledge Section",
          subjects: [
            {
              name: "General Knowledge",
            },
          ],
        },
      ],
    };

    return (
      <Formik<typeof initialValues>
        initialValues={initialValues}
        onSubmit={() => alert("Form submission")}
      >
        {api => {
          return (
            <AdminDashboardTemplateContainer>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <DashboardSecondaryToolbar>
                    <DashboardSecondaryToolbar.Content>
                      <Typography variant="cardTitle">
                        Create a new Test Type
                      </Typography>
                    </DashboardSecondaryToolbar.Content>
                    <DashboardSecondaryToolbar.Spacer />
                    <TypographyButton color="red" variant="text">
                      Cancel
                    </TypographyButton>
                    <TestPreviewDialog fields={testPreviewDialogFields}>
                      <TypographyButton color="blue" variant="text">
                        Preview Test
                      </TypographyButton>
                    </TestPreviewDialog>
                    <TypographyButton color="primary" variant="text">
                      Save
                    </TypographyButton>
                  </DashboardSecondaryToolbar>
                </Grid>

                <Grid item xs={12}>
                  <Card>
                    <CardHeader
                      title={
                        <Typography variant="cardTitle">
                          Basic Information
                        </Typography>
                      }
                    />
                    <CardContent>
                      <TwoColumnRow
                        left={
                          <FormikTextFieldTypeAhead
                            formikApi={api}
                            name="entry"
                            label="Select entry"
                            placeholder="Select Entry here..."
                            suggestions={["AirForce", "Army", "Navy"]}
                          />
                        }
                        right={
                          <FormikTextFieldTypeAhead
                            formikApi={api}
                            name="category"
                            label="Select category"
                            placeholder="Select category"
                            suggestions={["Soldier GD", "Soldier Tradesman"]}
                          />
                        }
                      />

                      <TwoColumnRow
                        left={
                          <FormikTextField
                            formikApi={api}
                            name="paperName"
                            label="Paper Name"
                            placeholder="Enter paper name here..."
                          />
                        }
                        right={
                          <FormikTextField
                            formikApi={api}
                            name="validity"
                            label="Validity"
                            placeholder="Enter paper validity here..."
                          />
                        }
                      />
                    </CardContent>

                    <CardHeader
                      title={
                        <Typography variant="cardTitle">
                          Marks Distribution
                        </Typography>
                      }
                    />
                    <CardContent>
                      <TwoColumnRow
                        left={
                          <FormikTextField
                            formikApi={api}
                            name="questionsTotal"
                            type="number"
                            label="Total Questions"
                            placeholder="Enter total number of questions here..."
                          />
                        }
                        right={
                          <FormikTextField
                            formikApi={api}
                            name="durationMinutes"
                            type="number"
                            label="Time (minutes)"
                            placeholder="Enter duration here..."
                          />
                        }
                      />
                      <TwoColumnRow
                        left={
                          <FormikTextField
                            formikApi={api}
                            name="marksTotal"
                            type="number"
                            label="Total Marks"
                          />
                        }
                        right={
                          <FormikTextField
                            formikApi={api}
                            name="marksRequiredToPass"
                            type="number"
                            label="Passing marks"
                            placeholder="Enter marks here"
                          />
                        }
                      />
                      <TwoColumnRow
                        left={
                          <FormikTextField
                            formikApi={api}
                            name="marksCorrectAnswer"
                            type="number"
                            label="Marks for each correct answer"
                          />
                        }
                        right={
                          <FormikTextField
                            formikApi={api}
                            name="marksDeductedWrongAnswer"
                            type="number"
                            label="Marks deducted for each wrong answer"
                            placeholder="Enter marks here"
                          />
                        }
                      />
                      <TwoColumnRow
                        left={
                          <FormikTextField
                            formikApi={api}
                            name="partsCount"
                            type="number"
                            label="Number of Parts in this test"
                            placeholder="Number of parts here..."
                          />
                        }
                        right={
                          <FormikCheckbox
                            formikApi={api}
                            name="partsAllRequiredOneSitting"
                            label="Candidate to attempt all Parts in one go"
                          />
                        }
                      />

                      <Card style={{ marginTop: 24 }}>
                        <CardHeader
                          title={
                            <Typography variant="buttonBold">
                              Validation text here...
                            </Typography>
                          }
                        />
                      </Card>
                    </CardContent>
                  </Card>
                </Grid>

                {/* Sections in Paper toolbar */}
                <Grid item xs={12}>
                  <DashboardSecondaryToolbar>
                    <DashboardSecondaryToolbar.Content>
                      <Typography variant="cardTitle">
                        Sections in paper
                      </Typography>
                    </DashboardSecondaryToolbar.Content>
                    <DashboardSecondaryToolbar.Spacer />
                    <ResponsiveToolbarTypographyButton
                      color="primary"
                      iconNode={<Add />}
                      tooltipTitle="Add Section"
                    >
                      Section
                    </ResponsiveToolbarTypographyButton>
                  </DashboardSecondaryToolbar>
                </Grid>

                {/* Section in Paper */}
                <Grid item xs={12}>
                  <Card>
                    {/* Section Name */}
                    <CardHeader
                      subheader={
                        <FormikTextField
                          formikApi={api}
                          name={"parts.0.name" as any}
                          label="Section Name"
                          placeholder="Enter section name here..."
                          fullWidth={true}
                        />
                      }
                      action={
                        <CardHeaderActionButtonSpacing>
                          <ResponsiveToolbarTypographyButton
                            color="primary"
                            iconNode={<Add />}
                            tooltipTitle="Add Subject"
                          >
                            Subject
                          </ResponsiveToolbarTypographyButton>
                        </CardHeaderActionButtonSpacing>
                      }
                    />

                    {/* Subject Name / Configuration */}
                    <CardContent>
                      {/* Subject Name, Number of Questions */}
                      <RemovableTwoColumnRow
                        left={
                          <FormikTextFieldTypeAhead
                            formikApi={api}
                            name={"parts.0.subjects.0.name" as any}
                            label="Import from Excel or Table"
                            suggestions={[
                              "table://tests/army_soldier_gd/1/sections/1",
                              "file://tests/army_soldier_gd/1/sections/3.xlsx",
                            ]}
                            placeholder="Start with table:// or file://"
                          />
                        }
                        right={
                          <FormikTextField
                            formikApi={api}
                            name={"parts.0.subjects.0.questionCount" as any}
                            type="number"
                            label="Number of questions"
                          />
                        }
                      />

                      {/* Total Marks, Easy Level Questions */}
                      <RemovableTwoColumnRow
                        marginOnly
                        left={
                          <FormikTextField
                            formikApi={api}
                            name={"parts.0.subjects.0.marksTotal" as any}
                            type="number"
                            label="Total Marks"
                          />
                        }
                        right={
                          <FormikTextField
                            formikApi={api}
                            name={
                              "parts.0.subjects.0.questionsDifficultyEasyPercentage" as any
                            }
                            label="Easy Level Questions %"
                          />
                        }
                      />

                      {/* Medium Level Questions, Hard Level Questions */}
                      <RemovableTwoColumnRow
                        marginOnly
                        left={
                          <FormikTextField
                            formikApi={api}
                            name={
                              "parts.0.subjects.0.questionsDifficultyMediumPercentage" as any
                            }
                            label="Medium Level Questions %"
                          />
                        }
                        right={
                          <FormikTextField
                            formikApi={api}
                            name={
                              "parts.0.subjects.0.questionsDifficultyHardPercentage" as any
                            }
                            label="Hard Level Questions %"
                          />
                        }
                      />

                      {/* Subject Name / Configuration Validation Message */}
                      <Card style={{ marginTop: 24 }}>
                        <CardHeader
                          title={
                            <Typography variant="buttonBold">
                              Validation text here...
                            </Typography>
                          }
                        />
                      </Card>
                    </CardContent>

                    {/* Topics in Subjects*/}
                    <CardHeader
                      title={
                        <Typography variant="cardTitle">
                          Topics in Subjects
                        </Typography>
                      }
                    />

                    {/* Subject 1's Name */}
                    <CardHeader
                      subheader={
                        <FormikTextField
                          formikApi={api}
                          name={"parts.0.name" as any}
                          label="Subject Name"
                          placeholder="Geography"
                        />
                      }
                      action={
                        <CardHeaderActionButtonSpacing>
                          <ResponsiveToolbarTypographyButton
                            color="primary"
                            iconNode={<Add />}
                            tooltipTitle="Add Topic"
                          >
                            Topic
                          </ResponsiveToolbarTypographyButton>
                        </CardHeaderActionButtonSpacing>
                      }
                    />

                    {/* Subject 1's Topics */}
                    <CardContent>
                      <RemovableTwoColumnRow
                        left={
                          <FormikTextField
                            formikApi={api}
                            name={"parts.0.subjects.0.marksTotal" as any}
                            label="Topic"
                            placeholder="Regional Geography"
                          />
                        }
                        right={
                          <FormikTextField
                            formikApi={api}
                            name={
                              "parts.0.subjects.0.questionsDifficultyEasyPercentage" as any
                            }
                            type="number"
                            label="Total Questions"
                          />
                        }
                      />

                      <RemovableTwoColumnRow
                        left={
                          <FormikTextField
                            formikApi={api}
                            name={"parts.0.subjects.0.marksTotal" as any}
                            label="Topic"
                            placeholder="Foreign Lands"
                          />
                        }
                        right={
                          <FormikTextField
                            formikApi={api}
                            name={
                              "parts.0.subjects.0.questionsDifficultyEasyPercentage" as any
                            }
                            type="number"
                            label="Total Questions"
                          />
                        }
                      />

                      <Card style={{ marginTop: 24 }}>
                        <CardHeader
                          title={
                            <Typography variant="buttonBold">
                              Validation text here...
                            </Typography>
                          }
                        />
                      </Card>
                    </CardContent>

                    {/* Subject 2's Name */}
                    <CardHeader
                      subheader={
                        <FormikTextField
                          formikApi={api}
                          name={"parts.0.name" as any}
                          label="Subject Name"
                          placeholder="History"
                        />
                      }
                      action={
                        <CardHeaderActionButtonSpacing>
                          <ResponsiveToolbarTypographyButton
                            color="primary"
                            iconNode={<Add />}
                            tooltipTitle="Add Topic"
                          >
                            Topic
                          </ResponsiveToolbarTypographyButton>
                        </CardHeaderActionButtonSpacing>
                      }
                    />

                    {/* Subject 2's Topics */}
                    <CardContent>
                      <RemovableTwoColumnRow
                        left={
                          <FormikTextField
                            formikApi={api}
                            name={"parts.0.subjects.0.marksTotal" as any}
                            label="Topic"
                            placeholder="Regional Geography"
                          />
                        }
                        right={
                          <FormikTextField
                            formikApi={api}
                            name={
                              "parts.0.subjects.0.questionsDifficultyEasyPercentage" as any
                            }
                            type="number"
                            label="Total Questions"
                          />
                        }
                      />

                      <RemovableTwoColumnRow
                        left={
                          <FormikTextField
                            formikApi={api}
                            name={"parts.0.subjects.0.marksTotal" as any}
                            label="Topic"
                            placeholder="Foreign Lands"
                          />
                        }
                        right={
                          <FormikTextField
                            formikApi={api}
                            name={
                              "parts.0.subjects.0.questionsDifficultyEasyPercentage" as any
                            }
                            type="number"
                            label="Total Questions"
                          />
                        }
                      />

                      <Card style={{ marginTop: 24 }}>
                        <CardHeader
                          title={
                            <Typography variant="buttonBold">
                              Validation text here...
                            </Typography>
                          }
                        />
                      </Card>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </AdminDashboardTemplateContainer>
          );
        }}
      </Formik>
    );
  }
}

interface TwoColumnRowProps {
  left: ReactNode;
  right?: ReactNode;
}

const TwoColumnRow: SFC<TwoColumnRowProps> = props => {
  const { left, right } = props;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        {left}
      </Grid>
      <Grid item xs={12} sm={6}>
        {right}
      </Grid>
    </Grid>
  );
};

const CardHeaderActionButtonSpacing = styled.div`
  display: flex;
  align-items: flex-end;
  height: 48px;
  margin-top: 16px;
  margin-right: 16px;
`;

const RemovableTwoColumnRow: SFC<
  TwoColumnRowProps & { marginOnly?: boolean }
> = ({ marginOnly, ...rest }) => (
  <RemovableTwoColumnRowWrapper>
    <TwoColumnRow {...rest} />
    <ResponsiveToolbarTypographyButton
      color="red"
      iconNode={<RemoveCircleOutline />}
      tooltipTitle="Remove"
      dense
      style={{
        visibility: marginOnly ? "hidden" : "visible",
      }}
    >
      Remove
    </ResponsiveToolbarTypographyButton>
  </RemovableTwoColumnRowWrapper>
);

const RemovableTwoColumnRowWrapper = styled.div`
  display: flex;
  width: 100%;

  &::first-child {
    flex: 1;
  }
`;
