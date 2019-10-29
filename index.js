// @ts-check

// Suppress: Cannot compile namespaces when the '--isolatedModules' flag is provided.ts(1208)
// @ts-ignore
if (true) {
}

/**
 * @typedef NextModule
 * @type {typeof import("next").default}
 */

const next = /** @type {NextModule} */ (/** @type {unknown} */ (require("next"))); // prettier-ignore
const nextConfig = require("./next.config");
const functions = require("firebase-functions");
const express = require("express");
const cookieSession = require("cookie-session");
const jsonwebtoken = require("jsonwebtoken");
const admin = require("firebase-admin");
const { jwt_secret: jwtSecret } = require("./lib/credentials/jwt-secret.json");
const firebaseAdminServiceAccountProduction = require("./lib/credentials/firebase-admin-service-account.production.json");
const firebaseAdminServiceAccountStaging = require("./lib/credentials/firebase-admin-service-account.staging.json");
const firebaseAppConfigProduction = require("./lib/credentials/firebase-app-config.production.json");
const firebaseAppConfigStaging = require("./lib/credentials/firebase-app-config.staging.json");

const cookieMaxAgeMilliseconds = 60 * 60 * 24 * 14 * 1000; // 2 weeks.
const dev = process.env.NODE_ENV !== "production";

/**
 * Promise which resolves with a configured Express app instance. All requests
 * wait for it to resolve before being handled.
 *
 * @type {Promise<ReturnType<typeof express>>}
 */
const expressAppPreparation = createExpressApp();

if (require.main === module) {
	expressAppPreparation.then(expressApp => {
		expressApp.listen(3000, err => {
			if (err) throw err;
			console.log("> Ready on http://localhost:3000");
		});
	});
} else {
	exports.next = functions.https.onRequest(async (req, res) => {
		const expressApp = await expressAppPreparation;
		return expressApp(req, res);
	});
}

async function createExpressApp() {
	const clientAppConfig = await initializeFirebaseAdminSDK();
	const nextApp = next({
		dev,
		conf: withFirebaseProjectEnv(clientAppConfig, nextConfig),
	});
	const nextRequestHandler = nextApp.getRequestHandler();
	const expressApp = express();

	expressApp.use(
		cookieSession({
			// Cookie name must be named "__session" because of how the Firebase
			// caching mechanism works.
			// Ref:
			// https://firebase.google.com/docs/hosting/manage-cache#using_cookies
			name: "__session",
			maxAge: cookieMaxAgeMilliseconds,
			sameSite: "lax",
			secure: process.env.NODE_ENV === "production",
			httpOnly: true,
			signed: false,
		}),
	);
	expressApp.use(jwtSessionMiddleware);

	expressApp.get("*", (req, res) => {
		console.log(`Request: ${req.originalUrl}`);
		return nextRequestHandler(req, res);
	});

	await nextApp.prepare();
	return expressApp;
}

/**
 * Session values which are persisted and verified using a JWT stored in a
 * cookie.
 *
 * @typedef JwtSession
 * @type {NonNullable<JwtSessionInterfaces.JwtSessionRequest["jwtSession"]>}
 */

/**
 * Default session cookie value.
 *
 * @type {JwtSession}
 */
const jwtDefaultSession = { language: "en" };

/**
 * Makes a `jwtSession` key available on the web server's `Request` object. It
 * encodes its values in a signed JWT which is stored in the session cookie.
 *
 * @param {express.Request} req
 * @param {express.Response} _res
 * @param {express.NextFunction} next
 */
function jwtSessionMiddleware(req, _res, next) {
	const getSession = () => {
		if (!req.session) {
			throw new Error("Session middleware is not present.");
		}

		return req.session;
	};

	const readJwt = () => {
		const session = getSession();
		const jwt = session.jwt;
		/** @type {JwtSession} */ let jwtSession;

		try {
			const {
				iat,
				exp,
				...restJwtSession
			} = /** @type {JwtSession} */ (jsonwebtoken.verify(
				jwt || "",
				jwtSecret,
			));
			jwtSession = restJwtSession;
		} catch (err) {
			jwtSession = { ...jwtDefaultSession };
		}

		return jwtSession;
	};

	/**
	 * @param {JwtSession} jwtSession
	 */
	const writeJwt = jwtSession => {
		const session = getSession();
		session.jwt = jsonwebtoken.sign(jwtSession, jwtSecret, {
			expiresIn: cookieMaxAgeMilliseconds / 1000,
		});
	};

	req.jwtSession = new Proxy(
		{},
		{
			get(_target, property, _receiver) {
				return readJwt()[/** @type {keyof JwtSession} */ (property)];
			},
			set(_target, property, value, _receiver) {
				const jwtSession = { ...readJwt() };
				jwtSession[/** @type {keyof JwtSession} */ (property)] = value;
				writeJwt(jwtSession);
				return true;
			},
		},
	);

	next();
}

async function initializeFirebaseAdminSDK() {
	/** @type {string | null} */ let projectId = null;
	/** @type {"production" | "staging"} */ let firebaseEnvironment;

	if (require.main === module) {
		// If this module is being executed directly, get the current Firebase
		// project id using "firebase-tools".
		const client = require("firebase-tools");
		const webConfig = await client.setup.web();
		projectId = webConfig.projectId;
	} else {
		// If this module was imported, we can assume it is executing within the
		// context of the Firebase emulator or deployed environment.
		// Retrieve the current Firebase project id by reading the
		// FIREBASE_CONFIG environment variable.
		// See: https://firebase.google.com/docs/functions/config-env#automatically_populated_environment_variables
		if (process.env.FIREBASE_CONFIG) {
			projectId = JSON.parse(process.env.FIREBASE_CONFIG).projectId;
		}
	}

	switch (projectId) {
		case "joinuniformindia": {
			firebaseEnvironment = "production";
			break;
		}

		case "joinuniformindia-test": {
			firebaseEnvironment = "staging";
			break;
		}

		default:
			throw new Error(
				`Unsupported Firebase project is selected: ${projectId}`,
			);
	}

	console.log(
		`Using project environment: ${firebaseEnvironment}, project-id: ${projectId}`,
	);

	const appConfig =
		firebaseEnvironment === "staging"
			? firebaseAppConfigStaging
			: firebaseAppConfigProduction;

	const credential = admin.credential.cert(
		/** @type {any} */ (firebaseEnvironment === "staging"
			? firebaseAdminServiceAccountStaging
			: firebaseAdminServiceAccountProduction),
	);

	admin.initializeApp({
		databaseURL: appConfig.databaseURL,
		storageBucket: appConfig.storageBucket,
		projectId: appConfig.projectId,
		credential,
	});

	return {
		...appConfig,
		type: firebaseEnvironment,
	};
}

/**
 * Makes the client Firebase app config available to the running Next.js
 * instance by using an environment variable.
 *
 * @param {PromiseValue<ReturnType<typeof initializeFirebaseAdminSDK>>} appConfig
 * @param {import("next-config").NextConfig} nextConfig
 * @return {import("next-config").NextConfig}
 */
function withFirebaseProjectEnv(appConfig, nextConfig) {
	return {
		...nextConfig,

		env: {
			...nextConfig.env,

			FIREBASE_APP_CONFIG: appConfig,
		},
	};
}
