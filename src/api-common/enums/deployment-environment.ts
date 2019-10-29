/**
 * The Firebase project the application is running within. It will be either
 * the "staging" project or "production".
 *
 * This is used to determine which credentials to load.
 */
export enum DeploymentEnvironment {
	Staging = "Staging",
	Production = "Production",
}
