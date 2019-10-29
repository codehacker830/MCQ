import { storiesOf } from "@storybook/react";
import React from "react";

import { createStore } from "./createStore";

let clicks = 0;

const stories = storiesOf("Utils", module);

const store = createStore(
  { title: "Page Title" },
  {
    setTitle: () => () => {
      clicks += 1;

      return {
        title: `Page Title - Clicked ${clicks} Times`,
      };
    },
  },
  "PageTitle",
);
const TitleSetter = store.createSetter("title");

stories.add("ContextStore", () => {
  return (
    <div>
      <store.Provider>
        <store.Consumer>
          {({ title, setTitle }) => <p onClick={setTitle}>{title}</p>}
        </store.Consumer>
      </store.Provider>
    </div>
  );
});

stories.add("ContextStore - Setter", () => (
  <div>
    <store.Provider>
      <TitleSetter title="Page Title From Setter" />

      <store.Consumer>{({ title }) => <p>{title}</p>}</store.Consumer>
    </store.Provider>
  </div>
));
