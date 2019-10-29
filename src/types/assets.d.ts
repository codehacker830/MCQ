declare module "*.woff" {
	const url: string;
	export = url;
}

declare module "*.woff2" {
	const url: string;
	export = url;
}

declare module "*.png" {
	const url: string;
	export = url;
}

declare module "*.jpg" {
	const url: string;
	export = url;
}

declare module "*.svg" {
	import * as React from "react";

	export const ReactComponent: React.FunctionComponent<
		React.SVGProps<SVGSVGElement>
	>;

	const src: string;
	export default src;
}
