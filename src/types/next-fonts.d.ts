declare module "next-fonts" {
	import { NextConfig } from "next-config";

	function nextFontsPlugin(config?: NextConfig): NextConfig;

	export = nextFontsPlugin;
}
