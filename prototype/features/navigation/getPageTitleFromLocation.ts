import { navigationLinksAll } from "../../common/structures/navigationLinksAll";
import { strings } from "../localization";
import { routes } from "./routes";

const defaultOptions = {
  withoutProductName: false,
};

export const getPageTitleFromLocation = (
  location: string,
  options: Partial<typeof defaultOptions> = defaultOptions,
): string => {
  const page = navigationLinksAll.find(l => l.to === location);

  // TODO: Fix type:
  // @ts-ignore
  let title = page ? strings[page.titleLocalizationKey] : "";

  const route = routes.find(r => r.path === location);
  if (route) title = strings[route.pageTitleLocalizationKey] as string;

  title = `${title}${title.length > 0 ? " - " : ""}JoinUniform`;

  if (options.withoutProductName) title = title.replace(/- JoinUniform$/, "");

  return title;
};
