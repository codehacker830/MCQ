import { Module, DynamicModule } from "@nestjs/common";
import { AppModuleOptions } from "./interfaces";
import { ConfigModule } from "./config";

@Module({})
export class AppModule {
	static withOptions(options: AppModuleOptions): DynamicModule {
		return {
			module: AppModule,
			imports: [ConfigModule.withOptions(options)],
		};
	}
}
