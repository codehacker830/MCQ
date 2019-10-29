let cachedApp: firebase.app.App | null = null;

export async function loadFirebase() {
	if (cachedApp) return cachedApp;

	const firebaseModule = await import("firebase/app");
	await import("firebase/auth");

	// FIXME: Retrieve settings using backend.
	const settings = {} as any;
	// const app = firebaseModule.initializeApp(process.env.FIREBASE_APP_CONFIG);
	const app = firebaseModule.initializeApp(settings);
	if (process.browser) cachedApp = app;

	// app.auth().setPersistence(firebaseModule.auth.Auth.Persistence.NONE);

	return app;
}
