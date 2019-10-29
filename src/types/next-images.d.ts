declare module "next-images" {
	import { NextConfig } from "next-config";

	function nextImagesPlugin(config?: NextConfig): NextConfig;

	export = nextImagesPlugin;
}
