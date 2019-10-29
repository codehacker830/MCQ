const publicUrl = process.env.PUBLIC_URL;

/**
 * Prefixes the requested resource path with the path to the public asset
 * directory. This is needed because the url to the public resources differs
 * among environments (development/production, app/storybook).
 *
 * @param path The base path to the requested resource.
 */
export const fromPublicUrl = (path: string) => `${publicUrl}${path}`;
