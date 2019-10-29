/// <reference types="express" />

declare namespace Express {
	interface Request extends JwtSessionInterfaces.JwtSessionRequest {}
}

declare namespace JwtSessionInterfaces {
	interface JwtSessionRequest {
		jwtSession?: Partial<{
			language: "en" | "hi";
			iat: number;
			exp: number;
		}> | null;
	}
}

declare namespace CookieSessionInterfaces {
	interface CookieSessionObject {
		jwt?: string;
	}
}
