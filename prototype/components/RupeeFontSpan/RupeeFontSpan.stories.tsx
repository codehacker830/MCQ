import { storiesOf } from "@storybook/react";
import React from "react";
import { Typography } from "../Typography";
import { RupeeFontSpan } from "./RupeeFontSpan";

const stories = storiesOf("Components", module);

stories.add("RupeeFontSpan", () => {
  const start = "A".charCodeAt(0);
  const end = "T".charCodeAt(0);

  const variants = Array.from({ length: end - start }, (_, index) => {
    const char = String.fromCharCode(start + index);

    return (
      <Typography key={char} variant="Body1" paragraph>
        {char} - <RupeeFontSpan>{char}</RupeeFontSpan>
      </Typography>
    );
  });

  return <div>{variants}</div>;
});
