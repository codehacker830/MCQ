import { storiesOf } from "@storybook/react";
import React, { Fragment } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { StorybookPlaceholderImage } from "../../../../componentsV0/storybook/StorybookPlaceholderImage";
import { PersistentScrollPosition } from "./PersistentScrollPosition";

storiesOf("Navigation", module)
  .addParameters({ info: { inline: false } })
  .add("PersistentScrollPosition", () => {
    const pageContents = Array.from({ length: 20 }, (_, index) => (
      <Fragment key={index}>
        <Link to={`/some-link-${index}`}>Some Link {index}</Link>
        <StorybookPlaceholderImage />
      </Fragment>
    ));

    return (
      <Router>
        <PersistentScrollPosition>{pageContents}</PersistentScrollPosition>
      </Router>
    );
  });
