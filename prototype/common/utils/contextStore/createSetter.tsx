import React, { Component, ReactNode, SFC } from "react";

import { createOutsideProviderError } from "./createOutsideProviderError";

/**
 * Allows creating a setter React component:
 * ```
 * const PageTitleSetter = store.createSetter("title");
 *
 * <PageTitleSetter title="Page Title" />
 * ```
 *
 * @param consumer Context Consumer
 * @param storeName Optional store name for errors.
 * @param field Field to expose through the setter component.
 */
export const createSetter = <State, Actions, Field extends keyof State>(
  consumer: SFC<{
    children: (store: State & Actions) => ReactNode;
  }>,
  storeName: string | undefined,
  field: Field,
) => {
  const Consumer = consumer;

  interface ContextApiProp {
    contextApi?: State & Actions;
  }

  class Setter extends Component<ContextApiProp & Field> {
    state = {};

    // tslint:disable-next-line: member-ordering
    static getDerivedStateFromProps(props: ContextApiProp & Field) {
      const { contextApi } = props;
      if (!contextApi) throw createOutsideProviderError(storeName);

      const { setState } = contextApi as typeof contextApi & {
        setState: (update: Partial<State>) => any;
      };

      if (contextApi[field] !== (props as any)[field]) {
        // @ts-ignore
        setState({ [field]: props[field] });
      }

      return null;
    }

    render() {
      return null;
    }
  }

  const Container: SFC<Field> = props => (
    <Consumer>
      {contextApi => <Setter contextApi={contextApi} {...(props as any)} />}
    </Consumer>
  );

  return Container;
};
