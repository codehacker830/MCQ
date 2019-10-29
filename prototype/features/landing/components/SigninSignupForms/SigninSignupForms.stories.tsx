import { storiesOf } from "@storybook/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";

import { SigninSignupForms } from "./SigninSignupForms";

storiesOf("Landing", module)
  .addParameters({ info: { propTablesExclude: [BrowserRouter as any] } })
  .add("SigninSignupForms", () => (
    <div style={{ padding: 16, backgroundColor: "#eee" }}>
      <div style={{ width: 330 }}>
        <BrowserRouter>
          <SigninSignupForms />
        </BrowserRouter>
      </div>
    </div>
  ));
