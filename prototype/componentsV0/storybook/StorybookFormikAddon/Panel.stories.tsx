import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import styled from "styled-components";

import { Panel } from "./Panel";

storiesOf("Storybook", module).add("StorybookFormikAddon", () => {
  const state = boolean("With State", true)
    ? {
        number: 3,
        complex: { number: 3, other: "test" },
        other: null,
        somethingElse: ["asdfadsf", 3324234, "asdfasdf", 333],
      }
    : null;

  return (
    <StoryWrapper>
      <Panel state={state} />
    </StoryWrapper>
  );
});

const StoryWrapper = styled.div`
  width: 100%;
  height: 128px;
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
`;
