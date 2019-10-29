import { StoreEnhancer } from "redux";

export const createEnhancerDevTools = (): StoreEnhancer | undefined => {
  if (!process.browser) return undefined;
  if (process.env.NODE_ENV !== "development") return undefined;

  return (
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: () => StoreEnhancer;
  }
}
