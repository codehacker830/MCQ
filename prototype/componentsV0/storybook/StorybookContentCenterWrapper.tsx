import React, { ComponentPropsWithoutRef, SFC } from "react";
import styled from "styled-components";
import { ContentCenterWrapper } from "../ContentCenterWrapper";

type ContentCenterWrapperProps = ComponentPropsWithoutRef<
  typeof ContentCenterWrapper
>;

export type StorybookContentCenterWrapperProps = ContentCenterWrapperProps & {
  maxWidthPercent?: number;
};

/**
 * Wraps ContentCenterWrapper in for use with Storybook stories. It sets a white
 * background and allows for limiting the final width of the displayed
 * component. This is useful to simulate the component being in a column layout.
 */
export const StorybookContentCenterWrapper: SFC<
  StorybookContentCenterWrapperProps
> = ({ children, maxWidthPercent, ...rest }) => (
  <Wrapper {...rest}>
    <ComponentWrapper>{children}</ComponentWrapper>

    <Spacer maxWidthPercent={maxWidthPercent} />
    <BodyBackgroundColor />
  </Wrapper>
);

const Wrapper = styled(ContentCenterWrapper)`
  display: flex;
  padding: 0 16px;
`;

const ComponentWrapper = styled.div`
  flex: 1;
`;

const Spacer = styled.div<
  Pick<StorybookContentCenterWrapperProps, "maxWidthPercent">
>`
  ${({ maxWidthPercent }) =>
    maxWidthPercent && `width: ${100 - maxWidthPercent}%`};
`;

const BodyBackgroundColor = () => (
  <style
    dangerouslySetInnerHTML={{
      __html: `
                body {
                  background-color: #fff;
                }
              `,
    }}
  />
);
