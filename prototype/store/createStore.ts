import { createStore as createReduxStore, Store } from "redux";
import { createEnhancerDevTools } from "./createEnhancerDevTools";
import { rootReducer, State as BaseState } from "./rootReducer";

export type State = BaseState;

// Hold reference to store here to prevent error from react-hot-loader and Redux
// about the store being replaced.
let store: Store;

const createStore = () => {
  if (!store) {
    store = createReduxStore(rootReducer, createEnhancerDevTools());
  }

  // Explicit opt in to reducer hot module replacement is required, so do it
  // here.
  if (module.hot) {
    module.hot.accept("./rootReducer", () => {
      const nextRootReducer = require("./rootReducer").rootReducer;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export { createStore };
