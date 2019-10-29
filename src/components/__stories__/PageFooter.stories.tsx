import { storiesOf } from "@storybook/react";
import React from "react";
import { PageFooter } from "../PageFooter";

const stories = storiesOf("PageFooter", module);

stories.add("default", () => {
	return <PageFooter />;
});
