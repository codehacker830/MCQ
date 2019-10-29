import { Controller, Inject, Get } from "@nestjs/common";
import { FIREBASE_CLIENT_APP_CONFIG_PROVIDER } from "./constants";
import { FirebaseClientAppConfig } from "../../api-common";

@Controller("api/firebase-client-app-config")
export class FirebaseClientAppConfigController {
	constructor(
		@Inject(FIREBASE_CLIENT_APP_CONFIG_PROVIDER)
		private firebaseClientAppConfigProvider: FirebaseClientAppConfig,
	) {}

	@Get()
	getFirebaseClientAppConfig() {
		return this.firebaseClientAppConfigProvider;
	}
}
