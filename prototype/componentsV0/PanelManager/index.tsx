import { Component, ReactNode } from "react";

export interface PanelManagerProps {
  /**
   * Number of panels.
   */
  panelCount: number;

  /**
   * Currently displayed panel.
   */
  currentPanel: number;

  /**
   * Panels which are currently accessible.
   */
  accessiblePanels: boolean[];

  /**
   * Called upon navigation request.
   */
  onPanelChange: (panel: number) => void;

  /**
   * Render function, called with PanelManagerApi.
   */
  children: (api: PanelManagerApi) => ReactNode;
}

export interface PanelManagerApi {
  panelCount: number;
  currentPanel: number;
  canGotoPrevious: boolean;
  canGotoNext: boolean;
  goto: (panelNumber: number) => void;
  gotoPrevious: () => void;
  gotoNext: () => void;
}

/**
 * Helper component to manage panel views.
 */
export class PanelManager extends Component<PanelManagerProps> {
  handleNavigation = (panelNumber: number) => {
    const { accessiblePanels, panelCount, onPanelChange } = this.props;

    if (panelNumber < 0 || panelNumber >= panelCount) {
      throw new Error("out of range");
    }

    if (!accessiblePanels[panelNumber]) {
      throw new Error("attempt to navigate to inaccessible panel");
    }

    onPanelChange(panelNumber);
  };

  render() {
    const { panelCount, currentPanel, accessiblePanels, children } = this.props;

    const canGotoPrevious =
      currentPanel > 0 && accessiblePanels[currentPanel - 1];
    const canGotoNext =
      currentPanel < panelCount - 1 && accessiblePanels[currentPanel + 1];
    const goto = (panelNumber: number) => this.handleNavigation(panelNumber);
    const gotoPrevious = () => this.handleNavigation(currentPanel - 1);
    const gotoNext = () => this.handleNavigation(currentPanel + 1);

    const api: PanelManagerApi = {
      canGotoNext,
      canGotoPrevious,
      currentPanel,
      goto,
      gotoNext,
      gotoPrevious,
      panelCount,
    };

    return children(api);
  }
}

export default PanelManager;
