import { NavigationLinks } from "../types/NavigationLinks";
import { navigationLinksAdmin } from "./navigationLinksAdmin";
import { navigationLinksAdminLogin } from "./navigationLinksAdminLogin";

export const navigationLinksAll: NavigationLinks = [
  ...navigationLinksAdmin,
  ...navigationLinksAdminLogin,
];
