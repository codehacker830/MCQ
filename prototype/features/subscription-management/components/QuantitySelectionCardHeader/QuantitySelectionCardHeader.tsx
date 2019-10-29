import React, { SFC } from "react";
import { strings } from "../../../localization";

import { CardHeader } from "../../../../components/CardHeader";
import { RupeeFontSpan } from "../../../../components/RupeeFontSpan";

export type QuantitySelectionCardHeaderProps = {
  /** Card title. */
  title: string;

  /** Price per exam. */
  pricePerExamRs: number;

  /** Image url. */
  imageUrl: string;
};

export const QuantitySelectionCardHeader: SFC<
  QuantitySelectionCardHeaderProps
> = props => {
  const { title, pricePerExamRs, imageUrl } = props;

  return (
    <CardHeader
      title={title}
      subheader={
        <>
          <RupeeFontSpan>B</RupeeFontSpan>
          &nbsp;
          {pricePerExamRs}
          &nbsp;
          {strings.subscription_management_QuantitySelectionCardHeader_PricingText.replace(
            "{}",
            "3", // Number of months subscription is valid,
          )}
        </>
      }
      imageUrl={imageUrl}
      imageSize={48}
    />
  );
};
