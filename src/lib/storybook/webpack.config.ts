// Suppress: Cannot compile namespaces when the '--isolatedModules' flag is provided.ts(1208)
// @ts-ignore
// tslint:disable-next-line no-empty
if (true) {
}

type Configuration = import("webpack").Configuration;

function configureStorybook(options: { config: Configuration }) {
	const { config } = options;

	// Locate the Webpack rule responsible for providing the Babel loader.
	const babelRule = config.module!.rules.find(rule =>
		JSON.stringify(rule).includes("babel-loader"),
	);
	if (!babelRule) throw new Error("Could not retrieve Babel rule.");

	// Have the Babel loader use TypeScript files.
	babelRule.test = /\.(tsx|ts|mjs|jsx)$/;

	// Have Webpack use TypeScript files.
	config.resolve!.extensions!.push(".tsx", ".ts");

	return config;
}

module.exports = configureStorybook;
