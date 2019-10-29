import { ViewportConfiguration } from "@storybook/addon-viewport";
import "@storybook/react";

declare module "@storybook/react" {
	// Wire in Storybook addons into the AddParameters Storybook utility to
	// provide intellisense and type checking.
	export interface DecoratorParameters {
		viewport?: ViewportConfiguration;
	}
}
