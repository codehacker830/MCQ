/* tslint:disable:import-name */
import React from "react";
import styled from "styled-components";
import { LocalizationStateConsumer } from "../../../localization";

import Grid from "@material-ui/core/Grid";
import { Typography } from "../../../../components/Typography";
import { ContentCenterWrapper } from "../../../../componentsV0/ContentCenterWrapper";
import jpg1 from "./1.jpg";
import jpg2 from "./2.jpg";

export type HeroDescriptionProps = {};

export const HeroDescription = () => (
  <DescriptionWrapper>
    <ContentCenterWrapper style={{ textAlign: "center" }}>
      <Title>What is &nbsp;Join Uniform?</Title>

      <LocalizationStateConsumer>
        {state =>
          state.localizationLanguage === "en" ? (
            <Text>
              JoinUniform is created to help and prepare those aspirants(both
              Officer and Jawan entry) who are keen to serve India, in
              uniform(Army, Airforce, Navy, Assam Rifles, Coast Guard, TA, BSF,
              ITBP, CRPF, SSB, CISF & RPF.etc.). The platform is bilingual(Hindi
              & English),user can use it from anywhere, using mobile, laptop or
              TV. JoinUniform will benefit it's user in terms of quality
              content, proper attention, actual exam like tests, with
              explanation and performance analysis.
            </Text>
          ) : (
            <Text>
              JoinUniform उन उम्मीदवारों (अधिकारी और जवान दोनों एंट्री) की मदद
              और तैयारी करने के लिए बनाया गया है जो वर्दी (सेना, वायु सेना,
              नौसेना, असम राइफल्स, कोस्ट गार्ड, टीए, बीएसएफ, आईटीबीपी, सीआरपीएफ,
              एसएसबी, सीआईएसएफ और आरपीऍफ़ आदि )में देशसेवा के इच्छुक हैं । मंच
              द्विभाषी (हिंदी और अंग्रेजी) है, उपयोगकर्ता इसे मोबाइल, लैपटॉप या
              टीवी का उपयोग करके कहीं भी इस्तेमाल कर सकते हैं। JoinUniform
              गुणवत्ता सामग्री, उचित ध्यान, परीक्षण जैसे वास्तविक परीक्षा,
              स्पष्टीकरण और प्रदर्शन विश्लेषण के संदर्भ में इसके उपयोगकर्ता को
              लाभान्वित करेगा।
            </Text>
          )
        }
      </LocalizationStateConsumer>

      <Grid container spacing={4}>
        {[
          [
            jpg1,
            "Jawan Entry Mock Tests",
            "हम जवान, JCO और समकक्ष पद के लिए  Army, Airforce, Navy, Assam Rifles, Coast Guard, TA, BSF, ITBP, CRPF, SSB, CISF & RPF में आवेदन करने वाले 8वीं, 10वीं और 12वीं उत्तीर्ण उम्मीदवारों के लिए  online Mock(नकली) परीक्षण करवाते हैं।",
          ],
          [
            jpg2,
            "Officer Entry Mock Tests",
            "We conduct online mock-tests for candidates, aspiring to be Officer in Indian Defence forces through AFCAT, CDSE, NDA, ACC, Military Nursing Service & CAPF (BSF, ITBP, CRPF, SSB, CISF). ",
          ],
        ].map(([imageUrl, title, description]) => (
          <Grid key={title} item xs={12} md={6} style={{ marginTop: 24 }}>
            <img src={imageUrl} style={{ marginBottom: 24 }} />
            <Title>{title}</Title>
            <Text>{description}</Text>
          </Grid>
        ))}
      </Grid>
    </ContentCenterWrapper>
  </DescriptionWrapper>
);

const DescriptionWrapper = styled.div`
  width: 100%;
  padding: 48px 0;
  background-color: #161616;
`;

const Title = (props: { children: string }) => (
  <Typography variant="H5" component="h3" style={{ marginBottom: 24 }}>
    {props.children}
  </Typography>
);

const Text = (props: { children: string }) => (
  <Typography
    variant="H6"
    component="p"
    paragraph
    style={{ color: "#a4a4a4", fontSize: 16, lineHeight: "1.6rem" }}
  >
    {props.children}
  </Typography>
);
