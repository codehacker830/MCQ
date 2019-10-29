import withWidth, { isWidthDown, WithWidth } from "@material-ui/core/withWidth";
import { Component, ConsumerProps } from "react";
import { createPortal } from "react-dom";

type OwnProps = ConsumerProps<{ closeModal: () => void }>;
export type TourPortalProps = OwnProps;

type State = {
  portalElement: HTMLDivElement | null;
  open: boolean;
};

type Props = OwnProps & WithWidth;

/**
 * Handles creating a React portal to house the interface tour overlay. It only
 * renders the tour overlay on mobile.
 *
 * Children is a render prop which receives a handler to close the modal. This
 * is called from the tour's dismissal button.
 */
class TourPortal extends Component<Props, State> {
  state: State = { portalElement: null, open: true };

  componentDidMount() {
    const portalElement = document.createElement("div");

    document.body.appendChild(portalElement);
    this.setState({ portalElement });
  }

  componentWillUnmount() {
    const { portalElement } = this.state;

    if (portalElement) {
      document.body.removeChild(portalElement);
      this.setState({ portalElement: null });
    }
  }

  render() {
    const { children, width } = this.props;
    const { portalElement, open } = this.state;

    const isMobile = isWidthDown("sm", width);
    if (!isMobile || !portalElement || !open) return null;

    return createPortal(
      children({ closeModal: this.handleModalClose }),
      portalElement,
    );
  }

  private handleModalClose = () => {
    this.setState({ open: false });
  };
}

const TourPortalWithWidth = withWidth()(TourPortal);
export { TourPortalWithWidth as TourPortal };
