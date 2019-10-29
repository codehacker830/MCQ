interface Window {
	/**
	 * Present in the Storybook environment. The presence of this variable on the
	 * `window` object can be used to determine if a component is being rendered
	 * within Storybook.
	 */
	STORYBOOK_ENV: "react" | undefined;
}
