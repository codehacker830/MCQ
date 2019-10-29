import React, { Context, ReactNode, SFC } from "react";

import { createOutsideProviderError } from "./createOutsideProviderError";

/**
 * Creates a context consumer to connect the supplied context store. It throws
 * an error if used outside of the context.
 *
 * @param context The React Context which is consumed.
 * @param storeName Optional store name to display in errors.
 */
export const createConsumer = <T extends {}>(
  context: Context<T>,
  storeName?: string,
) => {
  const Consumer: SFC<{
    children: (store: T) => ReactNode;
  }> = ({ children }) => (
    <context.Consumer>
      {contextStore => {
        if (!contextStore) {
          throw createOutsideProviderError(storeName);
        }

        return children(contextStore);
      }}
    </context.Consumer>
  );

  return Consumer;
};
