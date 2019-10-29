import withCss from "@zeit/next-css";
import withFonts from "next-fonts";
import withImages from "next-images";
import bundleAnalyzer from "@next/bundle-analyzer";
import { NextConfig } from "next-config";

const withBundleAnalyzer = bundleAnalyzer({
	enabled: process.env.ANALYZE === "true",
});

export default applyPlugins(
	[
		withoutTypeChecking,
		withPolyfills,
		withCss,
		withFonts,
		withSvgr,
		withBundleAnalyzer,
		withImages,
	],
	{
		poweredByHeader: false,
		target: "serverless",
		distDir: "../dist/next",
	},
);

function applyPlugins(
	plugins: ((nextConfig?: NextConfig) => NextConfig)[],
	config: NextConfig,
) {
	return plugins.reduceRight((previousConfig, plugin) => {
		return plugin(previousConfig);
	}, config);
}

// #region Custom Plugins
function withSvgr(nextConfig: NextConfig = {}): NextConfig {
	return {
		...nextConfig,

		webpack(config, options) {
			config.module = config.module || { rules: [] };

			config.module.rules.push({
				test: /\.svg$/,
				use: [
					{
						loader: require.resolve("@svgr/webpack"),
						options: {
							dimensions: false,
						},
					},
				],
			});

			return nextConfig.webpack
				? nextConfig.webpack(config, options)
				: config;
		},
	};
}

/**
 * Disables build time type checking.
 *
 * @see https://github.com/zeit/next.js/issues/7687#issuecomment-506440999
 * @see https://github.com/zeit/next.js/issues/7848
 */
function withoutTypeChecking(nextConfig: NextConfig = {}): NextConfig {
	return {
		...nextConfig,

		webpack(config, options) {
			config.plugins = config.plugins || [];
			config.plugins = config.plugins.filter(
				plugin =>
					plugin.constructor.name !== "ForkTsCheckerWebpackPlugin",
			);

			return nextConfig.webpack
				? nextConfig.webpack(config, options)
				: config;
		},
	};
}

/**
 * Adds required polyfills.
 *
 * @see https://nextjs.org/docs#browser-support
 * @see https://github.com/zeit/next.js/tree/canary/examples/with-polyfills
 */
function withPolyfills(nextConfig: NextConfig = {}): NextConfig {
	return {
		...nextConfig,

		webpack(config, options) {
			const originalEntry = config.entry as () => Promise<
				Record<string, string[]>
			>;

			config.entry = async () => {
				const entries = await originalEntry();

				if (
					entries["main.js"] &&
					!entries["main.js"].includes("./polyfills.ts")
				) {
					entries["main.js"].unshift("./polyfills.ts");
				}

				return entries;
			};

			return nextConfig.webpack
				? nextConfig.webpack(config, options)
				: config;
		},
	};
}
// #endregion
