import { boolean } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React, { ReactNode } from "react";
import styled from "styled-components";

import { ResponsiveDrawerFrame } from ".";
import { StorybookPlaceholderImage } from "../storybook/StorybookPlaceholderImage";

storiesOf("Components V0", module)
  .addParameters({ info: { inline: false } })
  .add("ResponsiveDrawerFrame", () => {
    const pageContents: ReactNode[] = [];
    for (let i = 0; i < 50; i += 1) {
      pageContents.push(<StorybookPlaceholderImage key={i} />);
    }

    return (
      <ResponsiveDrawerFrame
        mobileOpen={boolean("Mobile Open", false)}
        appBarNode={<Section color="#8989ff">App Bar Node</Section>}
        drawerContentsNode={<Section color="#54f1b5">Drawer Contents</Section>}
      >
        <Section color="#e46b6b">{pageContents}</Section>
      </ResponsiveDrawerFrame>
    );
  });

const Section = styled.div<{ color: string }>`
  width: 100%;
  height: 100%;
  background-color: ${({ color }) => color};
`;
