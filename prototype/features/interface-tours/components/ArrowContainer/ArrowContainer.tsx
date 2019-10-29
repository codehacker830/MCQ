import { ArcherContainer } from "@strothj/react-archer";
import React, { ReactNode, SFC } from "react";
import { colors } from "../../colors";

export type ArrowContainerProps = {
  children: ReactNode;
};

export const ArrowContainer: SFC<ArrowContainerProps> = ({ children }) => (
  <ArcherContainer
    strokeColor={colors.green}
    strokeWidth={4}
    arrowLength={4}
    arrowThickness={2.5}
  >
    {children}
  </ArcherContainer>
);
