import React, { PureComponent } from "react";
import { portalTargetElementID } from "./BottomToolbarDockPortal";

export class BottomToolbarDockPortalPlaceholder extends PureComponent {
  render() {
    return <div id={portalTargetElementID} />;
  }
}
