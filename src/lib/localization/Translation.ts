import { en } from "./translations/en";

/**
 * A language translation.
 *
 * Keys must conform to the following naming convention:
 * file_path__textTranslation
 *
 * Example:
 * * /pages/index.tsx
 * * pages_index__pageTitle
 */
export type Translation = Partial<typeof en>;
