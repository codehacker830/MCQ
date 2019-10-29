declare module "next-config" {
	import {
		Configuration as WebpackConfiguration,
		RuleSetLoader as WebpackLoader,
	} from "webpack";
	import { Options as WebpackDevMiddlewareOptions } from "webpack-dev-middleware";

	export interface NextWebpackOptions {
		dir: string;

		/**
		 * The build id used as a unique identifier between builds.
		 */
		buildId: string;

		/**
		 * Shows if the compilation is done in development mode.
		 */
		dev: boolean;

		/**
		 * Shows if the resulting configuration will be used for server side
		 * (`true`), or client size compilation (`false`).
		 */
		isServer: boolean;

		/**
		 * Holds loader objects Next.js uses internally, so that you can use them in
		 * custom configuration.
		 *
		 * Example usage of defaultLoaders.babel:
		 * ```js
		 * // Example next.config.js for adding a loader that depends on babel-loader
		 * // This source was taken from the @zeit/next-mdx plugin source:
		 * // https://github.com/zeit/next-plugins/blob/master/packages/next-mdx
		 * module.exports = {
		 *   webpack: (config, options) => {
		 *     config.module.rules.push({
		 *       test: /.mdx/,
		 *       use: [
		 *         options.defaultLoaders.babel,
		 *         {
		 *           loader: '@mdx-js/loader',
		 *           options: pluginOptions.options
		 *         }
		 *       ]
		 *     });
		 *
		 *     return config;
		 *   }
		 * };
		 * ```
		 */
		defaultLoaders: {
			/**
			 * The `babel-loader` configuration for Next.js.
			 *
			 * ```js
			 * babel: {
			 *   loader: 'next-babel-loader',
			 *   options: {
			 *     isServer,
			 *     cwd: dir,
			 *     asyncToPromises: config.experimental.asyncToPromises
			 *   }
			 * },
			 * ```
			 */
			babel: WebpackLoader;

			/**
			 * `hot-self-accept-loader` configuration. This loader should only be used
			 * for advanced use cases. For example `@zeit/next-typescript` adds it for
			 * top-level TypeScript pages.
			 *
			 * ```js
			 * // Backwards compat
			 * hotSelfAccept: {
			 *   loader: 'noop-loader'
			 * }
			 * ```
			 */
			hotSelfAccept: WebpackLoader;
		};
	}

	export interface NextConfig {
		/**
		 * Inlines the provided values into the Javascript bundle.
		 *
		 * ```js
		 * // next.config.js
		 * module.exports = {
		 *   env: {
		 *     customKey: 'value'
		 *   }
		 * };
		 * ```
		 *
		 * This will allow you to use process.env.customKey in your code:
		 *
		 * ```jsx
		 * // pages/index.js
		 * function Index() {
		 *   return <h1>The value of customKey is: {process.env.customKey}</h1>;
		 * }
		 *
		 * export default Index;
		 * ```
		 *
		 * **Warning**: Note that it is not possible to destructure process.env
		 * variables due to the Webpack DefinePlugin replacing process.env.XXXX
		 * inline at build time.
		 *
		 * @see https://nextjs.org/docs#build-time-configuration
		 */
		env?: unknown[] | object;

		/**
		 * Customize Webpack configuration.
		 *
		 * **Warning**: The Webpack function is executed twice, once for the server
		 * and once for the client. This allows you to distinguish between client
		 * and server configuration using the `isServer` property.
		 */
		webpack?:
			| null
			| ((
					config: WebpackConfiguration,
					options: NextWebpackOptions,
			  ) => WebpackConfiguration);

		/**
		 * Perform customizations to Webpack dev middleware config.
		 *
		 * **Important**: return the modified config.
		 */
		webpackDevMiddleware?:
			| null
			| ((
					options: WebpackDevMiddlewareOptions,
			  ) => WebpackDevMiddlewareOptions);

		/**
		 * You can specify a name to use for a custom build directory.
		 *
		 * For example, the following config will create a `build` folder instead of
		 * a `.next` folder. If no configuration is specified then next will create
		 * a `.next` folder.
		 *
		 * ```js
		 * // next.config.js
		 * module.exports = {
		 *   distDir: 'build'
		 * };
		 * ```
		 *
		 * @default ".next"
		 */
		distDir?: string;

		/**
		 * To set up a CDN, you can set up the `assetPrefix` setting and configure
		 * your CDN's origin to resolve to the domain that Next.js is hosted on.
		 *
		 * ```js
		 * const isProd = process.env.NODE_ENV === 'production';
		 * module.exports = {
		 *   // You may only need to add assetPrefix in the production.
		 *   assetPrefix: isProd ? 'https://cdn.mydomain.com' : ''
		 * };
		 * ```
		 *
		 * @default ""
		 */
		assetPrefix?: string;

		/**
		 * @internal
		 */
		configOrigin?: string;

		/**
		 * Disable file-system routing.
		 *
		 * By default, Next will serve each file in `/pages` under a pathname
		 * matching the filename (eg, /pages/some-file.js is served at
		 * site.com/some-file.
		 *
		 * If your project uses custom routing, this behavior may result in the same
		 * content being served from multiple paths, which can present problems with
		 * SEO and UX.
		 *
		 * To disable this behavior & prevent routing based on files in /pages,
		 * simply set the following option in your next.config.js:
		 *
		 * ```js
		 * // next.config.js
		 * module.exports = {
		 *   useFileSystemPublicRoutes: false
		 * };
		 * ```
		 *
		 * Note that `useFileSystemPublicRoutes` simply disables filename routes
		 * from SSR; client-side routing may still access those paths. If using this
		 * option, you should guard against navigation to routes you do not want
		 * programmatically.
		 *
		 * You may also wish to configure the client-side Router to disallow
		 * client-side redirects to filename routes; please refer to
		 * Intercepting popstate.
		 *
		 * @see https://nextjs.org/docs#disabling-file-system-routing
		 * @see https://nextjs.org/docs#intercepting-popstate
		 */
		useFileSystemPublicRoutes?: boolean;

		/**
		 * Configure the build ID.
		 *
		 * Next.js uses a constant generated at build time to identify which version
		 * of your application is being served. This can cause problems in
		 * multi-server deployments when next build is ran on every server. In order
		 * to keep a static build id between builds you can provide the
		 * `generateBuildId` function:
		 *
		 * ```js
		 * // next.config.js
		 * module.exports = {
		 *   generateBuildId: async () => {
		 *     // For example get the latest git commit hash here
		 *     return 'my-build-id';
		 *   }
		 * };
		 * ```
		 *
		 * To fall back to the default of generating a unique id return null from
		 * the function:
		 *
		 * ```js
		 * module.exports = {
		 *   generateBuildId: async () => {
		 *     // When process.env.YOUR_BUILD_ID is undefined we fall back to the default
		 *     if (process.env.YOUR_BUILD_ID) {
		 *       return process.env.YOUR_BUILD_ID;
		 *     }
		 *
		 *     return null;
		 *   }
		 * };
		 * ```
		 *
		 * @default async () => null
		 * @see https://nextjs.org/docs#configuring-the-build-id
		 */
		generateBuildId?: () => Promise<string | null>;

		/**
		 * You can disable etag generation for HTML pages depending on your cache
		 * strategy. If no configuration is specified then Next will generate etags
		 * for every page.
		 *
		 * ```js
		 * // next.config.js
		 * module.exports = {
		 *   generateEtags: false
		 * };
		 * ```
		 *
		 * @default true
		 * @see https://nextjs.org/docs#disabling-etag-generation
		 */
		generateEtags?: boolean;

		/**
		 * Configuring extensions looked for when resolving pages in `pages`.
		 *
		 * Aimed at modules like `@zeit/next-typescript`, that add support for pages
		 * ending in `.ts`. `pageExtensions` allows you to configure the extensions
		 * looked for in the pages directory when resolving pages.
		 *
		 * ```js
		 * // next.config.js
		 * module.exports = {
		 *   pageExtensions: ['jsx', 'js']
		 * };
		 * ```
		 *
		 * @default ['jsx', 'js']
		 * @see https://nextjs.org/docs#configuring-extensions-looked-for-when-resolving-pages-in-pages
		 */
		pageExtensions?: string[];

		/**
		 * Serverless deployment dramatically improves reliability and scalability
		 * by splitting your application into smaller parts (also called lambdas).
		 * In the case of Next.js, each page in the `pages` directory becomes a
		 * serverless lambda.
		 *
		 * To enable serverless mode in Next.js, add the `serverless` build target
		 * in next.config.js:
		 *
		 * ```js
		 * // next.config.js
		 * module.exports = {
		 *   target: 'serverless'
		 * };
		 * ```
		 *
		 * The serverless target will output a single lambda per page. This file is
		 * completely standalone and doesn't require any dependencies to run:
		 *
		 * * pages/index.js => .next/serverless/pages/index.js
		 * * pages/about.js => .next/serverless/pages/about.js
		 *
		 * The signature of the Next.js Serverless function is similar to the
		 * Node.js HTTP server callback:
		 *
		 * ```ts
		 * export function render(req: http.IncomingMessage, res: http.ServerResponse) => void
		 * ```
		 *
		 * * http.IncomingMessage
		 * * http.ServerResponse
		 * * `void` refers to the function not having a return value and is
		 *   equivalent to JavaScript's `undefined`. Calling the function will
		 *   finish the request.
		 *
		 * For example if the platform supports the Node.js `http.Server` class:
		 *
		 * ```js
		 * const http = require('http');
		 * const page = require('./.next/serverless/pages/about.js');
		 * const server = new http.Server((req, res) => page.render(req, res));
		 * server.listen(3000, () => console.log('Listening on http://localhost:3000'));
		 * ```
		 *
		 * @default "server"
		 * @see https://nextjs.org/docs#serverless-deployment
		 */
		target?: "server" | "serverless";

		/**
		 * Adds or disable the `X-Powered-By` header.
		 *
		 * @default true
		 */
		poweredByHeader?: boolean;

		/**
		 * Next exposes some options that give you some control over how the server
		 * will dispose or keep in memories pages built:
		 *
		 * ```js
		 * module.exports = {
		 *   onDemandEntries: {
		 *     // period (in ms) where the server will keep pages in the buffer
		 *     maxInactiveAge: 25 * 1000,
		 *     // number of pages that should be kept simultaneously without being disposed
		 *     pagesBufferLength: 2
		 *   }
		 * };
		 * ```
		 *
		 * This is development-only feature. If you want to cache SSR pages in
		 * production, please see SSR-caching example.
		 *
		 * @default {
		 *   maxInactiveAge: 60 * 1000,
		 *   pagesBufferLength: 2
		 * }
		 * @see https://nextjs.org/docs#configuring-the-ondemandentries
		 */
		onDemandEntries?: {
			maxInactiveAge: number;
			pagesBufferLength: number;
		};

		/**
		 * @internal
		 *
		 * ```js
		 * experimental: {
		 *   cpus: Math.max(
		 *     1,
		 *     (Number(process.env.CIRCLE_NODE_TOTAL) ||
		 *       (os.cpus() || { length: 1 }).length) - 1
		 *   ),
		 *   ampBindInitData: false,
		 *   exportTrailingSlash: true,
		 *   terserLoader: false,
		 *   profiling: false,
		 *   flyingShuttle: false,
		 *   asyncToPromises: false
		 * }
		 * ```
		 */
		experimental?: {
			cpus: number;
			ampBindInitData: boolean;
			exportTrailingSlash: boolean;
			terserLoader: boolean;
			profiling: boolean;
			flyingShuttle: boolean;
			asyncToPromises: boolean;
		};
	}

	export interface NextConfigFactory {
		(
			phase: string,
			options: { defaultConfig: Required<NextConfig> },
		): NextConfig;
	}

	export type NextCustomizedConfig = NextConfigFactory | NextConfig;
}
