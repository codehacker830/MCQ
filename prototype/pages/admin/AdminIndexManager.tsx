import Card from "@material-ui/core/Card";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import TextField from "@material-ui/core/TextField";
import Add from "@material-ui/icons/Add";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import Remove from "@material-ui/icons/Remove";
import { Formik, FormikProps } from "formik";
import React, { SFC } from "react";
import {
  arrayMove,
  SortableContainer,
  SortableElement,
  SortableHandle,
} from "react-sortable-hoc";
import styled from "styled-components";
import { CardContent } from "../../components/CardContent";
import { CardHeader, CardHeaderProps } from "../../components/CardHeader";
import { DashboardCard } from "../../componentsV0/DashboardCard";
import { DashboardSecondaryToolbar } from "../../componentsV0/DashboardSecondaryToolbar";
import { FormikFileUploadField } from "../../componentsV0/FormikFileUploadField";
import { FormikTextField } from "../../componentsV0/FormikTextField";
import { Typography } from "../../componentsV0/Typography";
import { AdminDashboardTemplateContainer } from "../../containers/AdminDashboardTemplateContainer";

type IndexPageSettings = {
  logoImage: File | null;

  heroBackgroundImage: File | null;
  heroBackgroundImageAlpha: number;
  heroTextPrimaryEnglish: string;
  heroTextPrimaryHindi: string;
  heroFeaturesEnglish: string;
  heroFeaturesHindi: string;

  heroAboutTitleEnglish: string;
  heroAboutTitleHindi: string;
  heroAboutTextEnglish: string;
  heroAboutTextHindi: string;

  // TODO: Make this unique for each entry
  entryCardBackgroundImage: File | null;

  images: {
    image: File | null;
    titleEnglish: string;
    titleHindi: string;
    textEnglish: string;
    textHindi: string;
  }[];

  videos: {
    entryId: string;
    youTubeVideoUrl: string;
    titleEnglish: string;
    titleHindi: string;
  }[];
};

const initialValues: IndexPageSettings = {
  logoImage: null,

  heroBackgroundImage: null,
  heroBackgroundImageAlpha: 0.25,
  heroTextPrimaryEnglish: "What we are offering mock test",
  heroTextPrimaryHindi: "What we are offering mock test",
  heroFeaturesEnglish: `Mock test as asked in Armed Forces exams.
Full length Weekly Mock Test
Instant result with detail analysis
All India rank`,
  heroFeaturesHindi: `Mock test as asked in Armed Forces exams.
Full length Weekly Mock Test
Instant result with detail analysis
All India rank`,

  heroAboutTitleEnglish: "What is Join Uniform?",
  heroAboutTitleHindi: "What is Join Uniform?",
  heroAboutTextEnglish:
    "JoinUniform is created to help and prepare those aspirants(both Officer and Jawan entry) who are keen to serve India, in uniform(Army, Airforce, Navy, Assam Rifles, Coast Guard, TA, BSF, ITBP, CRPF, SSB, CISF & RPF.etc.). The platform is bilingual(Hindi & English),user can use it from anywhere, using mobile, laptop or TV. JoinUniform will benefit it's user in terms of quality content, proper attention, actual exam like tests, with explanation and performance analysis.",
  heroAboutTextHindi:
    "JoinUniform is created to help and prepare those aspirants(both Officer and Jawan entry) who are keen to serve India, in uniform(Army, Airforce, Navy, Assam Rifles, Coast Guard, TA, BSF, ITBP, CRPF, SSB, CISF & RPF.etc.). The platform is bilingual(Hindi & English),user can use it from anywhere, using mobile, laptop or TV. JoinUniform will benefit it's user in terms of quality content, proper attention, actual exam like tests, with explanation and performance analysis.",

  // TODO: Make this unique for each entry
  entryCardBackgroundImage: null,

  images: [
    {
      image: null,
      titleEnglish: "Jawan Entry Mock Tests",
      titleHindi: "Jawan Entry Mock Tests",
      textEnglish:
        "हम जवान, JCO और समकक्ष पद के लिए Army, Airforce, Navy, Assam Rifles, Coast Guard, TA, BSF, ITBP, CRPF, SSB, CISF & RPF में आवेदन करने वाले 8वीं, 10वीं और 12वीं उत्तीर्ण उम्मीदवारों के लिए online Mock(नकली) परीक्षण करवाते हैं।",
      textHindi:
        "हम जवान, JCO और समकक्ष पद के लिए Army, Airforce, Navy, Assam Rifles, Coast Guard, TA, BSF, ITBP, CRPF, SSB, CISF & RPF में आवेदन करने वाले 8वीं, 10वीं और 12वीं उत्तीर्ण उम्मीदवारों के लिए online Mock(नकली) परीक्षण करवाते हैं।",
    },
  ],

  videos: [],
};

initialValues.images = Array.from({ length: 2 }, (_, index) => ({
  ...initialValues.images[0],
  titleEnglish: `${initialValues.images[0].titleEnglish} (${index})`,
}));

initialValues.videos = Array.from({ length: 7 }, (_, index) => ({
  entryId: index < 3 ? "army" : index < 5 ? "airforce" : "navy",
  youTubeVideoUrl: "https://www.youtube.com/watch?v=Y2tfg2huqGg",
  titleEnglish: `Video ${index + 1} (English)`,
  titleHindi: `Video ${index + 1} (Hindi)`,
}));

export const AdminIndexManager: SFC = () => (
  <AdminDashboardTemplateContainer>
    <Formik<IndexPageSettings>
      initialValues={initialValues}
      onSubmit={values => alert(JSON.stringify(values, null, 2))}
      validate={values => {
        /* tslint:disable-next-line:no-console */
        console.log("values", values.images);
      }}
    >
      {formikApi => (
        <Grid container spacing={2}>
          {/* Logo Image */}
          <Grid item xs={12}>
            <DashboardSecondaryToolbar>
              <DashboardSecondaryToolbar.Content>
                <Typography variant="cardTitle">Logo</Typography>
              </DashboardSecondaryToolbar.Content>
              <DashboardSecondaryToolbar.Content
                style={{ flex: 1, paddingBottom: 12 }}
              >
                <FormikFileUploadField
                  formikApi={formikApi}
                  name="logoImage"
                  acceptedFileTypes="image/*"
                  placeholder="Browse"
                />
              </DashboardSecondaryToolbar.Content>
            </DashboardSecondaryToolbar>
          </Grid>

          {/* Hero */}
          <Grid item xs={12}>
            <Card>
              <AdminCardHeader title="Hero" />
              <CardContent>
                <SectionTitle>Hero Background</SectionTitle>
                <div style={{ marginTop: -16 }}>
                  <FormikFileUploadField
                    formikApi={formikApi}
                    name="heroBackgroundImage"
                    acceptedFileTypes="image/*"
                    placeholder="Browse"
                  />
                  <TextField
                    name="heroBackgroundImageAlpha"
                    type="number"
                    margin="normal"
                    fullWidth
                    label="Background Image Alpha (0.05 - 0.95)"
                    helperText="Controls the transparency of the background image."
                    inputProps={{ step: "0.05", min: "0.05", max: ".95" }}
                    value={formikApi.values.heroBackgroundImageAlpha}
                    onBlur={formikApi.handleBlur}
                    onChange={formikApi.handleChange}
                  />
                </div>
              </CardContent>

              <CardContent>
                <Typography
                  variant="tableHeadCell"
                  style={{ marginBottom: 16 }}
                >
                  Hero Text
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormikTextField
                      formikApi={formikApi}
                      name="heroTextPrimaryEnglish"
                      label="Hero Primary Text (English)"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormikTextField
                      formikApi={formikApi}
                      name="heroTextPrimaryHindi"
                      label="Hero Primary Text (Hindi)"
                    />
                  </Grid>
                </Grid>
              </CardContent>

              <CardContent>
                <SectionTitle>Hero Features</SectionTitle>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <TextField
                      name="heroFeaturesEnglish"
                      multiline
                      fullWidth
                      label="Hero Features (English)"
                      value={formikApi.values.heroFeaturesEnglish}
                      onChange={formikApi.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <TextField
                      name="heroFeaturesHindi"
                      multiline
                      fullWidth
                      label="Hero Features (Hindi)"
                      value={formikApi.values.heroFeaturesHindi}
                      onChange={formikApi.handleChange}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* About JoinUniform */}
          <Grid item xs={12}>
            <Card>
              <AdminCardHeader title="About JoinUniform" />
              <CardContent>
                <SectionTitle>Title</SectionTitle>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <FormikTextField
                      formikApi={formikApi}
                      name="heroAboutTitleEnglish"
                      label="Title (English)"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormikTextField
                      formikApi={formikApi}
                      name="heroAboutTitleHindi"
                      label="Title (Hindi)"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormikTextField
                      formikApi={formikApi}
                      name="heroAboutTextEnglish"
                      label="Text (English)"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormikTextField
                      formikApi={formikApi}
                      name="heroAboutTextHindi"
                      label="Text (Hindi)"
                    />
                  </Grid>
                </Grid>
              </CardContent>

              <CardContent>
                <SectionTitle>
                  Images{" "}
                  <IconButton>
                    <Add />
                  </IconButton>
                </SectionTitle>
                <div style={{ marginTop: -16 }}>
                  <Images
                    formikApi={formikApi}
                    useDragHandle
                    onSortEnd={({ oldIndex, newIndex }) =>
                      formikApi.setFieldValue(
                        "images",
                        arrayMove(formikApi.values.images, oldIndex, newIndex),
                      )
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </Grid>

          {["AirForce", "Army", "Navy"].map(title => (
            <Grid key={title} item xs={12}>
              <DashboardCard
                title={`${title} Entry`}
                columnLabels={["Category", "Visibility"]}
                columnTypes={["dual-line", "switch"]}
                onItemEditClick={() => {
                  //
                }}
                items={[
                  {
                    key: "0",
                    columns: [
                      { primaryText: "Soldier GD", secondaryText: "10th" },
                      {
                        switchChecked: false,
                        switchTooltipTitle: "Toggle Visibility",
                      },
                    ],
                  },
                  {
                    key: "1",
                    columns: [
                      {
                        primaryText: "Soldier Tradesman",
                        secondaryText: "10th",
                      },
                      {
                        switchChecked: true,
                        switchTooltipTitle: "Toggle Visibility",
                      },
                    ],
                  },
                  {
                    key: "2",
                    columns: [
                      {
                        primaryText: "Soldier Tradesman",
                        secondaryText: "8th",
                      },
                      {
                        switchChecked: true,
                        switchTooltipTitle: "Toggle Visibility",
                      },
                    ],
                  },
                  {
                    key: "3",
                    columns: [
                      { primaryText: "Soldier GD", secondaryText: "12th" },
                      {
                        switchChecked: true,
                        switchTooltipTitle: "Toggle Visibility",
                      },
                    ],
                  },
                ]}
                additionalActionNode={
                  <FormikFileUploadField
                    formikApi={formikApi}
                    // TODO: Make this unique for each entry
                    name="entryCardBackgroundImage"
                    label="Click to upload background image"
                    iconOnly
                  />
                }
              />
            </Grid>
          ))}

          {/* Our Videos */}
          <Grid item xs={12}>
            <Card>
              <AdminCardHeader title="Our Videos" />
              <CardContent>
                <SectionTitle>
                  Entries{" "}
                  <IconButton>
                    <Add />
                  </IconButton>
                </SectionTitle>
                <Videos
                  formikApi={formikApi}
                  useDragHandle
                  onSortEnd={({ oldIndex, newIndex }) =>
                    formikApi.setFieldValue(
                      "videos",
                      arrayMove(formikApi.values.videos, oldIndex, newIndex),
                    )
                  }
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Formik>
  </AdminDashboardTemplateContainer>
);

const AdminCardHeader: SFC<CardHeaderProps> = props => (
  <CardHeader {...props} titleStyle={{ fontSize: 18, fontWeight: 500 }} />
);

const SectionTitle: SFC = props => (
  <Typography variant="tableHeadCell" style={{ marginBottom: 16 }}>
    {props.children}
  </Typography>
);

const DragHandleBase = styled(({ className }: { className?: string }) => (
  <IconButton className={className}>
    <DragHandleIcon />
  </IconButton>
))`
  cursor: grab;
`;

const DragHandle = SortableHandle(() => (
  <div>
    <DragHandleBase />
  </div>
));

const ListControls = () => (
  <Grid container direction="column">
    <DragHandle />
    <IconButton>
      <Remove />
    </IconButton>
  </Grid>
);

const Images = SortableContainer(
  (props: { formikApi: FormikProps<IndexPageSettings> }) => (
    <div>
      {props.formikApi.values.images.map((_image, index) => (
        <Image
          key={index}
          formikApi={props.formikApi}
          index={index}
          imageIndex={index}
        />
      ))}
    </div>
  ),
);

const Image = SortableElement(
  (props: {
    formikApi: FormikProps<IndexPageSettings>;
    imageIndex: number;
  }) => (
    <Grid container spacing={2}>
      <Grid item>
        <ListControls />
      </Grid>
      <Grid item xs>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormikFileUploadField
              formikApi={props.formikApi}
              name={`images[${props.imageIndex}].image` as any}
              label="Image"
              rawValue={props.formikApi.values.images[props.imageIndex].image}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormikTextField
              formikApi={props.formikApi}
              name={`images[${props.imageIndex}].titleEnglish` as any}
              rawValue={
                props.formikApi.values.images[props.imageIndex].titleEnglish
              }
              label="Title (English)"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormikTextField
              formikApi={props.formikApi}
              name={`images[${props.imageIndex}].titleHindi` as any}
              rawValue={
                props.formikApi.values.images[props.imageIndex].titleHindi
              }
              label="Title (Hindi)"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormikTextField
              formikApi={props.formikApi}
              name={`images[${props.imageIndex}].textEnglish` as any}
              rawValue={
                props.formikApi.values.images[props.imageIndex].textEnglish
              }
              label="Text (English)"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormikTextField
              formikApi={props.formikApi}
              name={`images[${props.imageIndex}].textHindi` as any}
              rawValue={
                props.formikApi.values.images[props.imageIndex].textHindi
              }
              label="Text (Hindi)"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ),
);

const Videos = SortableContainer(
  (props: { formikApi: FormikProps<IndexPageSettings> }) => (
    <div>
      {props.formikApi.values.videos.map((_video, index) => (
        <Video
          key={index}
          formikApi={props.formikApi}
          index={index}
          videoIndex={index}
        />
      ))}
    </div>
  ),
);

const entries = ["army", "airforce", "navy"];

const Video = SortableElement(
  (props: {
    formikApi: FormikProps<IndexPageSettings>;
    videoIndex: number;
  }) => (
    <Grid container spacing={2} style={{ paddingBottom: 16 }}>
      <Grid item>
        <ListControls />
      </Grid>
      <Grid item xs>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={props.formikApi.values.videos[props.videoIndex].entryId}
                onChange={props.formikApi.handleChange}
                inputProps={{
                  name: `videos[${props.videoIndex}].entryId`,
                }}
              >
                {entries.map(entry => (
                  <MenuItem key={entry} value={entry}>
                    {entry.slice(0, 1).toUpperCase()}
                    {entry.slice(1)}
                  </MenuItem>
                ))}
                <MenuItem value="test">Test</MenuItem>
              </Select>
              <FormHelperText>Select Entry</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormikTextField
              formikApi={props.formikApi}
              name={`videos[${props.videoIndex}].youTubeVideoUrl` as any}
              rawValue={
                props.formikApi.values.videos[props.videoIndex].youTubeVideoUrl
              }
              label="Insert YouTube Url"
            />
          </Grid>
          <Grid item xs={6}>
            <FormikTextField
              formikApi={props.formikApi}
              name={`videos[${props.videoIndex}].titleEnglish` as any}
              rawValue={
                props.formikApi.values.videos[props.videoIndex].titleEnglish
              }
              label="Title (English)"
            />
          </Grid>
          <Grid item xs={6}>
            <FormikTextField
              formikApi={props.formikApi}
              name={`videos[${props.videoIndex}].titleHindi` as any}
              rawValue={
                props.formikApi.values.videos[props.videoIndex].titleHindi
              }
              label="Title (Hindi)"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  ),
);
