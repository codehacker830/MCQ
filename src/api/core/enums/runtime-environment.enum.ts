/**
 * The environment in which the application is running.
 *
 * This is used to determine whether or not the Express app should begin
 * listening for connections. If not, the application will export a function
 * for consumption by the Firebase Functions environment.
 *
 * * `Standalone` - The application is executing directly from an invocation
 * of NodeJS.
 * * `Firebase` - The application is running within the Firebase development
 * emulator, or the production Firebase environment.
 */
export enum RuntimeEnvironment {
	/**
	 * The application is executing directly from an invocation of NodeJS.
	 */
	Standalone = "Standalone",
	/**
	 * The application is running within the Firebase development emulator, or
	 * the production Firebase environment.
	 */
	Firebase = "Firebase",
}
