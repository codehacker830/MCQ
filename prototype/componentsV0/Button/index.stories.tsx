import { storiesOf } from "@storybook/react";
import React, { cloneElement, Fragment } from "react";
import styled from "styled-components";

import { Button, ButtonProps } from ".";
import { ContentCenterWrapper } from "../ContentCenterWrapper";
import { Typography } from "../Typography";

storiesOf("Components V0", module).add("Button", () => (
  <Wrapper>
    {/* Colors */}
    {[
      [undefined, "Button"],
      ["primary", "Green Button"],
      ["orange", "Orange Button"],
      ["red", "Red Button"],
      ["blue", "Blue Button"],
      ["yellow", "Yellow Button"],
    ].map(([color, label]) =>
      // Raised and flat variants
      ["raised", "flat"].map(variant => {
        const button = (
          <Button
            color={color as ButtonProps["color"]}
            variant={variant as ButtonProps["variant"]}
          >
            <Typography variant="buttonBold">{label}</Typography>
          </Button>
        );
        const filledButton = cloneElement(button, { filled: true });
        const disabledButton = cloneElement(button, { disabled: true });
        const disabledFilledButton = cloneElement(button, {
          disabled: true,
          filled: true,
        });

        return (
          <Fragment key={`${label}-${variant}`}>
            <Typography variant="cardLargeStatText">
              {label} - {variant}
            </Typography>

            <div style={{ display: "flex", justifyContent: "space-around" }}>
              {button} <span>{disabledButton} - disabled</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <span>{filledButton} - filled</span>
              <span>{disabledFilledButton} - disabled</span>
            </div>
          </Fragment>
        );
      }),
    )}
  </Wrapper>
));

const Wrapper = styled(ContentCenterWrapper)`
  > * {
    display: block;
  }

  > *:not(:last-child) {
    margin-bottom: 24px;
  }
`;
