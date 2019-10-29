declare module "@zeit/next-css" {
	import { NextConfig } from "next-config";

	function nextCssPlugin(nextConfig?: NextConfig): NextConfig;

	export = nextCssPlugin;
}
