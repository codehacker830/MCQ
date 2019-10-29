import { RuntimeEnvironment } from "./enums";
import { DeploymentEnvironment } from "../../api-common";

const SUPPORTED_PROJECT_IDS = [
	"joinuniformindia",
	"joinuniformindia-test",
] as const;

/**
 * Returns the deployment environment, either "production" or "staging".
 *
 * @see DeploymentEnvironment
 */
export async function getDeploymentEnvironment(
	runtimeEnvironment: RuntimeEnvironment,
) {
	const projectId = await getFirebaseProjectId(runtimeEnvironment);

	if (projectId === SUPPORTED_PROJECT_IDS[0]) {
		return DeploymentEnvironment.Production;
	} else if (projectId === SUPPORTED_PROJECT_IDS[1]) {
		return DeploymentEnvironment.Staging;
	} else {
		throw new Error(
			[
				"Unsupported Firebase project is selected: " + projectId + ".",
				"It must be one of: " + SUPPORTED_PROJECT_IDS.join(",") + ".",
			].join("\n"),
		);
	}
}

/**
 * Returns the Firebase project id. The method it uses depends on the current
 * `RuntimeEnvironment`.
 *
 * When the application is executed directly using NodeJS, the Firebase
 * environment variable will not be present. In that case, we use the
 * `firebase-tools` module to retrieve it.
 */
async function getFirebaseProjectId(runtimeEnvironment: RuntimeEnvironment) {
	const resolver =
		runtimeEnvironment === RuntimeEnvironment.Standalone
			? getFirebaseProjectIdUsingFirebaseTools
			: getFirebaseProjectIdFromFirebaseEnvironmentVariable;
	return resolver();
}

/**
 * Uses `firebase-tools` to retrieve the project id of the current Firebase
 * project.
 */
async function getFirebaseProjectIdUsingFirebaseTools() {
	const client: typeof import("firebase-tools") = require("firebase-tools");
	const webConfig = await client.setup.web();
	return webConfig.projectId;
}

/**
 * Retrieves the Firebase project id from the `FIREBASE_CONFIG` environment
 * variable present within the Firebase execution environment.
 *
 * @see https://firebase.google.com/docs/functions/config-env#automatically_populated_environment_variables
 */
async function getFirebaseProjectIdFromFirebaseEnvironmentVariable() {
	if (process.env.FIREBASE_CONFIG) {
		return JSON.parse(process.env.FIREBASE_CONFIG).projectId as string;
	}

	return null;
}
