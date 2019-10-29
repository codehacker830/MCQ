import { DeploymentEnvironment } from "../enums";

export interface FirebaseClientAppConfig {
	deploymentEnvironment: DeploymentEnvironment;
	apiKey: string;
	authDomain: string;
	databaseURL: string;
	projectId: string;
	storageBucket: string;
	messagingSenderId: string;
	appId: string;
}
