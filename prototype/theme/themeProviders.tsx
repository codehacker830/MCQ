import React, { ReactNode } from "react";

/** @deprecated */
export const LightTheme = createTheme("light");
/** @deprecated */
export const DarkTheme = createTheme("dark");
/** @deprecated */
export const AdminAppDrawerTheme = createTheme("adminAppDrawer");
/** @deprecated */
export const UserAppDrawerTheme = createTheme("userAppDrawer");

let warned = false;

function createTheme(
  themeType: "light" | "dark" | "adminAppDrawer" | "userAppDrawer",
) {
  StaticThemeProvider.displayName = `StaticThemeProvider(${themeType})`;
  return StaticThemeProvider;

  function StaticThemeProvider(props: { children?: ReactNode }) {
    const { children } = props;

    if (process.browser && !warned) {
      warned = true;
      /* tslint:disable-next-line:no-console */
      console.trace('Depreciated "StaticThemeProvider" was used.');
    }

    return <>{children}</>;
  }
}
