import PropTypes from "prop-types";
import React, { ComponentType, SFC } from "react";
import { Route, RouteProps } from "react-router-dom";

export type MultipathRouteProps = Omit<RouteProps, "path"> & {
  /**
   * Multiple matched paths. Each path corresponds to the path prop of the
   * underlying Route component.
   */
  paths: string[];
};

/**
 * Wraps a react-router-dom Route. It accepts a list of matched paths as an
 * array and passes it along to Route. The TypeScript definitions and PropTypes
 * for the Route component do not allow for a string array while the underlying
 * package "path-to-regexp" does.
 *
 * The main use of this component is to prevent the remounting of a component
 * that is used for multiple routes.
 *
 * @see https://github.com/ReactTraining/react-router/issues/5866
 */
export const MultipathRoute: SFC<MultipathRouteProps> = ({
  paths,
  ...rest
}) => <Route {...rest} path={paths as any} />;

Object.defineProperty((Route as ComponentType).propTypes, "path", {
  value: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  writable: false,
});
