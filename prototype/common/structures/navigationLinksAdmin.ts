import * as adminPages from "../../pages/admin";
import { NavigationLinks } from "../types/NavigationLinks";

/**
 * Navigation links and components for Admin Dashboard pages.
 */
export const navigationLinksAdmin: NavigationLinks = [
  {
    titleLocalizationKey: "routes_pages_Admin_AdminDashboard",
    to: "/admin/dashboard",
    component: adminPages.AdminDashboard,
  },
  {
    titleLocalizationKey: "routes_pages_Admin_AdminEntryManager",
    to: "/admin/entry-manager",
    component: adminPages.AdminEntryManager,
  },
  {
    titleLocalizationKey: "routes_pages_Admin_AdminTestManagerNewTemplate",
    to: "/admin/test-manager/new",
    component: adminPages.AdminTestManagerNewTemplate,
  },
  {
    titleLocalizationKey: "routes_pages_Admin_AdminTestManager",
    to: "/admin/test-manager",
    component: adminPages.AdminTestManager,
  },
  {
    titleLocalizationKey: "routes_pages_Admin_AdminIndexManager",
    to: "/admin/index-manager",
    component: adminPages.AdminIndexManager,
  },
  {
    titleLocalizationKey: "routes_pages_Admin_AdminPlanManager",
    to: "/admin/plan-manager",
    component: adminPages.AdminPlanManager,
  },
  {
    titleLocalizationKey:
      "routes_pages_Admin_AdminQuestionManagerReportedQuestions",
    to: "/admin/question-manager/reported",
    component: adminPages.AdminQuestionManagerReportedQuestions,
  },
  {
    titleLocalizationKey: "routes_pages_Admin_AdminQuestionManager",
    to: "/admin/question-manager",
    component: adminPages.AdminQuestionManager,
  },
  {
    titleLocalizationKey: "routes_pages_Admin_AdminUserManager",
    to: "/admin/user-manager",
    component: adminPages.AdminUserManager,
  },
  {
    titleLocalizationKey: "routes_pages_Admin_AdminRevenueManager",
    to: "/admin/revenue-manager",
    component: adminPages.AdminRevenueManager,
  },
];
