/**
 * Strict version of the built in `Omit` helper. It enforces that the keys to be
 * omitted actually exist on the target type.
 *
 * TypeScript 3.5 introduced the `Omit` type into the core language. It was
 * decided that the helper would not be strict.
 *
 * @see https://github.com/Microsoft/TypeScript/pull/30552
 */
type OmitStrict<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

type PromiseValue<T> = T extends Promise<infer U> ? U : never;
