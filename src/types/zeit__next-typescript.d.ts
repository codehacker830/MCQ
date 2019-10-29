declare module "@zeit/next-typescript" {
	import { NextConfig } from "next-config";

	function nextTypeScriptPlugin(config?: NextConfig): NextConfig;

	export = nextTypeScriptPlugin;
}
