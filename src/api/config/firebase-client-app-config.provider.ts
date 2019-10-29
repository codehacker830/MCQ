import { FirebaseClientAppConfig } from "../../api-common";
import { Provider } from "@nestjs/common";
import { FIREBASE_CLIENT_APP_CONFIG_PROVIDER } from "./constants";

export function createFirebaseClientAppConfigProvider(
	firebaseClientAppConfig: FirebaseClientAppConfig,
): Provider<FirebaseClientAppConfig> {
	return {
		provide: FIREBASE_CLIENT_APP_CONFIG_PROVIDER,
		useValue: firebaseClientAppConfig,
	};
}
