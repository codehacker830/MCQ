import React from "react";
import { hydrate, render } from "react-dom";

import App from "./App";

// export interface TypeScriptComponentProps<T extends string = string> {
//   message: T;
// }

const rootElement = document.getElementById("root");
// @ts-ignore
const renderFunc = rootElement.hasChildNodes() ? hydrate : render;

renderFunc(<App />, document.getElementById("root"));
