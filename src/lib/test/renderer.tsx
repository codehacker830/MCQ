import { StylesProvider } from "@material-ui/styles";
import React, { ComponentPropsWithoutRef, ReactElement } from "react";
import { create } from "react-test-renderer";

// Extract the shape of "generateClassName" without adding "@types/jss" as a
// dependency.
type GenerateId = ComponentPropsWithoutRef<
	typeof StylesProvider
>["generateClassName"];
type GenerateIdParameters = Parameters<NonNullable<GenerateId>>;
type Rule = GenerateIdParameters[0];
type StyleSheet = GenerateIdParameters[1];

/**
 * Custom Material UI style engine class name generator which removes the
 * incrementing class counter. This is done so that the Storyshots snapshots
 * don't break when new components are added.
 *
 * @ref https://github.com/mui-org/material-ui/issues/9492
 */
function generateClassName(rule: Rule, styleSheet: StyleSheet) {
	if (!styleSheet) throw new Error("Expected stylesheet.");
	return `${styleSheet.options.classNamePrefix}-${rule.key}`;
}

export default function render(children: ReactElement) {
	return create(
		<StylesProvider generateClassName={generateClassName}>
			{children}
		</StylesProvider>,
	);
}
