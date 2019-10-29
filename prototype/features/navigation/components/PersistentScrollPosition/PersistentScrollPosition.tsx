import { Location } from "history";
import { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

type Props = RouteComponentProps<{}>;
export type PersistentScrollPositionProps = Props;

type State = {
  previousLocation: Location | null;
};

type SessionStorageLike = Pick<
  typeof window.sessionStorage,
  "setItem" | "getItem"
>;

type ScrollableLike = {
  scrollTo: (x: number, y: number) => void;
};

// TODO: Remove this once integration into Next.js is complete. This is a hack
// to prevent errors during server side rendering.
const sessionStorageLike: SessionStorageLike = process.browser
  ? sessionStorage
  : {
      // tslint:disable-next-line: no-empty
      setItem: () => {},
      getItem: () => null,
    };
const scrollableLike: ScrollableLike = process.browser
  ? window
  : // tslint:disable-next-line: no-empty
    { scrollTo: () => {} };

/**
 * Stores page scroll positions to session storage so that navigation among
 * pages start at the top or a previous position.
 *
 * Implemented using React.Context so that behavior can be overridden/extended
 * laster if needed, for instance in tab interfaces.
 *
 * @see https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/scroll-restoration.md
 */
class PersistentScrollPosition extends Component<Props, State> {
  static getDerivedStateFromProps(
    nextProps: Props,
    prevState: State,
  ): Partial<State> | null {
    const { location } = nextProps;
    if (prevState.previousLocation === location) return null;

    // Store scroll position of last page.
    if (prevState.previousLocation !== null) {
      sessionStorageLike.setItem(
        prevState.previousLocation.pathname,
        JSON.stringify({ x: window.scrollX, y: window.scrollY }),
      );
    }

    // Restore scroll position if available or scroll to top.
    const previousScrollPositionString = sessionStorageLike.getItem(
      location.pathname,
    );
    if (previousScrollPositionString) {
      const { x, y }: { x: number; y: number } = JSON.parse(
        previousScrollPositionString,
      );
      scrollableLike.scrollTo(x, y);
    } else {
      scrollableLike.scrollTo(0, 0);
    }

    return { previousLocation: location };
  }

  state: State = { previousLocation: null };

  render() {
    return this.props.children || null;
  }
}

const PersistentScrollPositionWithRouter = withRouter(
  PersistentScrollPosition as any,
);
export { PersistentScrollPositionWithRouter as PersistentScrollPosition };
