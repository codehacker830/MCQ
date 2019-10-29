declare module "@next/bundle-analyzer" {
	import { NextConfig } from "next-config";

	function bundleAnalyzerFactory(options: {
		enabled: boolean;
	}): (nextConfig?: NextConfig) => NextConfig;

	export = bundleAnalyzerFactory;
}
