import Typography from "@material-ui/core/Typography";
import { storiesOf } from "@storybook/react";
import React from "react";
import { AdminLoginTemplate } from ".";

storiesOf("Components V0", module).add("AdminLoginTemplate", () => {
  //

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <AdminLoginTemplate
        heroNode={<Typography>Text Content</Typography>}
        loginForm={<Typography>Login Form</Typography>}
      />
    </div>
  );
});
