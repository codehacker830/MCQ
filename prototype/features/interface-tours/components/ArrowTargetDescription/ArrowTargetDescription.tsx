import { ArcherElement, ArcherElementProps } from "@strothj/react-archer";
import React, { SFC } from "react";
import { Typography } from "../../../../componentsV0/Typography";

type StyleProps = Pick<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
  "style"
>;

export type ArrowTargetDescriptionProps = StyleProps &
  ArcherElementProps & {
    children: string;
  };

export const ArrowTargetDescription: SFC<
  ArrowTargetDescriptionProps
> = props => {
  const { children, style, ...rest } = props;

  return (
    <div style={style}>
      <ArcherElement {...rest}>
        <div style={{ padding: "0 4px" }}>
          <Typography style={{ color: "#fff" }}>{children}</Typography>
        </div>
      </ArcherElement>
    </div>
  );
};
