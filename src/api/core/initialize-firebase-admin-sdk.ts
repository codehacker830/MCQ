import { RuntimeEnvironment } from "./enums";
import { getDeploymentEnvironment } from "./get-deployment-environment";
import {
	FirebaseClientAppConfig,
	DeploymentEnvironment,
} from "../../api-common";

/**
 * Initializes the `firebase-admin` package by detecting which Firebase project
 * is selected and providing the associated service account credentials.
 */
export async function initializeFirebaseAdminSDK(
	runtimeEnvironment: RuntimeEnvironment,
) {
	const deploymentEnvironment = await getDeploymentEnvironment(
		runtimeEnvironment,
	);

	// This is imported here instead of at the top of the module because
	// firebase-admin will emit a warning message about it not having been
	// configured. It does a check to verify it was initialized immediately
	// after import.
	const admin: typeof import("firebase-admin") = require("firebase-admin");

	const firebaseClientAppConfig: FirebaseClientAppConfig = {
		...(deploymentEnvironment === DeploymentEnvironment.Staging
			? require("../credentials/firebase-app-config.staging.json")
			: require("../credentials/firebase-app-config.production.json")),
		deploymentEnvironment,
	};

	const firebaseServiceAccountCredential = admin.credential.cert(
		deploymentEnvironment === DeploymentEnvironment.Staging
			? require("../credentials/firebase-admin-service-account.staging.json")
			: require("../credentials/firebase-admin-service-account.production.json"),
	);

	admin.initializeApp({
		databaseURL: firebaseClientAppConfig.databaseURL,
		storageBucket: firebaseClientAppConfig.storageBucket,
		projectId: firebaseClientAppConfig.projectId,
		credential: firebaseServiceAccountCredential,
	});

	return firebaseClientAppConfig;
}
