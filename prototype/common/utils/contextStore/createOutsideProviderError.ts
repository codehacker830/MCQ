export const createOutsideProviderError = (storeName?: string) =>
  new Error(
    `Context consumer used outside of ${
      storeName ? `${storeName} ` : ""
    }provider.`,
  );
