import { storiesOf } from "@storybook/react";
import React, { SFC } from "react";

import { formik } from "../../../../componentsV0/storybook/StorybookFormikAddon";
import { BaseSwippableTemplate } from "./BaseSwippableTemplate";

const initialValues = { selectedPane: 0 };
type Values = typeof initialValues;

storiesOf("Exam Taking", module)
  .addParameters({ formik: { initialValues } })
  .add("BaseSwippableTemplate", () => {
    const { paneKeyNodeMap, selectedPane, onPaneChange } = getProps();

    return (
      <div style={{ height: "50vh" }}>
        <BaseSwippableTemplate
          headerNode={<div>Header Node</div>}
          paneKeyNodeMap={paneKeyNodeMap}
          footerNode={<Buttons />}
          selectedPane={selectedPane}
          onPaneChange={onPaneChange}
        />
      </div>
    );
  });

const Buttons: SFC<{}> = () => {
  const { selectedPane, onPaneChange } = getProps();

  return (
    <div>
      <button
        disabled={selectedPane === 0}
        onClick={() => onPaneChange(selectedPane - 1)}
      >
        Back
      </button>
      <button
        disabled={selectedPane === 9}
        onClick={() => onPaneChange(selectedPane + 1)}
      >
        Forward
      </button>
    </div>
  );
};

const getProps = (() => {
  const paneKeyNodeMap = Array.from({ length: 10 }).map((_, index) => ({
    key: `node-${index}`,
    node: <div>Needs to be in mobile device simulator. Node {index}</div>,
  }));

  return () => {
    const formikBag = formik<Values>();

    return {
      selectedPane: formikBag.values.selectedPane,
      onPaneChange: (paneIndex: number) =>
        formikBag.setFieldValue("selectedPane", paneIndex),
      paneKeyNodeMap,
    };
  };
})();
