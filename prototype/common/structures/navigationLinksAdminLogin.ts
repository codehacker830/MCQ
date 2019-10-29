import * as adminPages from "../../pages/admin";
import { NavigationLinks } from "../types/NavigationLinks";

export const navigationLinksAdminLogin: NavigationLinks = [
  {
    titleLocalizationKey: "routes_pages_Admin_AdminLogin",
    to: "/admin",
    component: adminPages.AdminLogin,
  },
];
