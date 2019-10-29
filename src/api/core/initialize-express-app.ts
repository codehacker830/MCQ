import { RuntimeEnvironment } from "./enums";
import { initializeFirebaseAdminSDK } from "./initialize-firebase-admin-sdk";
import express from "express";
import { NestFactory } from "@nestjs/core";
import {
	NestExpressApplication,
	ExpressAdapter,
} from "@nestjs/platform-express";
import { AppModule } from "../app.module";

/**
 * Create `Express` app instance with attached `Nest.js` app.
 */
export async function initializeExpressApp(
	runtimeEnvironment: RuntimeEnvironment,
) {
	const clientAppConfig = await initializeFirebaseAdminSDK(
		runtimeEnvironment,
	);
	const expressApp = express();
	const nestApp = await NestFactory.create<NestExpressApplication>(
		AppModule.withOptions({ firebaseClientAppConfig: clientAppConfig }),
		new ExpressAdapter(expressApp),
	);
	await nestApp.init();
	return expressApp;
}
