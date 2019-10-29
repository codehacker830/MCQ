declare module "firebase-tools" {
	export interface WebConfig {
		projectId: string;
		appId?: string;
		databaseURL?: string;
		storageBucket?: string;
		locationId?: string;
		apiKey?: string;
		authDomain?: string;
		messagingSenderId?: string;
	}

	class Client {
		setup: {
			web: () => Promise<WebConfig>;
		};
	}

	const client: Client;
	export = client;
}
