import { action } from "@storybook/addon-actions";
import { number } from "@storybook/addon-knobs";
import { storiesOf } from "@storybook/react";
import React from "react";
import { PanelManager } from ".";

storiesOf("Components V0", module).add("PanelManager", () => {
  const numberOpts = {
    max: 5,
    min: 1,
    range: false,
    step: 1,
  };
  const panelCount = number("Panel Count", 3, numberOpts);
  const accessiblePanels: boolean[] = [];
  for (let i = 0; i < panelCount; i += 1) accessiblePanels.push(true);

  return (
    <PanelManager
      panelCount={panelCount}
      currentPanel={number("Current Panel", 1, {
        ...numberOpts,
        max: 4,
        min: 0,
      })}
      accessiblePanels={accessiblePanels}
      onPanelChange={action("onPanelChange")}
    >
      {api => (
        <>
          <p>Panel Count: {api.panelCount}</p>
          <p>Current Panel: {api.currentPanel}</p>
          <p>Can Goto Previous: {api.canGotoPrevious.toString()}</p>
          <p>Can Goto Next: {api.canGotoNext.toString()}</p>
          <button onClick={api.gotoPrevious}>&lt; Previous</button>
          <button onClick={api.gotoNext}>Previous &gt;</button>
        </>
      )}
    </PanelManager>
  );
});
