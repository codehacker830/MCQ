import { Module, DynamicModule } from "@nestjs/common";
import { ConfigModuleOptions } from "./interfaces";
import { createFirebaseClientAppConfigProvider } from "./firebase-client-app-config.provider";
import { FirebaseClientAppConfigController } from "./firebase-client-app-config.controller";

@Module({
	controllers: [FirebaseClientAppConfigController],
})
export class ConfigModule {
	static withOptions(options: ConfigModuleOptions): DynamicModule {
		const { firebaseClientAppConfig } = options;
		const firebaseAppConfigProvider = createFirebaseClientAppConfigProvider(
			firebaseClientAppConfig,
		);

		return {
			module: ConfigModule,
			providers: [firebaseAppConfigProvider],
		};
	}
}
