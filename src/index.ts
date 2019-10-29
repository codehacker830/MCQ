import {
	getRuntimeEnvironment,
	RuntimeEnvironment,
	initializeExpressApp,
} from "./api";

/**
 * Whether or not the current script was executed directly using Node, or if it
 * was imported by the runtime environment of Firebase or its development
 * emulator.
 */
const runtimeEnvironment = getRuntimeEnvironment(module);

/**
 * Promise which resolves to the bootstrapped `Express` app. This is used to
 * delay the processing of responses to potentially multiple simultaneous
 * requests until the app has initialized. This prevents multiple
 * Nest.js/Next.js instances from being erroneously initialized.
 */
let pendingExpressApp = initializeExpressApp(runtimeEnvironment);

/**
 * Returns a Firebase `HttpsFunction` when operating within the Firebase cloud
 * environment or Firebase development emulator. Returns `null` if the module
 * was executed directly, i.e., directly using Node.
 */
function createFirebaseCloudFunction() {
	if (runtimeEnvironment === RuntimeEnvironment.Standalone) return null;
	const functions: typeof import("firebase-functions") = require("firebase-functions");
	return functions.https.onRequest(async (req, res) => {
		const expressApp = await pendingExpressApp;
		return expressApp(req, res);
	});
}

export const app = createFirebaseCloudFunction();

async function main() {
	const expressApp = await pendingExpressApp;
	expressApp.listen(3000, err => {
		if (err) throw err;
		console.log("> Ready on http://localhost:3000");
	});
}

if (runtimeEnvironment === RuntimeEnvironment.Standalone) main();
